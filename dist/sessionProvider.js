"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SessionProvider;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
function SessionProvider({ children, useSessionStore, redirectPath, }) {
    const { account } = useSessionStore();
    (0, react_1.useEffect)(() => {
        if (!account) {
            window.location.pathname = redirectPath;
        }
    }, [account, redirectPath]);
    return (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: children });
}
