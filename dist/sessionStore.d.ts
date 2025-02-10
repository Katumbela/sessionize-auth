import { SessionOptions } from "./types";
export default function createSessionStore<T>(options?: SessionOptions<T>): import("zustand").UseBoundStore<import("zustand").StoreApi<{
    account: T | null;
    startSession: (account: T) => void;
    closeSession: () => void;
}>>;
//# sourceMappingURL=sessionStore.d.ts.map