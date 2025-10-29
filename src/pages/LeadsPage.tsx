import React, { useEffect, useState, useCallback } from "react";
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
  Input,
  SearchableSelect,
  SearchableSelectContent,
  SearchableSelectItem,
  SearchableSelectTrigger,
  SearchableSelectValue,
} from "@/components/ui";
import { LeadsService, CompanyTypesService, type LeadResponseDto } from "@/api";
import { useParams } from "react-router-dom";
import {
  AddCompanyDialog,
  type Lead,
  type CompanyType,
} from "@/components/dialogs/AddCompanyDialog";
import { EditCompanyDialog } from "@/components/dialogs/EditCompanyDialog";
import { CallType, LeadStatus } from "@/types/lead";
import { useAuth } from "@/contexts/useAuth";
import { checkPermissions, PermissionCodes } from "@/types/permissions";

const statusColors = {
  0: "#007bff4a",
  1: "#ffc1074a",
  2: "#28a7454a",
  3: "#dc35454a",
};

export const LeadsPage: React.FC = () => {
  const { user } = useAuth();
  const workspaceId = useParams().workspaceId;
  const [leads, setLeads] = useState<LeadResponseDto[]>([]);
  const [filteredLeads, setFilteredLeads] = useState<LeadResponseDto[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [initLead, setInitLead] = useState<Partial<Lead>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Состояние фильтров
  const [filters, setFilters] = useState({
    name: "",
    companyType: "all",
    status: "all",
    callType: "all",
  });
  
  // Типы компаний для фильтра
  const [companyTypes, setCompanyTypes] = useState<CompanyType[]>([]);
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

  const loadCompanyTypes = async () => {
    try {
      const data = await CompanyTypesService.companyTypeControllerFindAll();
      setCompanyTypes(data);
    } catch (e: unknown) {
      console.error("Ошибка при загрузке типов компаний:", e);
    }
  };

  // Функция фильтрации компаний
  const applyFilters = useCallback((leadsToFilter: LeadResponseDto[]) => {
    return leadsToFilter.filter((lead) => {
      // Фильтр по имени/email
      if (filters.name) {
        const searchTerm = filters.name.toLowerCase();
        const matchesName = lead.name?.toLowerCase().includes(searchTerm);
        const matchesEmail = lead.email?.toLowerCase().includes(searchTerm);
        if (!matchesName && !matchesEmail) return false;
      }

      // Фильтр по типу компании
      if (filters.companyType && filters.companyType !== "all") {
        if (lead.companyType?.id !== filters.companyType) return false;
      }

      // Фильтр по статусу
      if (filters.status && filters.status !== "all") {
        if (lead.status?.toString() !== filters.status) return false;
      }

      // Фильтр по типу звонка
      if (filters.callType && filters.callType !== "all") {
        if (lead.callType?.toString() !== filters.callType) return false;
      }

      return true;
    });
  }, [filters]);

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
    loadCompanyTypes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Применяем фильтры при изменении leads или filters
  useEffect(() => {
    const filtered = applyFilters(leads);
    setFilteredLeads(filtered);
  }, [leads, applyFilters]);

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
          {/* Фильтры */}
          <div className="mb-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Поиск по имени/email */}
              <Input
                placeholder="Поиск по названию или email..."
                value={filters.name}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, name: e.target.value }))
                }
              />
              
              {/* Фильтр по типу компании */}
              <SearchableSelect
                value={filters.companyType}
                onValueChange={(value: string) =>
                  setFilters((prev) => ({ ...prev, companyType: value }))
                }
              >
                <SearchableSelectTrigger>
                  <SearchableSelectValue placeholder="Тип компании" />
                </SearchableSelectTrigger>
                <SearchableSelectContent>
                  <SearchableSelectItem value="all">
                    Все типы
                  </SearchableSelectItem>
                  {companyTypes.map((type) => (
                    <SearchableSelectItem key={type.id} value={type.id || "unknown"}>
                      {type.name}
                    </SearchableSelectItem>
                  ))}
                </SearchableSelectContent>
              </SearchableSelect>

              {/* Фильтр по статусу */}
              <SearchableSelect
                value={filters.status}
                onValueChange={(value: string) =>
                  setFilters((prev) => ({ ...prev, status: value }))
                }
              >
                <SearchableSelectTrigger>
                  <SearchableSelectValue placeholder="Статус" />
                </SearchableSelectTrigger>
                <SearchableSelectContent>
                  <SearchableSelectItem value="all">
                    Все статусы
                  </SearchableSelectItem>
                  {Object.entries(LeadStatus).map(([key, value]) => (
                    <SearchableSelectItem key={key} value={value.toString()}>
                      {key}
                    </SearchableSelectItem>
                  ))}
                </SearchableSelectContent>
              </SearchableSelect>

              {/* Фильтр по типу звонка */}
              <SearchableSelect
                value={filters.callType}
                onValueChange={(value: string) =>
                  setFilters((prev) => ({ ...prev, callType: value }))
                }
              >
                <SearchableSelectTrigger>
                  <SearchableSelectValue placeholder="Тип звонка" />
                </SearchableSelectTrigger>
                <SearchableSelectContent>
                  <SearchableSelectItem value="all">
                    Все типы звонков
                  </SearchableSelectItem>
                  {Object.entries(CallType).map(([key, value]) => (
                    <SearchableSelectItem key={key} value={value.toString()}>
                      {key}
                    </SearchableSelectItem>
                  ))}
                </SearchableSelectContent>
              </SearchableSelect>
            </div>
            
            {/* Кнопка сброса фильтров */}
            <div className="flex justify-end">
              <Button
                variant="ghost"
                onClick={() =>
                  setFilters({
                    name: "",
                    companyType: "all",
                    status: "all",
                    callType: "all",
                  })
                }
              >
                Сбросить фильтры
              </Button>
            </div>
          </div>

          {loading ? (
            <div className="text-sm text-gray-600">Загрузка...</div>
          ) : (
            <Table verticalDividers>
              <TableHeader>
                <TableRow>
                  <TableHead>Название</TableHead>
                  <TableHead>Тип компании</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead style={{maxWidth: 30}}>Сайт</TableHead>
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
                {filteredLeads.map((l) => (
                  <TableRow
                    key={l.id}
                    style={{
                      backgroundColor: l.status
                        ? statusColors[l.status]
                        : undefined,
                    }}
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
                    <TableCell style={{maxWidth: 30}}>{l.site}</TableCell>
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
