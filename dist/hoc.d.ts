import { FC } from "react";
declare const withAuth: <T>(WrappedComponent: FC, sessionStore: () => {
    account: T | null;
}, redirectPath?: string) => FC;
export default withAuth;
//# sourceMappingURL=hoc.d.ts.map