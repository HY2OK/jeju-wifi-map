import { WifiData } from "@/types/type";
import axios from "axios";

export default async function getWifiData(): Promise<WifiData[]> {
  const response = await axios.get(`/api/wifi`);

  return response.data;
}
