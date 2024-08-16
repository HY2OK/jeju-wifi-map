"use client";

import getWifiData from "@/server/getWifiData";
import { useQuery } from "@tanstack/react-query";
import WifiDataCard from "./WifiDataCard";
import LoadingSkeleton from "./LoadingSkeleton";

const WifiDataList = ({ isLoading }: { isLoading: boolean }) => {
  const { data } = useQuery({
    queryKey: ["wifi"],
    queryFn: getWifiData,
  });

  if (isLoading) {
    return (
      <div className="flex flex-col gap-3 p-3">
        {[1, 2, 3].map((e) => (
          <LoadingSkeleton key={e} />
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 p-3">
      {data?.map((data) => <WifiDataCard data={data} key={data.macAddress} />)}
    </div>
  );
};

export default WifiDataList;
