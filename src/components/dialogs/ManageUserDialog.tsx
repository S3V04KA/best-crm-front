import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Badge,
} from "../ui";
import {
  AccessControlService,
  WorkspaceService,
  type UserDto,
  type ResponseWorkspaceDto,
} from "@/api";

interface ManageUserDialogProps {
  user: UserDto;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  callback: () => void;
}

interface Role {
  id: string;
  name: string;
}

export const ManageUserDialog: React.FC<ManageUserDialogProps> = ({
  user,
  open,
  onOpenChange,
  callback,
}) => {
  const [roles, setRoles] = useState<Role[]>([]);
  const [workspaces, setWorkspaces] = useState<ResponseWorkspaceDto[]>([]);
  const [userWorkspaces, setUserWorkspaces] = useState<string[]>([]);
  const [selectedRole, setSelectedRole] = useState<string>("");
  const [selectedWorkspace, setSelectedWorkspace] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const loadRoles = async () => {
    try {
      const data = await AccessControlService.aclControllerListRoles();
      setRoles(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error("Ошибка при загрузке ролей:", e);
    }
  };

  const loadWorkspaces = async () => {
    try {
      const data = await WorkspaceService.workspaceControllerListAll();
      setWorkspaces(data);
    } catch (e) {
      console.error("Ошибка при загрузке workspace:", e);
    }
  };

  const loadUserWorkspaces = async () => {
    try {
      const data = await WorkspaceService.workspaceControllerListAll();
      // В реальности здесь должна быть загрузка workspace пользователя
      // но такого API нет, поэтому используем все workspace
      setUserWorkspaces(data.map((w) => w.id));
    } catch (e) {
      console.error("Ошибка при загрузке workspace пользователя:", e);
    }
  };

  const handleAddToWorkspace = async () => {
    if (!selectedWorkspace) return;

    setLoading(true);
    try {
      await WorkspaceService.workspaceControllerAddUser(
        selectedWorkspace,
        user.id
      );
      setUserWorkspaces([...userWorkspaces, selectedWorkspace]);
      setSelectedWorkspace("");
      callback();
    } catch (e) {
      alert(
        e instanceof Error
          ? e.message
          : "Ошибка при добавлении пользователя в workspace"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFromWorkspace = async (workspaceId: string) => {
    if (!confirm("Удалить пользователя из этого workspace?")) return;

    setLoading(true);
    try {
      // NOTE: Необходимо добавить метод в WorkspaceService для удаления пользователя
      // Временно используем прямую работу с API
      const baseUrl = import.meta.env.VITE_API_BASE_URL || "";
      const response = await fetch(`${baseUrl}/api/workspaces/${workspaceId}/user/${user.id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      
      if (!response.ok) {
        throw new Error("Не удалось удалить пользователя из workspace");
      }
      
      setUserWorkspaces(userWorkspaces.filter((id) => id !== workspaceId));
      callback();
    } catch (e) {
      alert(
        e instanceof Error
          ? e.message
          : "Ошибка при удалении пользователя из workspace"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSetRole = async () => {
    if (!selectedRole) return;

    setLoading(true);
    try {
      await AccessControlService.aclControllerSetUserRole(user.id, {
        roleId: selectedRole,
      });
      alert("Роль успешно установлена");
      callback();
    } catch (e) {
      alert(
        e instanceof Error ? e.message : "Ошибка при установке роли"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (open) {
      loadRoles();
      loadWorkspaces();
      loadUserWorkspaces();
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Управление пользователем: {user.fullName}</DialogTitle>
          <DialogDescription>
            Управление ролями и членством в workspace
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Управление ролями */}
          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-primary-600">
              Управление ролями
            </h4>
            <div className="flex gap-2">
              <Select value={selectedRole} onValueChange={setSelectedRole}>
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder="Выберите роль" />
                </SelectTrigger>
                <SelectContent>
                  {roles.map((role) => (
                    <SelectItem key={role.id} value={role.id}>
                      {role.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button
                variant="primary"
                onClick={handleSetRole}
                loading={loading}
                disabled={!selectedRole}
              >
                Установить роль
              </Button>
            </div>
          </div>

          {/* Добавление в workspace */}
          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-primary-600">
              Добавить в workspace
            </h4>
            <div className="flex gap-2">
              <Select
                value={selectedWorkspace}
                onValueChange={setSelectedWorkspace}
              >
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder="Выберите workspace" />
                </SelectTrigger>
                <SelectContent>
                  {workspaces.map((ws) => (
                    <SelectItem key={ws.id} value={ws.id}>
                      {ws.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button
                variant="primary"
                onClick={handleAddToWorkspace}
                loading={loading}
                disabled={!selectedWorkspace}
              >
                Добавить
              </Button>
            </div>
          </div>

          {/* Список workspace пользователя */}
          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-primary-600">
              Workspace пользователя
            </h4>
            <div className="flex flex-wrap gap-2">
              {workspaces
                .filter((ws) => userWorkspaces.includes(ws.id))
                .map((ws) => (
                  <Badge key={ws.id} variant="secondary" className="pr-1">
                    {ws.name}
                    <button
                      className="ml-2 hover:text-red-600"
                      onClick={() => handleRemoveFromWorkspace(ws.id)}
                      disabled={loading}
                    >
                      ×
                    </button>
                  </Badge>
                ))}
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="secondary" onClick={() => onOpenChange(false)}>
            Закрыть
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

