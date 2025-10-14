import { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui";
import {
  CompanyTypesService,
  LeadsService,
  UsersService,
  type UserDto,
} from "@/api";
import { useParams } from "react-router-dom";
import type { CompanyType, Lead } from "./AddCompanyDialog";
import { CallType, LeadStatus } from "@/types/lead";
import { CodeTextbox } from "../ui/CodeBox";
import { useAuth } from "@/contexts/useAuth";
import { checkPermissions, PermissionCodes } from "@/types/permissions";
import {
  SearchableSelect,
  SearchableSelectContent,
  SearchableSelectItem,
  SearchableSelectTrigger,
} from "../ui/SearchableSelect";

interface EditCompanyDialogProps {
  form: Partial<Lead>;
  setForm: (value: Partial<Lead>) => void;
  open: boolean;
  setOpen: (initialState: React.SetStateAction<boolean>) => void;
  callback: () => void;
}

export const EditCompanyDialog: React.FC<EditCompanyDialogProps> = ({
  form,
  setForm,
  open,
  setOpen,
  callback,
}) => {
  const { user } = useAuth();
  const workspaceId = useParams().workspaceId;
  const [creating, setCreating] = useState(false);
  const [cTypes, setCTypes] = useState<Array<CompanyType>>([]);
  const [users, setUsers] = useState<Array<UserDto>>([]);
  const permissionedUpdate = checkPermissions(user?.permissions, [
    PermissionCodes.leadUpdate,
  ]);
  const [error, setError] = useState<string>("");

  const loadTypes = async () => {
    try {
      const data = await CompanyTypesService.companyTypeControllerFindAll();
      setCTypes(data);
    } catch (e: unknown) {
      const errorMessage =
        e instanceof Error ? e.message : "Ошибка при загрузке типов компаний";
      console.log(errorMessage);
    }
  };

  const loadUsers = async () => {
    try {
      const data = await UsersService.usersControllerGetAllUsers();
      setUsers(data);
    } catch (e) {
      const errorMessage =
        e instanceof Error ? e.message : "Ошибка при загрузке типов компаний";
      console.log(errorMessage);
    }
  };

  useEffect(() => {
    if (!permissionedUpdate) return;
    loadTypes();
    loadUsers();
  }, []);

  const onSave = async (isSend?: boolean) => {
    setError("");
    setCreating(true);
    try {
      if (!form.companyTypeId) {
        setError("Не найден тип компании");
        return;
      }

      if (permissionedUpdate) {
        await LeadsService.leadsWorkspaceControllerUpdate(
          form.id || "",
          workspaceId,
          {
            callType:
              form.callType !== undefined && form.callType !== null
                ? form.callType
                : null,
            status:
              form.status !== undefined && form.status !== null
                ? form.status
                : null,
            email: form.email ? form.email : null,
            phoneNumber: form.phoneNumber ? form.phoneNumber : null,
            site: form.site ? form.site : null,
            comment: form.comment ? form.comment : null,
            companyTypeId: form.companyTypeId,
            responsibleId: form.responsibleId || null,
            name: form.name ? form.name : null,
          }
        );
      } else {
        await LeadsService.leadsWorkspaceControllerChangeStatus(
          form.id || "",
          workspaceId,
          {
            callType:
              form.callType !== undefined && form.callType !== null
                ? form.callType
                : null,
            status:
              form.status !== undefined && form.status !== null
                ? form.status
                : null,
            email: form.email ? form.email : null,
            phoneNumber: form.phoneNumber ? form.phoneNumber : null,
            site: form.site ? form.site : null,
            comment: form.comment ? form.comment : null,
          }
        );
      }

      if (isSend) {
        await LeadsService.leadsWorkspaceControllerSendProposal(
          form.id || "",
          workspaceId,
          { subject: "Комерческое предложение" }
        );
      }

      setOpen(false);
      setForm({});
      callback();
    } catch (e: unknown) {
      const errorMessage =
        e instanceof Error ? e.message : "Ошибка при создании компании";
      setError(errorMessage);
    } finally {
      setCreating(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Обработать компанию</DialogTitle>
          <DialogDescription>Заполните данные компании</DialogDescription>
        </DialogHeader>
        {error && (
          <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-md text-sm">
            {error}
          </div>
        )}
        <div className="space-y-3 py-2">
          <Input
            label="Название"
            disabled={!permissionedUpdate}
            value={form.name || ""}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <Input
            label="Email"
            type="email"
            value={form.email || ""}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <Input
            label="Номер телефона"
            value={form.phoneNumber || ""}
            onChange={(e) => setForm({ ...form, phoneNumber: e.target.value })}
          />
          <Input
            label="Сайт"
            value={form.site || ""}
            onChange={(e) => setForm({ ...form, site: e.target.value })}
          />
          <CodeTextbox
            label="Комментарий"
            value={form.comment || ""}
            onChange={(e) => setForm({ ...form, comment: e.target.value })}
          />
          {permissionedUpdate && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                Тип компании
              </label>
              <Select
                value={form.companyTypeId}
                onValueChange={(v: Lead["companyTypeId"]) =>
                  setForm({ ...form, companyTypeId: v })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Выберите тип компании" />
                </SelectTrigger>
                <SelectContent>
                  {cTypes.map((t) => (
                    <SelectItem key={t.code} value={t.id || ""}>
                      {t.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              Тип звонка
            </label>
            <Select
              value={
                form.callType !== undefined && form.callType !== null
                  ? Object.keys(CallType)[form.callType]
                  : undefined
              }
              onValueChange={(v: string) =>
                setForm({ ...form, callType: CallType[v] })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Выберите тип звонка" />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(CallType).map((t) => (
                  <SelectItem key={t} value={t}>
                    {t}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              Статус
            </label>
            <Select
              value={
                form.status !== undefined && form.status !== null
                  ? Object.keys(LeadStatus)[form.status]
                  : undefined
              }
              onValueChange={(v: string) =>
                setForm({ ...form, status: LeadStatus[v] })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Выберите статус" />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(LeadStatus).map((t) => (
                  <SelectItem key={t} value={t || ""}>
                    {t}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {permissionedUpdate && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                Ответственный
              </label>
              <SearchableSelect
                value={form.responsibleId}
                onValueChange={(v: string) =>
                  setForm({ ...form, responsibleId: v })
                }
              >
                <SearchableSelectTrigger>
                  <SelectValue placeholder="Выберите ответственного" />
                </SearchableSelectTrigger>
                <SearchableSelectContent>
                  {users.map((t) => (
                    <SearchableSelectItem key={t.id} value={t.id}>
                      {t.fullName}
                    </SearchableSelectItem>
                  ))}
                </SearchableSelectContent>
              </SearchableSelect>
            </div>
          )}
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="secondary" onClick={() => setOpen(false)}>
            Отменить
          </Button>
          <Button variant="primary" onClick={() => onSave()} loading={creating}>
            Сохранить
          </Button>
          <Button
            variant="primary"
            onClick={() => onSave(true)}
            loading={creating}
          >
            Сохранить и отправить КП
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
