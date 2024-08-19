import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { truncateString } from "@/lib/truncateString";
import { cn } from "@/lib/utils";
import { WifiData } from "@/types/type";

const WifiDataCard = ({
  data,
  handleClick,
}: {
  data: WifiData;
  handleClick: (data: WifiData) => void;
}) => {
  return (
    <Card
      className={cn(
        `w-full cursor-pointer bg-card`,
        data.isClicked && "border-2 border-primary",
      )}
      onClick={() => handleClick(data)}
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
};

export default WifiDataCard;
