"use client";

import getWifiData from "@/server/getWifiData";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import WifiDataCard from "./WifiDataCard";
import LoadingSkeleton from "./LoadingSkeleton";
import { WifiData } from "@/types/type";

const WifiDataList = ({ isLoading }: { isLoading: boolean }) => {
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ["wifi"],
    queryFn: getWifiData,
  });

  const handleClick = (clickedData: WifiData) => {
    queryClient.setQueryData(["wifi"], (oldData: WifiData[]) => {
      return oldData.map((item) => {
        if (item.isClicked) return { ...item, isClicked: false };

        if (
          item.macAddress === clickedData.macAddress &&
          item.apGroupName === clickedData.apGroupName
        ) {
          return { ...item, isClicked: true };
        }

        return item;
      });
    });
  };

  if (isLoading) {
    return (
      <div className="flex flex-col gap-3 p-3">
        {[1, 2, 3].map((e) => (
          <LoadingSkeleton key={e} />
        ))}
      </div>
    );
  }

  console.log(data);

  return (
    <div className="flex flex-col gap-3 p-3">
      {data?.map((data, index) => (
        <WifiDataCard data={data} key={index} handleClick={handleClick} />
      ))}
    </div>
  );
};

export default WifiDataList;
