"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import WifiDataCard from "./WifiDataCard";
import LoadingSkeleton from "./LoadingSkeleton";
import { WifiDetail } from "@/types/type";
import clickMarker from "@/lib/clickMarker";
import { useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import getWifiData from "../actions/getWifiData";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

const WifiDataList = ({ submitPending }: { submitPending: boolean }) => {
  const queryClient = useQueryClient();
  const cardRefs = useRef<HTMLDivElement[]>([]);
  const searchParams = useSearchParams();
  const router = useRouter();

  const {
    data,
    isLoading: loading,
    error,
  } = useQuery({
    queryKey: ["wifi"],
    queryFn: () => getWifiData(searchParams),
  });

  const handleClick = (clickedData: WifiDetail) => {
    return clickMarker(queryClient, clickedData);
  };

  useEffect(() => {
    const dataIndex = data?.data?.findIndex((data) => data.isClicked === true);

    if (dataIndex && dataIndex !== -1) {
      cardRefs.current[dataIndex]?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [data]);

  if (submitPending || loading) {
    return (
      <div className="flex w-full flex-col gap-3 px-3 sm:w-[300px]">
        <LoadingSkeleton />
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

  if (error) {
    return (
      <Card className="mx-3 mb-3 flex h-full flex-col items-center justify-center gap-5 p-3">
        <div className="text-center text-sm">오류가 발생했습니다.</div>
        <Button onClick={() => router.refresh()}>새로고침</Button>
      </Card>
    );
  }

  return (
    <ScrollArea className="flex-1">
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
    </ScrollArea>
  );
};

export default WifiDataList;
