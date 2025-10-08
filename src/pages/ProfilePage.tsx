import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Button,
  Input,
  Info,
} from "@/components/ui";
import { UsersService, type RegisterDto } from "@/api";

export const ProfilePage: React.FC = () => {
  const [profile, setProfile] = useState<RegisterDto | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await UsersService.usersControllerMe();
        if (!ignore) setProfile(data);
      } catch (e: unknown) {
        console.error("Error fetching profile:", e);
        const errorMessage =
          e instanceof Error ? e.message : "Ошибка загрузки профиля";
        setError(errorMessage);
      } finally {
        if (!ignore) setLoading(false);
      }
    };
    load();
    return () => {
      ignore = true;
    };
  }, []);

  return (
    <div className="max-w-2xl">
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold text-primary-600">Profile</h3>
        </CardHeader>
        <CardContent>
          {error && <Info tone="destructive">{error}</Info>}
          {loading ? (
            <div className="text-sm text-gray-600">Загрузка...</div>
          ) : profile ? (
            <div className="space-y-4">
              <Input label="Имя" value={profile.fullName} disabled readOnly />
              <Input
                label="Email"
                type="email"
                value={profile.email}
                disabled
                readOnly
              />
              <div className="flex justify-end">
                <Button
                  variant="primary"
                  disabled
                  title="Редактирование запрещено"
                >
                  Сохранить
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-sm text-gray-600">Нет данных</div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
