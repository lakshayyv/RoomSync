import { selector } from "recoil";
import { fetchAllUser } from "../../api/admin";

export const AllUserSelector = selector({
  key: "AllUserSelectorAdmin",
  get: async () => {
    const response = await fetchAllUser();
    return response;
  },
});
