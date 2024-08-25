"use client";

import getWifiData from "@/server/getWifiData";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import WifiDataCard from "./WifiDataCard";
import LoadingSkeleton from "./LoadingSkeleton";
import { WifiDetail } from "@/types/type";
import clickMarker from "@/lib/clickMarker";
import { useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import changeSearchParams from "@/lib/changeSearchParams";

const WifiDataList = ({ submitPending }: { submitPending: boolean }) => {
  const queryClient = useQueryClient();
  const cardRefs = useRef<HTMLDivElement[]>([]);
  const searchParams = useSearchParams();

  const { data, isLoading: loading } = useQuery({
    queryKey: ["wifi"],
    queryFn: () => getWifiData(changeSearchParams(searchParams)),
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

  if (submitPending || loading) {
    return (
      <div className="flex w-full flex-col gap-3 px-3 sm:w-[300px]">
        {[1, 2, 3].map((e) => (
          <LoadingSkeleton key={e} />
        ))}
      </div>
    );
  }

  if (data?.data.length === 0) {
    return (
      <div className="mt-5 flex w-full items-center justify-center text-sm">
        해당 하는 결과가 없습니다.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 px-3">
      {data?.data?.map((data, index) => (
        <WifiDataCard
          data={data}
          key={index}
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
