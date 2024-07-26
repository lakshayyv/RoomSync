import { atom } from "recoil";
import {
  AllUserSelector,
  AuthSelector,
  DataSelector,
  OngoingRequestSelector,
  ReceivedRequestSelector,
  SentRequestSelector,
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

export const ReceivedRequestAtom = atom({
  key: "RecievedRequestAtom",
  default: ReceivedRequestSelector,
});

export const SentRequestAtom = atom({
  key: "SentRequestAtom",
  default: SentRequestSelector,
});

export const OngoingRequestAtom = atom({
  key: "OngoingRequestAtom",
  default: OngoingRequestSelector,
});
