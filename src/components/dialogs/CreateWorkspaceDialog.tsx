import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Input,
} from "../ui";
import { WorkspaceService, type CreateWorkspaceDto } from "@/api";
import { useAuth } from "@/contexts/useAuth";
import { checkPermissions, PermissionCodes } from "@/types/permissions";

interface CreateWorkspaceDialogProps {
  callback: () => void;
}

export const CreateWorkspaceDialog: React.FC<CreateWorkspaceDialogProps> = ({
  callback,
}) => {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState<CreateWorkspaceDto>({
    name: "",
  });

  const permissionedCreate = checkPermissions(user?.permissions, [
    PermissionCodes.workspaceCreate,
  ]);

  if (!permissionedCreate) {
    return null;
  }

  const onCreate = async () => {
    if (!form.name) {
      alert("Введите название workspace");
      return;
    }

    setCreating(true);
    try {
      await WorkspaceService.workspaceControllerCreate(form);
      setForm({ name: "" });
      setOpen(false);
      callback();
    } catch (e: unknown) {
      const errorMessage =
        e instanceof Error ? e.message : "Ошибка при создании workspace";
      alert(errorMessage);
    } finally {
      setCreating(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="primary">Создать workspace</Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Создать новый workspace</DialogTitle>
          <DialogDescription>
            Создайте новый workspace для ваших проектов
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-3 py-2">
          <Input
            label="Название workspace"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Мой workspace"
          />
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

