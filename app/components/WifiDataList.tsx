"use client";

import getWifiData from "@/server/getWifiData";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import WifiDataCard from "./WifiDataCard";
import LoadingSkeleton from "./LoadingSkeleton";
import { WifiDetail } from "@/types/type";
import clickMarker from "@/lib/clickMarker";
import { useEffect, useRef } from "react";

const WifiDataList = ({ isLoading }: { isLoading: boolean }) => {
  const queryClient = useQueryClient();
  const cardRefs = useRef<HTMLDivElement[]>([]);

  const { data } = useQuery({
    queryKey: ["wifi"],
    queryFn: getWifiData,
  });

  const handleClick = (clickedData: WifiDetail) => {
    return clickMarker(queryClient, clickedData);
  };

  useEffect(() => {
    const dataIndex = data?.data?.findIndex((data) => data.isClicked === true);

    if (dataIndex !== undefined && dataIndex !== -1) {
      cardRefs.current[dataIndex]?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [data]);

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
      {data?.data?.map((data, index) => (
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
