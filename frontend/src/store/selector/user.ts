import axios from "axios";
import { selector } from "recoil";

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
    const response = await axios.get("/api/v1/dashboard/user/users");
    console.log(response.data.message);
    return response.data.message;
  },
});
