import Cookies from "js-cookie";
import { createSessionStore } from "../src";

describe("createSessionStore", () => {
  // Limpa os storages e mocks após cada teste
  afterEach(() => {
    localStorage.clear();
    sessionStorage.clear();
    Cookies.remove("account");
    jest.clearAllMocks();
  });

  describe("usando localStorage", () => {
    it("deve inicializar o account a partir do localStorage se existir", () => {
      const accountData = { id: "123" };
      localStorage.setItem("account", JSON.stringify(accountData));

      const useSessionStore = createSessionStore<{ id: string }>({
        storageType: "localStorage",
      });
      const { account } = useSessionStore.getState();
      expect(account).toEqual(accountData);
    });

    it("deve setar e remover o account no localStorage", () => {
      const useSessionStore = createSessionStore<{ id: string }>({
        storageType: "localStorage",
      });
      const accountData = { id: "456" };

      // Inicia a sessão
      useSessionStore.getState().startSession(accountData);
      expect(JSON.parse(localStorage.getItem("account") || "")).toEqual(
        accountData
      );
      expect(useSessionStore.getState().account).toEqual(accountData);

      // Encerra a sessão
      useSessionStore.getState().closeSession();
      expect(localStorage.getItem("account")).toBeNull();
      expect(useSessionStore.getState().account).toBeNull();
    });
  });

  describe("usando sessionStorage", () => {
    it("deve inicializar o account a partir do sessionStorage se existir", () => {
      const accountData = { id: "789" };
      sessionStorage.setItem("account", JSON.stringify(accountData));

      const useSessionStore = createSessionStore<{ id: string }>({
        storageType: "sessionStorage",
      });
      const { account } = useSessionStore.getState();
      expect(account).toEqual(accountData);
    });

    it("deve setar e remover o account no sessionStorage", () => {
      const useSessionStore = createSessionStore<{ id: string }>({
        storageType: "sessionStorage",
      });
      const accountData = { id: "101" };

      // Inicia a sessão
      useSessionStore.getState().startSession(accountData);
      expect(JSON.parse(sessionStorage.getItem("account") || "")).toEqual(
        accountData
      );
      expect(useSessionStore.getState().account).toEqual(accountData);

      // Encerra a sessão
      useSessionStore.getState().closeSession();
      expect(sessionStorage.getItem("account")).toBeNull();
      expect(useSessionStore.getState().account).toBeNull();
    });
  });

  describe("usando cookies", () => {
    it("deve inicializar o account a partir dos cookies se existir", () => {
      const accountData = { id: "202" };
      Cookies.set("account", JSON.stringify(accountData));

      const useSessionStore = createSessionStore<{ id: string }>({
        storageType: "cookies",
      });
      const { account } = useSessionStore.getState();
      expect(account).toEqual(accountData);
    });

    it("deve setar e remover o account via cookies", () => {
      const useSessionStore = createSessionStore<{ id: string }>({
        storageType: "cookies",
      });
      const accountData = { id: "303" };

      // Espiona os métodos do js-cookie
      const cookiesSetSpy = jest.spyOn(Cookies, "set");
      const cookiesRemoveSpy = jest.spyOn(Cookies, "remove");

      // Inicia a sessão
      useSessionStore.getState().startSession(accountData);
      expect(cookiesSetSpy).toHaveBeenCalledWith(
        "account",
        JSON.stringify(accountData),
        {
          secure: true,
          sameSite: "Strict",
        }
      );
      expect(useSessionStore.getState().account).toEqual(accountData);

      // Encerra a sessão
      useSessionStore.getState().closeSession();
      expect(cookiesRemoveSpy).toHaveBeenCalledWith("account");
      expect(useSessionStore.getState().account).toBeNull();
    });
  });

  describe("com storageType não especificado (default -> cookies)", () => {
    it("deve inicializar o account a partir dos cookies", () => {
      const accountData = { id: "404" };
      Cookies.set("account", JSON.stringify(accountData));

      const useSessionStore = createSessionStore<{ id: string }>();
      const { account } = useSessionStore.getState();
      expect(account).toEqual(accountData);
    });
  });
});
