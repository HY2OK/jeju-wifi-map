"use client";

import getWifiData from "@/server/getWifiData";
import { useQuery } from "@tanstack/react-query";
import WifiDataCard from "./WifiDataCard";

const WifiDataList = () => {
  const { data } = useQuery({
    queryKey: ["wifi"],
    queryFn: getWifiData,
  });

  return (
    <div className="flex w-full flex-col items-center justify-center gap-3 p-2">
      {data?.map((data) => <WifiDataCard data={data} key={data.macAddress} />)}
    </div>
  );
};

export default WifiDataList;
