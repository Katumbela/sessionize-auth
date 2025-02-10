"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = createSessionStore;
const zustand_1 = require("zustand");
const js_cookie_1 = __importDefault(require("js-cookie"));
function createSessionStore(options) {
    const storage = {
        get: () => {
            if ((options === null || options === void 0 ? void 0 : options.storageType) === "localStorage") {
                return JSON.parse(localStorage.getItem("account") || "null");
            }
            else if ((options === null || options === void 0 ? void 0 : options.storageType) === "sessionStorage") {
                return JSON.parse(sessionStorage.getItem("account") || "null");
            }
            else {
                return js_cookie_1.default.get("account")
                    ? JSON.parse(js_cookie_1.default.get("account"))
                    : null;
            }
        },
        set: (account) => {
            if ((options === null || options === void 0 ? void 0 : options.storageType) === "localStorage") {
                localStorage.setItem("account", JSON.stringify(account));
            }
            else if ((options === null || options === void 0 ? void 0 : options.storageType) === "sessionStorage") {
                sessionStorage.setItem("account", JSON.stringify(account));
            }
            else {
                js_cookie_1.default.set("account", JSON.stringify(account), {
                    secure: true,
                    sameSite: "Strict",
                });
            }
        },
        remove: () => {
            if ((options === null || options === void 0 ? void 0 : options.storageType) === "localStorage") {
                localStorage.removeItem("account");
            }
            else if ((options === null || options === void 0 ? void 0 : options.storageType) === "sessionStorage") {
                sessionStorage.removeItem("account");
            }
            else {
                js_cookie_1.default.remove("account");
            }
        },
    };
    return (0, zustand_1.create)((set) => ({
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
