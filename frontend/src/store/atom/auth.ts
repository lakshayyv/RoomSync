import { atom } from "recoil";
import { AuthSelector } from "../selector/auth";

export const AuthAtom = atom({
    key: "AuthAtom",
    default: AuthSelector,
  });