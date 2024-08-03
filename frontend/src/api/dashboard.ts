import axios, { isAxiosError } from "axios";
import { errorToast, successToast } from "../utils/toast";

export const fetchAllUser = async () => {
  try {
    const response = await axios.get("/api/v1/dashboard/user/users");
    console.log(response.data.message);
    return response.data.message;
  } catch (error) {
    if (isAxiosError(error)) {
      return error.response?.data.message;
    }
  }
};

export const sendRequest = async (id: string) => {
  try {
    const response = await axios.get("/api/v1/request/user/request?id=" + id);
    successToast(response.data.message);
  } catch (error) {
    if (isAxiosError(error)) {
      errorToast(error.response?.data.message);
    }
  }
};
