import { useEffect } from "react";
import { SessionProviderProps } from "./types";


export default function SessionProvider({
  children,
  useSessionStore,
  redirectPath,
}: SessionProviderProps) {
  const { account } = useSessionStore();

  useEffect(() => {
    if (!account) {

      window.location.pathname = redirectPath;
    }
  }, [account, redirectPath]);

  return <>{children}</>;
}