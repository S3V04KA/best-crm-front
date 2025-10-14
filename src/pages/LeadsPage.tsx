import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Info,
  Button,
} from "@/components/ui";
import { LeadsService, type LeadResponseDto } from "@/api";
import { useParams } from "react-router-dom";
import {
  AddCompanyDialog,
  type Lead,
} from "@/components/dialogs/AddCompanyDialog";
import { EditCompanyDialog } from "@/components/dialogs/EditCompanyDialog";
import { CallType, LeadStatus } from "@/types/lead";
import { useAuth } from "@/contexts/useAuth";
import { checkPermissions, PermissionCodes } from "@/types/permissions";

export const LeadsPage: React.FC = () => {
  const { user } = useAuth();
  const workspaceId = useParams().workspaceId;
  const [leads, setLeads] = useState<LeadResponseDto[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [initLead, setInitLead] = useState<Partial<Lead>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const permissionedManage = checkPermissions(user?.permissions, [
    PermissionCodes.leadManage,
  ]);
  const permissionedDelete = checkPermissions(user?.permissions, [
    PermissionCodes.leadDelete,
  ]);

  const loadLeads = async () => {
    setLoading(true);
    setError(null);
    try {
      if (permissionedManage) {
        const data =
          await LeadsService.leadsWorkspaceControllerFindAllFromWorkspace(
            workspaceId
          );
        setLeads(data);
      } else {
        const data =
          await LeadsService.leadsWorkspaceControllerFindAllMineFromWorkspace(
            workspaceId
          );
        setLeads(data);
      }
    } catch (e: unknown) {
      const errorMessage =
        e instanceof Error ? e.message : "Ошибка при загрузке компаний";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      await LeadsService.leadsWorkspaceControllerRemove(id, workspaceId);
    } catch (e: unknown) {
      const errorMessage =
        e instanceof Error ? e.message : "Ошибка при загрузке компаний";
      setError(errorMessage);
    } finally {
      setLoading(false);
      window.location.reload();
    }
  };

  useEffect(() => {
    loadLeads();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="space-y-4 w-full">
      {error && <Info tone="destructive">{error}</Info>}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-primary-600">Компании</h3>
            {checkPermissions(user?.permissions, [
              PermissionCodes.leadCreate,
            ]) ? (
              <AddCompanyDialog callback={loadLeads} />
            ) : (
              ""
            )}
            <EditCompanyDialog
              form={initLead}
              setForm={setInitLead}
              open={open}
              setOpen={setOpen}
              callback={loadLeads}
            />
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-sm text-gray-600">Загрузка...</div>
          ) : (
            <Table verticalDividers>
              <TableHeader>
                <TableRow>
                  <TableHead>Название</TableHead>
                  <TableHead>Тип компании</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Сайт</TableHead>
                  <TableHead>Номер телефона</TableHead>
                  <TableHead>Комментарий</TableHead>
                  <TableHead>Статус звонка</TableHead>
                  <TableHead>Статус</TableHead>
                  {permissionedManage ? (
                    <TableHead>Ответственный</TableHead>
                  ) : (
                    ""
                  )}
                  {permissionedDelete && <TableHead> </TableHead>}
                </TableRow>
              </TableHeader>
              <TableBody>
                {leads.map((l) => (
                  <TableRow
                    key={l.id}
                    onClick={() => {
                      setInitLead({
                        ...l,
                        companyTypeId: l.companyType?.id,
                        responsibleId: l.responsible?.id,
                      });
                      setOpen(true);
                    }}
                  >
                    <TableCell>{l.name}</TableCell>
                    <TableCell>{l.companyType?.name}</TableCell>
                    <TableCell>{l.email}</TableCell>
                    <TableCell>{l.site}</TableCell>
                    <TableCell>{l.phoneNumber}</TableCell>
                    <TableCell>{l.comment}</TableCell>
                    <TableCell>
                      {l.callType !== undefined && l.callType !== null
                        ? Object.keys(CallType)[l.callType]
                        : "Пока ничего"}
                    </TableCell>
                    <TableCell>
                      {l.status !== undefined && l.status !== null
                        ? Object.keys(LeadStatus)[l.status]
                        : "Пока ничего"}
                    </TableCell>
                    {permissionedManage ? (
                      <TableCell>
                        {l.responsible?.fullName || "Не назначен"}
                      </TableCell>
                    ) : (
                      ""
                    )}
                    {permissionedDelete && (
                      <TableCell>
                        <Button
                          onClick={(e) => {
                            e.stopPropagation();
                            onDelete(l.id);
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            viewBox="0 0 16 16"
                          >
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                          </svg>
                        </Button>
                      </TableCell>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
