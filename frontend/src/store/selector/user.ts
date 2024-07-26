import axios from "axios";
import { selector } from "recoil";
import { checkAuth, fetchOngoingRequest, fetchProfile, fetchReceivedRequest, fetchSentRequest } from "../../api/user";
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

export const ReceivedRequestSelector = selector({
  key: "ReceivedRequestSelector",
  get: async () => {
    const response = await fetchReceivedRequest();
    console.log("Received: ", response);
    return response;
  },
});

export const SentRequestSelector = selector({
  key: "SentRequestSelector",
  get: async () => {
    const response = await fetchSentRequest();
    console.log("Sent: ", response);
    return response;
  },
});

export const OngoingRequestSelector = selector({
  key: "OngoingRequestSelector",
  get: async () => {
    const response = await fetchOngoingRequest();
    console.log("Ongoing: ", response);
    return response;
  },
});
