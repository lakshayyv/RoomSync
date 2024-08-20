import { selector } from "recoil";
import { checkAuth } from "../../api/auth";

export const AuthSelector = selector({
    key: "AuthSelector",
    get: async () => {
      const response = await checkAuth();
      return response;
    },
  });
