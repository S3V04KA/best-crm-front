import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, CardHeader, CardContent, Info } from "@/components/ui";
import { ArrowRight, Loader2, TrashIcon } from "lucide-react";
import { WorkspaceService, type ResponseWorkspaceDto } from "@/api";
import { useAuth } from "@/contexts/useAuth";
import { checkPermissions, PermissionCodes } from "@/types/permissions";
import { CreateWorkspaceDialog } from "@/components/dialogs/CreateWorkspaceDialog";

export function WorkspacesPage() {
  const { user } = useAuth();
  const [workspaces, setWorkspaces] = useState<ResponseWorkspaceDto[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const permissionedCreate = checkPermissions(user?.permissions, [
    PermissionCodes.workspaceCreate,
  ]);

  const permissionedDelete = checkPermissions(user?.permissions, [
    PermissionCodes.workspaceDelete,
  ]);

  const loadWorkspaces = async () => {
    setIsLoading(true);
    setError("");
    try {
      const data = await WorkspaceService.workspaceControllerListMine();
      setWorkspaces(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Ошибка при загрузке групп");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadWorkspaces();
  }, []);

  const handleWorkspace = async (id: string) => {
    setIsLoading(true);
    setError("");
    navigate(`/workspace/${id}/leads`);
  };

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm("Вы уверены, что хотите удалить этот workspace?")) {
      return;
    }

    setIsLoading(true);
    setError("");
    try {
      await WorkspaceService.workspaceControllerDelete(id);
      loadWorkspaces();
    } catch (e) {
      setError(
        e instanceof Error ? e.message : "Ошибка при удалении workspace"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Мои workspace
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                Выбирите группу для работы
              </p>
            </div>
            {permissionedCreate && (
              <CreateWorkspaceDialog callback={loadWorkspaces} />
            )}
          </div>
        </CardHeader>

        {!isLoading ? (
          <CardContent>
            {error && <Info tone="destructive">{error}</Info>}

            {workspaces.length === 0 ? (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                У вас пока нет workspace.
                {permissionedCreate &&
                  " Создайте новый workspace, чтобы начать работу."}
              </div>
            ) : (
              <div className="space-y-3">
                {workspaces.map((w) => (
                  <div
                    key={w.id}
                    onClick={() => handleWorkspace(w.id)}
                    className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <Button
                      variant="ghost"
                      className="flex-1 justify-start"
                      disabled={isLoading}
                    >
                      <ArrowRight className="mr-2 h-4 w-4" />
                      {w.name}
                    </Button>
                    {permissionedDelete && (
                      <Button
                        variant="ghost"
                        onClick={(e) => handleDelete(w.id, e)}
                        disabled={isLoading}
                        className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                      >
                        <TrashIcon className="h-5 w-5" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        ) : (
          <div className="flex justify-center p-8">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        )}
      </Card>
    </div>
  );
}
