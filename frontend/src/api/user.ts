import axios, { isAxiosError } from "axios";
import { errorToast } from "../utils/toast";

export const signup = async (
  name: string,
  email: string,
  password: string,
  age: number,
  year: number,
  course: string
) => {
  try {
    await axios.post("/api/v1/user/signup", {
      name: name,
      email: email,
      password: password,
      age: age.toString(),
      year: year.toString(),
      course: course,
    });
    window.location.reload();
  } catch (error) {
    if (isAxiosError(error)) {
      errorToast(error.response?.data.message);
    }
  }
};

export const signin = async (email: string, password: string) => {
  try {
    await axios.post("/api/v1/user/signin", {
      email: email,
      password: password,
    });
    window.location.reload();
  } catch (error) {
    if (isAxiosError(error)) {
      errorToast(error.response?.data.message);
    }
  }
};

export const checkAuth = async () => {
  try {
    const response = await axios.get("/api/v1/user/auth");
    return response.data.authorized;
  } catch (error) {
    return false;
  }
};

export const fetchProfile = async () => {
  try {
    const response = await axios.get("/api/v1/user/me");
    return response.data.message;
  } catch (error) {
    errorToast("Error fetching profile");
    return null;
  }
};

export const updateUser = async (user: any) => {
  try {
    await axios.put("/api/v1/user/me", user);
  } catch (error) {
    errorToast("Error updating user. Please try again");
  }
};
