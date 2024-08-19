"use client";

import getWifiData from "@/server/getWifiData";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import WifiDataCard from "./WifiDataCard";
import LoadingSkeleton from "./LoadingSkeleton";
import { WifiData } from "@/types/type";
import clickMarker from "@/lib/clickMarker";
import { useEffect, useRef } from "react";

const WifiDataList = ({ isLoading }: { isLoading: boolean }) => {
  const queryClient = useQueryClient();
  const cardRefs = useRef<HTMLDivElement[]>([]);

  const { data: dataList } = useQuery({
    queryKey: ["wifi"],
    queryFn: getWifiData,
  });

  const handleClick = (clickedData: WifiData, index: number) => {
    return clickMarker(queryClient, clickedData);
  };

  useEffect(() => {
    const dataIndex = dataList?.findIndex((data) => data.isClicked === true);

    if (dataIndex && dataIndex !== -1) {
      cardRefs.current[dataIndex]?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [dataList]);

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
      {dataList?.map((data, index) => (
        <WifiDataCard
          data={data}
          key={index}
          index={index}
          handleClick={handleClick}
          ref={(el) => {
            cardRefs.current[index] = el!;
          }}
        />
      ))}
    </div>
  );
};

export default WifiDataList;
