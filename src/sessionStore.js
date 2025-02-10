"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSessionStore = createSessionStore;
var zustand_1 = require("zustand");
var js_cookie_1 = __importDefault(require("js-cookie"));
function createSessionStore(options) {
    var storage = {
        get: function () {
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
        set: function (account) {
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
        remove: function () {
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
    return (0, zustand_1.create)(function (set) { return ({
        account: storage.get(),
        startSession: function (account) {
            storage.set(account);
            set({ account: account });
        },
        closeSession: function () {
            storage.remove();
            set({ account: null });
        },
    }); });
}
