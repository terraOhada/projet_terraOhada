import axios from "axios";
import { USERS_URL } from "../api/api";

export const userInfo = async (userId: string) => {
  try {
    const response = await axios.get(`${USERS_URL}/un-utilisateur/${userId}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error;
    } else {
      throw new Error("An unknown error occurred while fetching user info");
    }
  }
};
