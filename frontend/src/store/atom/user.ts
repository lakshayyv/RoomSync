import { atom } from "recoil";
import {
  AllUserSelector,
  AuthSelector,
  DataSelector,
  UserSelector,
} from "../selector/user";
import { UserType } from "../../utils/types";

export const AuthAtom = atom({
  key: "AuthAtom",
  default: AuthSelector,
});

export const DataAtom = atom({
  key: "DataAtom",
  default: DataSelector,
});

export const AllUserAtom = atom({
  key: "AllUserAtom",
  default: AllUserSelector,
});

export const LoaderAtom = atom({
  key: "LoaderAtom",
  default: false,
});

export const UserAtom = atom<UserType | null>({
  key: "UserAtom",
  default: UserSelector,
});
