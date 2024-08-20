import axios from "axios";

export const checkAuth = async () => {
  try {
    const response = await axios.get("/api/v1/auth/check");
    return response.data.authorized;
  } catch (error) {
    return false;
  }
};
