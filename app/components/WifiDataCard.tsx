import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { truncateString } from "@/lib/truncateString";
import { WifiData } from "@/types/type";

const WifiDataCard = ({ data }: { data: WifiData }) => {
  return (
    <Card className="w-full bg-background">
      <CardHeader className="w-full">
        <div className="w-full overflow-hidden text-ellipsis whitespace-nowrap">
          {truncateString(data.apGroupName, 10)}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-xs">{data.addressDong}</div>
        <div className="text-xs">{data.addressDetail}</div>
      </CardContent>
      <CardFooter className="flex w-full">
        <div className="text-xs">등록일: {data.baseDate}</div>
        <div className="ml-auto rounded-md bg-primary px-2 py-1 text-xs text-white">
          {data.category}
        </div>
      </CardFooter>
    </Card>
  );
};

export default WifiDataCard;
