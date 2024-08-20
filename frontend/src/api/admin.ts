import axios, { isAxiosError } from "axios";
import { errorToast } from "../utils/toast";

export const signin = async (email: string, password: string) => {
  try {
    await axios.post("/api/v1/admin/signin", {
      email: email,
      password: password,
    });
    window.location.reload();
  } catch (error) {
    if (isAxiosError(error)) {
      errorToast(error.response?.data.message);
    } else {
      errorToast("Somthing went wrong");
    }
  }
};

export const fetchAllUser = async () => {
  try {
    const response = await axios.get("/api/v1/dashboard/admin/users");
    return response.data.message;
  } catch (err) {
    errorToast("Somthing went wrong");
  }
};
