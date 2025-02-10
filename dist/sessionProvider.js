"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SessionProvider;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
function SessionProvider({ children, useSessionStore, redirectPath }) {
    const { account } = useSessionStore();
    const [isAuthenticated, setIsAuthenticated] = (0, react_1.useState)(null);
    (0, react_1.useEffect)(() => {
        const checkAuth = () => __awaiter(this, void 0, void 0, function* () {
            if (!account) {
                window.location.pathname = redirectPath;
            }
            else {
                setIsAuthenticated(true);
            }
        });
        checkAuth();
    }, [account, redirectPath]);
    if (isAuthenticated === null)
        return null;
    return (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: children });
}
