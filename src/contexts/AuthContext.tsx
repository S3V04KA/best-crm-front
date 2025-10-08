import { createContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { UsersService } from "@/api/services/UsersService";
import { AuthService } from "@/api/services/AuthService";
import { handleApiError } from "@/api/config";
import { AccessControlService } from "@/api";
import { PermissionCodes, PermissionCodesConvert } from "@/types/permissions";

type User = {
  id: string;
  email: string;
  fullName: string;

  permissions?: PermissionCodes[];
  // Add other user fields as needed
};

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("access_token");
        if (!token) {
          setIsLoading(false);
          return;
        }

        const userData = await UsersService.usersControllerMe();
        const permissions = await AccessControlService.aclControllerListMine();
        setUser({
          ...(userData as User),
          permissions: permissions.permissions.map(
            (p) => PermissionCodesConvert[p]
          ),
        });
      } catch (error) {
        console.error("Auth check failed:", error);
        localStorage.removeItem("access_token");
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const response = await AuthService.authControllerLogin({
        email,
        code: password,
      });

      if (response?.access_token) {
        localStorage.setItem("access_token", response.access_token);
        const userData = await UsersService.usersControllerMe();
        setUser(userData as User);
      }
    } catch (error) {
      handleApiError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
}

export { AuthContext };
