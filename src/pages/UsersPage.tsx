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
  Badge,
} from "@/components/ui";
import { UsersService, type UserDto } from "@/api";
import { useAuth } from "@/contexts/useAuth";
import { checkPermissions, PermissionCodes } from "@/types/permissions";
import { RegisterUserDialog } from "@/components/dialogs/RegisterUserDialog";
import { ManageUserDialog } from "@/components/dialogs/ManageUserDialog";

export const UsersPage: React.FC = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState<UserDto[]>([]);
  const [openRegister, setOpenRegister] = useState(false);
  const [openManage, setOpenManage] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserDto | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const permissionedManage = checkPermissions(user?.permissions, [
    PermissionCodes.usersManage,
  ]);

  const loadUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await UsersService.usersControllerGetAllUsers();
      setUsers(data);
    } catch (e: unknown) {
      const errorMessage =
        e instanceof Error ? e.message : "Ошибка при загрузке пользователей";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleManageUser = (user: UserDto) => {
    setSelectedUser(user);
    setOpenManage(true);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  if (!permissionedManage) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Info tone="destructive">
          У вас нет прав для управления пользователями
        </Info>
      </div>
    );
  }

  return (
    <div className="space-y-4 w-full">
      {error && <Info tone="destructive">{error}</Info>}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-primary-600">
              Управление пользователями
            </h3>
            <RegisterUserDialog
              open={openRegister}
              onOpenChange={setOpenRegister}
              callback={loadUsers}
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
                  <TableHead>Имя</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>ID</TableHead>
                  <TableHead>Роль</TableHead>
                  <TableHead children={undefined}></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((u) => (
                  <TableRow key={u.id}>
                    <TableCell>{u.fullName}</TableCell>
                    <TableCell>{u.email}</TableCell>
                    <TableCell className="font-mono text-xs">{u.id}</TableCell>
                    <TableCell>
                      <Badge>{u.role.name}</Badge>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="secondary"
                        onClick={() => handleManageUser(u)}
                      >
                        Управление
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {selectedUser && (
        <ManageUserDialog
          user={selectedUser}
          open={openManage}
          onOpenChange={setOpenManage}
          callback={loadUsers}
        />
      )}
    </div>
  );
};

