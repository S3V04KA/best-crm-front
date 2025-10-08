import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { cn } from "@/utils/cn";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/contexts/useAuth";
import { useTheme } from "@/hooks/useTheme";
import {
  MoonIcon,
  SunIcon,
  Cog6ToothIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui";
import { WorkspaceService } from "@/api/services/WorkspaceService";
import type { ResponseWorkspaceDto } from "@/api/models/ResponseWorkspaceDto";
import { Loader2 } from "lucide-react";
import { checkPermissions, PermissionCodes } from "@/types/permissions";

interface NavItem {
  name: string;
  href: string;
  icon: React.ReactNode;
  permissions?: PermissionCodes[];
}

const navigation: NavItem[] = [
  {
    name: "Компании",
    href: "/workspace/{workspaceId}/leads",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
      </svg>
    ),
  },
  {
    name: "Группа",
    href: "/workspace/{workspaceId}",
    permissions: [PermissionCodes.workspaceUpdate],
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        viewBox="0 0 16 16"
      >
        <path d="M4 16s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-5.95a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5" />
        <path d="M2 1a2 2 0 0 0-2 2v9.5A1.5 1.5 0 0 0 1.5 14h.653a5.4 5.4 0 0 1 1.066-2H1V3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v9h-2.219c.554.654.89 1.373 1.066 2h.653a1.5 1.5 0 0 0 1.5-1.5V3a2 2 0 0 0-2-2z" />
      </svg>
    ),
  },
  // Add more navigation items here as needed
];

export function AppLayout({ children }: { children: React.ReactNode }) {
  const workspaceId = useParams().workspaceId;
  const [workspaces, setWorkspaces] = useState<ResponseWorkspaceDto[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  console.log(user);

  const loadWorkspaces = async () => {
    try {
      setIsLoading(true);
      const data = await WorkspaceService.workspaceControllerListMine();
      setWorkspaces(data);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  // Close sidebar when route changes
  useEffect(() => {
    loadWorkspaces();
    setSidebarOpen(false);
  }, [location.pathname]);

  if (isLoading) {
    return (
      <div className="w-svw h-svh flex justify-center items-center">
        <Loader2 className="animate-spin min-w-[10%] min-h-[10%] text-primary-600" />
      </div>
    );
  }

  return (
    <div className="h-screen flex overflow-hidden bg-white dark:bg-gray-900">
      {/* Mobile sidebar backdrop */}
      <div
        className={`fixed inset-0 bg-gray-600 bg-opacity-75 z-40 md:hidden ${
          sidebarOpen ? "block" : "hidden"
        }`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Mobile sidebar */}
      <div
        className={`fixed inset-y-0 left-0 flex flex-col w-64 z-50 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:translate-x-0 transition-transform duration-200 ease-in-out`}
      >
        <div className="flex-1 flex flex-col min-h-0 border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            {/* Mobile header */}
            <div className="flex items-center justify-between px-4">
              <div className="flex items-center">
                <Select
                  value={workspaceId}
                  onValueChange={(id) => {
                    navigate(`/workspace/${id}/leads`);
                    window.location.reload();
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Выбери cr компанию" />
                  </SelectTrigger>
                  <SelectContent>
                    {workspaces.map((w) => (
                      <SelectItem key={w.id} value={w.id || ""}>
                        {w.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <button
                type="button"
                className="md:hidden text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-200"
                onClick={() => setSidebarOpen(false)}
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            {/* Navigation */}
            <div className="mt-5 flex-1 flex flex-col">
              <nav className="flex-1 px-2 space-y-1">
                {navigation.map((item) => {
                  if (!checkPermissions(user?.permissions, item.permissions))
                    return;
                  return (
                    <Link
                      key={item.name}
                      to={item.href.replaceAll(
                        "{workspaceId}",
                        workspaceId || ""
                      )}
                      className={cn(
                        location.pathname === item.href
                          ? "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                          : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white",
                        "group flex items-center px-2 py-3 text-sm font-medium rounded-md"
                      )}
                    >
                      <span className="mr-3 h-6 flex items-center">
                        {item.icon}
                      </span>
                      {item.name}
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Theme Toggle */}
            <div className="px-4 py-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleTheme}
                className="w-full flex items-center justify-center space-x-2 text-gray-700 dark:text-gray-200"
              >
                {theme === "dark" ? (
                  <>
                    <SunIcon className="h-4 w-4" />
                    <span>Светлая тема</span>
                  </>
                ) : (
                  <>
                    <MoonIcon className="h-4 w-4" />
                    <span>Темная тема</span>
                  </>
                )}
              </Button>
            </div>

            {/* Profile Section */}
            <div className="flex-shrink-0 border-t border-gray-200 dark:border-gray-700 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <img
                      className="h-10 w-10 rounded-full"
                      src={`https://ui-avatars.com/api/?name=${user?.fullName || "User"}&background=random`}
                      alt="User avatar"
                    />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-200">
                      {user?.fullName || "User"}
                    </p>
                    <div className="flex items-center">
                      <Button
                        variant="ghost"
                        size="xs"
                        className="mt-1 -ml-2 text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                        onClick={logout}
                      >
                        Выход
                      </Button>
                    </div>
                  </div>
                </div>
                <Link to={`/${workspaceId}/profile`}>
                  <Button
                    variant="ghost"
                    size="xs"
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  >
                    <Cog6ToothIcon className="h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col w-0 flex-1 overflow-hidden bg-gray-50 dark:bg-gray-900">
        {/* Mobile top header */}
        <div className="md:hidden flex items-center justify-between px-4 py-2 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <button
            type="button"
            className="text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-200"
            onClick={() => setSidebarOpen(true)}
          >
            <Bars3Icon className="h-6 w-6" />
          </button>
          <div className="w-6"></div> {/* Spacer for alignment */}
        </div>

        <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none">
          <div className="py-6">
            <div className="w-full px-4 sm:px-6">{children}</div>
          </div>
        </main>
      </div>
    </div>
  );
}
