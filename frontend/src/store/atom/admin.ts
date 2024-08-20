import { atom } from "recoil";
import { AllUserSelector } from "../selector/admin";

export const AllUserAtom = atom({
  key: "AllUserAtomAdmin",
  default: AllUserSelector,
});


