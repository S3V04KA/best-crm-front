import { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui";
import {
  CompanyTypesService,
  LeadResponseDto,
  LeadsService,
  type CreateLeadDto,
} from "@/api";
import { useParams } from "react-router-dom";

export interface CompanyType {
  id?: string;
  code?: string;
  name?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Lead {
  id: string;
  name: string;
  email?: string;
  phoneNumber?: string;
  site?: string;
  comment?: string;
  status?: LeadResponseDto.status;
  callType?: LeadResponseDto.callType;
  companyTypeId: string;
  responsibleId?: string;
}

export const AddCompanyDialog: React.FC = () => {
  const workspaceId = useParams().workspaceId;
  const [open, setOpen] = useState(false);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState<Partial<Lead>>({});
  const [cTypes, setCTypes] = useState<Array<CompanyType>>([]);

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

  useEffect(() => {
    loadTypes();
  }, []);

  const onCreate = async () => {
    setCreating(true);
    try {
      await LeadsService.leadsWorkspaceControllerCreate(
        workspaceId,
        form as CreateLeadDto
      );
      setOpen(false);
      setForm({});
    } catch (e: unknown) {
      const errorMessage =
        e instanceof Error ? e.message : "Ошибка при создании компании";
      console.log(errorMessage);
    } finally {
      setCreating(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="primary">Добавить компанию</Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Добавить компанию</DialogTitle>
          <DialogDescription>Заполните данные компании</DialogDescription>
        </DialogHeader>
        <div className="space-y-3 py-2">
          <Input
            label="Название"
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
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="secondary" onClick={() => setOpen(false)}>
            Отменить
          </Button>
          <Button variant="primary" onClick={onCreate} loading={creating}>
            Создать
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
