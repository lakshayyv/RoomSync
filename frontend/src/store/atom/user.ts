import { atom } from "recoil";
import { DataSelector } from "../selector/user";

export const AuthAtom = atom({
  key: "AuthAtom",
  default: false,
});

export const DataAtom = atom({
  key: "DataAtom",
  default: DataSelector,
});

export const AllUserAtom = atom({
  key: "AllUserAtom",
  default: [],
});

export const LoaderAtom = atom({
  key: "LoaderAtom",
  default: false,
});
