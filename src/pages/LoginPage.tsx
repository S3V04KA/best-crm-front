import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Input, Card, CardHeader, CardContent } from "@/components/ui";
import { Mail, ArrowRight, Loader2 } from "lucide-react";
import { AuthService } from "@/api/services/AuthService";

type AuthStep = "email" | "code";

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [step, setStep] = useState<AuthStep>("email");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError("Пожалуйста, введите ваш email");
      return;
    }

    try {
      setIsLoading(true);
      setError("");

      const response = await AuthService.authControllerSendCode({
        email,
      });

      if (response.success) {
        setStep("code");
      }
    } catch (err) {
      setError("Почта не найдена.");
      console.log("Login error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) {
      setError("Пожалуйста, введите ваш пароль");
      return;
    }

    try {
      setIsLoading(true);
      setError("");

      const response = await AuthService.authControllerLogin({
        email,
        code: password,
      });

      if (response?.access_token) {
        localStorage.setItem("access_token", response.access_token);
        const redirectTo = "/workspaces";
        navigate(redirectTo);
      }
    } catch (err) {
      setError("Неверный код. Пожалуйста, попробуйте снова.");
      console.error("Login error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-white">
            Welcome Back
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-center">
            {step === "email" ? "Введите ваш email" : `Войти как ${email}`}
          </p>
        </CardHeader>

        <CardContent>
          {error && (
            <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-md text-sm">
              {error}
            </div>
          )}

          {step === "email" ? (
            <form onSubmit={handleEmailSubmit} className="space-y-4">
              <div className="relative">
                <Input
                  label="Email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                  required
                  className="pl-10"
                />
                <Mail className="absolute left-3 top-9 h-5 w-5 text-gray-400" />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <ArrowRight className="mr-2 h-4 w-4" />
                )}
                Продолжить с email
              </Button>
            </form>
          ) : (
            <form onSubmit={handleLogin} className="space-y-4">
              <Input
                label="Пароль"
                type="password"
                placeholder="Пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                required
              />
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <ArrowRight className="mr-2 h-4 w-4" />
                )}
                Войти
              </Button>
              <Button
                type="button"
                variant="ghost"
                className="w-full text-sm text-gray-600 dark:text-gray-400"
                onClick={() => setStep("email")}
                disabled={isLoading}
              >
                Назад
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
