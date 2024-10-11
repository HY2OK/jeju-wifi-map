"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { truncateString } from "@/lib/truncateString";
import { cn } from "@/lib/utils";
import { WifiDetail } from "@/types/type";
import { forwardRef } from "react";
import LikedButton from "./LikedButton";

interface WifiDataCardProps {
  data: WifiDetail;
  handleClick: (data: WifiDetail) => void;
}

const WifiDataCard = forwardRef<HTMLDivElement, WifiDataCardProps>(
  ({ data, handleClick }, ref) => {
    return (
      <Card
        ref={ref}
        className={cn(
          `w-full cursor-pointer bg-card transition-all duration-500 ease-in-out`,
          data.isClicked && "border-2 border-primary",
        )}
        onClick={() => handleClick(data)}
      >
        <CardHeader className="w-full font-bold">
          <div className="flex justify-between">
            <span>{truncateString(data.apGroupName, 10)}</span>
            <LikedButton data={data} />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-xs">{data.addressDong}</div>
          <div className="text-xs">{data.addressDetail}</div>
          {data.isClicked && (
            <div className="mt-2 w-full text-center">
              {data.installLocationDetail}
            </div>
          )}
        </CardContent>
        <CardFooter className="flex w-full flex-col">
          <div className="flex w-full items-center">
            <div className="flex-1 text-xs text-muted-foreground">
              등록일: {data.baseDate}
            </div>
            <div className="ml-auto min-w-max rounded-md bg-primary px-2 py-1 text-xs text-accent">
              {data.category}
            </div>
          </div>
          {data.isClicked && (
            <div className="flex items-center gap-2 pt-2 text-xs text-muted-foreground">
              <div>위도: {data.latitude}</div>
              <div>경도: {data.longitude}</div>
            </div>
          )}
        </CardFooter>
      </Card>
    );
  },
);

WifiDataCard.displayName = "WifiDataCard";

export default WifiDataCard;
