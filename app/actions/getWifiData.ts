import { WifiData } from "@/types/type";
import axios from "axios";

const getWifiData = async (
  searchParams: URLSearchParams,
): Promise<WifiData> => {
  try {
    const queryParams = new URLSearchParams(searchParams.toString());

    const response = await axios.get(`/api/wifi`, {
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      params: queryParams,
    });

    return response.data;
  } catch (error) {
    throw new Error("An unexpected error occurred. Please try again.");
  }
};

export default getWifiData;
