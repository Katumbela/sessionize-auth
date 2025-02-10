import { ReactNode } from "react";
export interface SessionOptions<T> {
    storageType?: "localStorage" | "sessionStorage" | "cookies";
    accountType?: T;
}
export interface SessionProviderProps {
    children: ReactNode;
    useSessionStore: any;
    redirectPath: string;
}
//# sourceMappingURL=types.d.ts.map