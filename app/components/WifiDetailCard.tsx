"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { WifiData } from "@/types/type";
import { X } from "lucide-react";
import React from "react";

const WifiDetailCard = ({
  data,
  cancelClicked,
}: {
  data: WifiData;
  cancelClicked: () => void;
}) => {
  return (
    <div className="relative top-[-40px]">
      <Card className="w-full border-2 border-primary bg-card">
        <X
          className="absolute right-2 top-2 h-5 w-5 cursor-pointer text-primary"
          onClick={() => cancelClicked()}
        />
        <CardHeader className="w-full font-bold">{data.apGroupName}</CardHeader>
        <CardContent className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <div>위도: {data.latitude}</div>
            <div>경도: {data.longitude}</div>
            <div>등록일: {data.baseDate}</div>
            <div className="ml-auto rounded-md bg-primary px-2 py-1 text-xs text-accent">
              {data.category}
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <div className="h-[6px] w-[6px] rounded-full bg-primary" />
            주소 : {data.addressDong}
          </div>
          <div className="flex items-center gap-2 text-sm">
            <div className="h-[6px] w-[6px] rounded-full bg-primary" />
            상세 주소 : {data.addressDetail}
          </div>

          <div className="flex items-center gap-2 text-sm">
            <div className="h-[6px] w-[6px] rounded-full bg-primary" />
            상세 카테고리 : {data.categoryDetail}
          </div>
        </CardContent>
        <CardFooter className="flex w-full items-center justify-center">
          {data.installLocationDetail}
        </CardFooter>
      </Card>
      <div className="absolute bottom-[-10px] left-1/2 h-0 w-0 -translate-x-1/2 transform border-l-[10px] border-r-[10px] border-t-[10px] border-l-transparent border-r-transparent border-t-primary" />
    </div>
  );
};

export default WifiDetailCard;
