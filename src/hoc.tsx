
import { FC, useEffect } from "react";

const withAuth = <T,>(
  WrappedComponent: FC,
  sessionStore: () => { account: T | null },
  redirectPath = "/login" // Caminho padrão para redirecionamento
) => {
  const AuthenticatedComponent: FC = (props) => {

    const account = sessionStore().account; // Obtém o estado da sessão

    useEffect(() => {
      if (!account) {
        window.location.pathname = redirectPath;
      }
    }, [account]);

    if (!account) return null;

    return <WrappedComponent {...props} />;
  };

  return AuthenticatedComponent;
};

export default withAuth;
