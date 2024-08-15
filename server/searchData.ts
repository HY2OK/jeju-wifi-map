import axios from "axios";

const searchData = async (address: string) => {
  const response = await axios.get(
    `https://open.jejudatahub.net/api/proxy/Dtb18ta1btbD1Da1a81aaDttab6tDabb/${process.env.NEXT_PUBLIC_WIFI_KEY}?addressDong=${address}`,
    {
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    },
  );

  return response.data.data;
};

export default searchData;
