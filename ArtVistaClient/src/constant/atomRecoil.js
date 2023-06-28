import { atom } from "recoil";

export const userAtom = atom({
    key: "userState",
    default: {userId: null, username: ''},
})