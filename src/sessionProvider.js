"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionProvider = SessionProvider;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
function SessionProvider(_a) {
    var children = _a.children, useSessionStore = _a.useSessionStore, redirectPath = _a.redirectPath;
    var account = useSessionStore().account;
    (0, react_1.useEffect)(function () {
        if (!account) {
            window.location.pathname = redirectPath;
        }
    }, [account, redirectPath]);
    return (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: children });
}
