import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProfilePage } from "@/pages/ProfilePage";
import { LeadsPage } from "@/pages/LeadsPage";
import { LoginPage } from "@/pages/LoginPage";
import { useAuth } from "@/contexts/useAuth";
import { AppLayout } from "@/components/layout/AppLayout";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { initTheme } from "@/utils/theme";
import type { JSX } from "react";
import { WorkspacesPage } from "./pages/WorkspacesPage";
import { WorkspacePage } from "./pages/WorkspacePage";

// Protected Route component
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

// Public Route component
const PublicRoute = ({ children }: { children: JSX.Element }) => {
  const { user } = useAuth();
  const location = useLocation();

  if (user) {
    const from =
      (location.state as { from?: { pathname: string } })?.from?.pathname ||
      "/";
    return <Navigate to={from} replace state={{ from: location }} />;
  }

  return children;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/login"
        element={
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        }
      />
      <Route
        path="/workspace/:workspaceId/leads"
        element={
          <ProtectedRoute>
            <AppLayout>
              <LeadsPage />
            </AppLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/workspace/:workspaceId"
        element={
          <ProtectedRoute>
            <AppLayout>
              <WorkspacePage />
            </AppLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/workspaces"
        element={
          <ProtectedRoute>
            <WorkspacesPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/:workspaceId/profile"
        element={
          <ProtectedRoute>
            <AppLayout>
              <ProfilePage />
            </AppLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Navigate to="/workspaces" replace />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

// Initialize theme on app load
if (typeof window !== "undefined") {
  initTheme();
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </ThemeProvider>
  );
}

// Rest of the code remains the same...

// AppLayout component remains the same...

export default App;
