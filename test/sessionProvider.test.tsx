 
import { render, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { SessionProvider } from "../src";

// Exemplo de componente simples para ser renderizado
const ChildComponent = () => <div>Conteúdo Protegido</div>;

describe("SessionProvider", () => {
  it("deve renderizar os children quando o account existir", () => {
    // Cria um hook simulado que retorna um account válido 
    const useSessionStore = () => ({ account: { id: "123" } });

    const { getByText } = render(
      <SessionProvider useSessionStore={useSessionStore} redirectPath="/login">
        <ChildComponent />
      </SessionProvider>
    );
    expect(getByText("Conteúdo Protegido")).toBeInTheDocument();
  });

  it("deve redirecionar para redirectPath quando o account for nulo", async () => {
    // Para testar o redirecionamento, precisamos "mockar" o window.location
    const originalLocation = window.location;
    // Removemos a propriedade original e criamos uma nova manipulável para o teste
    delete (window as any).location;
    (window as any).location = { pathname: "/" };

    // Cria um hook simulado que retorna account nulo
    const useSessionStore = () => ({ account: null });

    render(
      <SessionProvider useSessionStore={useSessionStore} redirectPath="/login">
        <ChildComponent />
      </SessionProvider>
    );

    // Aguarda o efeito (useEffect) disparar e alterar o pathname
    await waitFor(() => {
      expect(window.location.pathname).toBe("/login");
    });

    // Restaura o window.location original após o teste
    window.location = originalLocation;
  });
});
