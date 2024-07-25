import axios, { isAxiosError } from "axios";

export const fetchAllUser = async () => {
  try {
    const response = await axios.get("/api/v1/dashboard/user/users");
    return response.data.message;
  } catch (error) {
    if (isAxiosError(error)) {
      return null;
    }
  }
};
