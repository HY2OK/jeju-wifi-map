import { WifiData } from "@/types/type";
import axios from "axios";

export default async function getWifiData(): Promise<WifiData[]> {
  const response = await axios.get(
    `https://open.jejudatahub.net/api/proxy/Dtb18ta1btbD1Da1a81aaDttab6tDabb/${process.env.NEXT_PUBLIC_WIFI_KEY}`,
    {
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    },
  );

  return response.data.data;
}
