import { WifiData } from "@/types/type";
import axios from "axios";

const searchData = async (address: string): Promise<WifiData> => {
  const response = await axios.get(`/api/wifi?addressDong=${address}`);

  return response.data;
};

export default searchData;
