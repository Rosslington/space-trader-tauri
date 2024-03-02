import { atom } from "jotai";

export const globalState = atom({
    username: "",
    token: "",
    accountData: null
});
