import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { truncateString } from "@/lib/truncateString";
import { cn } from "@/lib/utils";
import { WifiData } from "@/types/type";
import { forwardRef } from "react";

interface WifiDataCardProps {
  data: WifiData;
  index: number;
  handleClick: (data: WifiData, index: number) => void;
}

const WifiDataCard = forwardRef<HTMLDivElement, WifiDataCardProps>(
  ({ data, index, handleClick }, ref) => {
    return (
      <Card
        ref={ref}
        className={cn(
          `w-full cursor-pointer bg-card`,
          data.isClicked && "border-2 border-primary",
        )}
        onClick={() => handleClick(data, index)}
      >
        <CardHeader className="w-full font-bold">
          <div className="w-full overflow-hidden text-ellipsis whitespace-nowrap">
            {truncateString(data.apGroupName, 10)}
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-xs">{data.addressDong}</div>
          <div className="text-xs">{data.addressDetail}</div>
        </CardContent>
        <CardFooter className="flex w-full">
          <div className="text-xs text-muted-foreground">
            등록일: {data.baseDate}
          </div>
          <div className="ml-auto rounded-md bg-primary px-2 py-1 text-xs text-accent">
            {data.category}
          </div>
        </CardFooter>
      </Card>
    );
  },
);

WifiDataCard.displayName = "WifiDataCard";

export default WifiDataCard;
