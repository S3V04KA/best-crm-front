import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, CardHeader, CardContent } from "@/components/ui";
import { ArrowRight, Loader2 } from "lucide-react";
import { WorkspaceService, type ResponseWorkspaceDto } from "@/api";

export function WorkspacesPage() {
  const [workspaces, setWorkspaces] = useState<ResponseWorkspaceDto[]>([]);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

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

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-white">
            Добро пожаловать!
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-center">
            Выбирите группу
          </p>
        </CardHeader>

        {!isLoading ? (
          <CardContent>
            {error && (
              <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-md text-sm">
                {error}
              </div>
            )}

            <div className="space-y-4">
              {workspaces.map((w) => (
                <Button
                  key={w.id}
                  onClick={() => handleWorkspace(w.id)}
                  className="w-full"
                  disabled={isLoading}
                >
                  <ArrowRight className="mr-2 h-4 w-4" />
                  {w.name}
                </Button>
              ))}
            </div>
          </CardContent>
        ) : (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        )}
      </Card>
    </div>
  );
}
