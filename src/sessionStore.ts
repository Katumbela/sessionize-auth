import { create } from "zustand";
import Cookies from "js-cookie";
import { SessionOptions } from "./types";

export function createSessionStore<T>(options?: SessionOptions<T>) {
  const storage = {
    get: (): T | null => {
      if (options?.storageType === "localStorage") {
        return JSON.parse(localStorage.getItem("account") || "null");
      } else if (options?.storageType === "sessionStorage") {
        return JSON.parse(sessionStorage.getItem("account") || "null");
      } else {
        return Cookies.get("account")
          ? JSON.parse(Cookies.get("account")!)
          : null;
      }
    },
    set: (account: T) => {
      if (options?.storageType === "localStorage") {
        localStorage.setItem("account", JSON.stringify(account));
      } else if (options?.storageType === "sessionStorage") {
        sessionStorage.setItem("account", JSON.stringify(account));
      } else {
        Cookies.set("account", JSON.stringify(account), {
          secure: true,
          sameSite: "Strict",
        });
      }
    },
    remove: () => {
      if (options?.storageType === "localStorage") {
        localStorage.removeItem("account");
      } else if (options?.storageType === "sessionStorage") {
        sessionStorage.removeItem("account");
      } else {
        Cookies.remove("account");
      }
    },
  };

  return create<{
    account: T | null;
    startSession: (account: T) => void;
    closeSession: () => void;
  }>((set) => ({
    account: storage.get(),
    startSession: (account) => {
      storage.set(account);
      set({ account });
    },
    closeSession: () => {
      storage.remove();
      set({ account: null });
    },
  }));
}
