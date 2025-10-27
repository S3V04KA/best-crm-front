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
import { AuthService } from "@/api";
import { type RegisterDto } from "@/api/models/RegisterDto";

interface RegisterUserDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  callback: () => void;
}

export const RegisterUserDialog: React.FC<RegisterUserDialogProps> = ({
  open,
  onOpenChange,
  callback,
}) => {
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState<RegisterDto>({
    fullName: "",
    email: "",
  });

  const onCreate = async () => {
    if (!form.fullName || !form.email) {
      alert("Заполните все поля");
      return;
    }

    setCreating(true);
    try {
      await AuthService.authControllerRegister(form);
      setForm({ fullName: "", email: "" });
      onOpenChange(false);
      callback();
    } catch (e: unknown) {
      const errorMessage =
        e instanceof Error ? e.message : "Ошибка при создании пользователя";
      alert(errorMessage);
    } finally {
      setCreating(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button variant="primary">Зарегистрировать пользователя</Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Регистрация нового пользователя</DialogTitle>
          <DialogDescription>
            Создайте новую учетную запись пользователя
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-3 py-2">
          <Input
            label="Полное имя"
            value={form.fullName}
            onChange={(e) => setForm({ ...form, fullName: e.target.value })}
            placeholder="Иван Иванов"
          />
          <Input
            label="Email"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="ivan@example.com"
          />
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="secondary" onClick={() => onOpenChange(false)}>
            Отменить
          </Button>
          <Button variant="primary" onClick={onCreate} loading={creating}>
            Зарегистрировать
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

