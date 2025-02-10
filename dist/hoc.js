"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const withAuth = (WrappedComponent, sessionStore, redirectPath = "/login" // Caminho padrão para redirecionamento
) => {
    const AuthenticatedComponent = (props) => {
        const account = sessionStore().account; // Obtém o estado da sessão
        (0, react_1.useEffect)(() => {
            if (!account) {
                window.location.pathname = redirectPath;
            }
        }, [account]);
        if (!account)
            return null;
        return (0, jsx_runtime_1.jsx)(WrappedComponent, Object.assign({}, props));
    };
    return AuthenticatedComponent;
};
exports.default = withAuth;
