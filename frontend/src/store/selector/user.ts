import axios from "axios";
import { selector } from "recoil";
import { checkAuth, fetchProfile } from "../../api/user";
import { fetchAllUser } from "../../api/dashboard";

export const DataSelector = selector({
  key: "DataSelector",
  get: async () => {
    const response = await axios.get("/api/v1/user/me");
    return response.data.message;
  },
});

export const AllUserSelector = selector({
  key: "AllUserSelector",
  get: async () => {
    const response = await fetchAllUser();
    return response;
  },
});

export const AuthSelector = selector({
  key: "AuthSelector",
  get: async () => {
    const response = await checkAuth();
    return response;
  },
});

export const UserSelector = selector({
  key: "UserSelector",
  get: async () => {
    const response = await fetchProfile();
    return response;
  },
});
