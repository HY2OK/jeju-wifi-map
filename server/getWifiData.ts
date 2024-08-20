import { WifiData } from "@/types/type";
import axios from "axios";

const getWifiData = async (
  params?: Record<string, string>,
): Promise<WifiData> => {
  const queryParams = params ? new URLSearchParams(params) : "";

  const response = await axios.get(`/api/wifi`, {
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
    params: queryParams,
  });

  return response.data;
};

export default getWifiData;
