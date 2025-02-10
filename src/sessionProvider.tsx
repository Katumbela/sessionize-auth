import { ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SessionProviderProps } from "./types";

export default function SessionProvider({ children, useSessionStore, redirectPath }: SessionProviderProps) {
  const { account } = useSessionStore();
  const navigate = useNavigate();

  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      if (!account) {
        navigate(redirectPath);
      } else {
        setIsAuthenticated(true);
      }
    };
    checkAuth();
  }, [account, navigate, redirectPath]);

  if (isAuthenticated === null) return null;

  return <>{children}</>;
}
