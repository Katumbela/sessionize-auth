"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var js_cookie_1 = __importDefault(require("js-cookie"));
var src_1 = require("../src");
describe("createSessionStore", function () {
    // Limpa os storages e mocks após cada teste
    afterEach(function () {
        localStorage.clear();
        sessionStorage.clear();
        js_cookie_1.default.remove("account");
        jest.clearAllMocks();
    });
    describe("usando localStorage", function () {
        it("deve inicializar o account a partir do localStorage se existir", function () {
            var accountData = { id: "123" };
            localStorage.setItem("account", JSON.stringify(accountData));
            var useSessionStore = (0, src_1.createSessionStore)({
                storageType: "localStorage",
            });
            var account = useSessionStore.getState().account;
            expect(account).toEqual(accountData);
        });
        it("deve setar e remover o account no localStorage", function () {
            var useSessionStore = (0, src_1.createSessionStore)({
                storageType: "localStorage",
            });
            var accountData = { id: "456" };
            // Inicia a sessão
            useSessionStore.getState().startSession(accountData);
            expect(JSON.parse(localStorage.getItem("account") || "")).toEqual(accountData);
            expect(useSessionStore.getState().account).toEqual(accountData);
            // Encerra a sessão
            useSessionStore.getState().closeSession();
            expect(localStorage.getItem("account")).toBeNull();
            expect(useSessionStore.getState().account).toBeNull();
        });
    });
    describe("usando sessionStorage", function () {
        it("deve inicializar o account a partir do sessionStorage se existir", function () {
            var accountData = { id: "789" };
            sessionStorage.setItem("account", JSON.stringify(accountData));
            var useSessionStore = (0, src_1.createSessionStore)({
                storageType: "sessionStorage",
            });
            var account = useSessionStore.getState().account;
            expect(account).toEqual(accountData);
        });
        it("deve setar e remover o account no sessionStorage", function () {
            var useSessionStore = (0, src_1.createSessionStore)({
                storageType: "sessionStorage",
            });
            var accountData = { id: "101" };
            // Inicia a sessão
            useSessionStore.getState().startSession(accountData);
            expect(JSON.parse(sessionStorage.getItem("account") || "")).toEqual(accountData);
            expect(useSessionStore.getState().account).toEqual(accountData);
            // Encerra a sessão
            useSessionStore.getState().closeSession();
            expect(sessionStorage.getItem("account")).toBeNull();
            expect(useSessionStore.getState().account).toBeNull();
        });
    });
    describe("usando cookies", function () {
        it("deve inicializar o account a partir dos cookies se existir", function () {
            var accountData = { id: "202" };
            js_cookie_1.default.set("account", JSON.stringify(accountData));
            var useSessionStore = (0, src_1.createSessionStore)({
                storageType: "cookies",
            });
            var account = useSessionStore.getState().account;
            expect(account).toEqual(accountData);
        });
        it("deve setar e remover o account via cookies", function () {
            var useSessionStore = (0, src_1.createSessionStore)({
                storageType: "cookies",
            });
            var accountData = { id: "303" };
            // Espiona os métodos do js-cookie
            var cookiesSetSpy = jest.spyOn(js_cookie_1.default, "set");
            var cookiesRemoveSpy = jest.spyOn(js_cookie_1.default, "remove");
            // Inicia a sessão
            useSessionStore.getState().startSession(accountData);
            expect(cookiesSetSpy).toHaveBeenCalledWith("account", JSON.stringify(accountData), {
                secure: true,
                sameSite: "Strict",
            });
            expect(useSessionStore.getState().account).toEqual(accountData);
            // Encerra a sessão
            useSessionStore.getState().closeSession();
            expect(cookiesRemoveSpy).toHaveBeenCalledWith("account");
            expect(useSessionStore.getState().account).toBeNull();
        });
    });
    describe("com storageType não especificado (default -> cookies)", function () {
        it("deve inicializar o account a partir dos cookies", function () {
            var accountData = { id: "404" };
            js_cookie_1.default.set("account", JSON.stringify(accountData));
            var useSessionStore = (0, src_1.createSessionStore)();
            var account = useSessionStore.getState().account;
            expect(account).toEqual(accountData);
        });
    });
});
