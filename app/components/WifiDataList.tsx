"use client";
import getWifiData from "@/server/getWifiData";
import { useQuery } from "@tanstack/react-query";

const WifiDataList = () => {
  const { data, error, isFetched } = useQuery({
    queryKey: ["wifi"],
    queryFn: getWifiData,
  });

  return (
    <div>
      {data?.map((data, index) => <div key={index}>{data.addressDong}</div>)}
    </div>
  );
};

export default WifiDataList;
