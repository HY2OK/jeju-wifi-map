import { ModeToggle } from "@/components/ModeToggle";
import SideBar from "./components/SideBar";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import getWifiData from "@/server/getWifiData";
import KaKaoMap from "./components/KaKaoMap";

export default async function Home({
  searchParams,
}: {
  searchParams?: Record<string, string>;
}) {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["wifi"],
    queryFn: () => getWifiData(searchParams),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="relative flex h-full w-full flex-col-reverse items-center gap-3 px-3 py-3 sm:flex-row">
        <div className="h-[500px] w-full bg-background sm:h-full sm:w-[300px]">
          <SideBar />
        </div>
        <main className="w-full flex-1 sm:h-full">
          <div className="absolute right-6 top-6 z-10">
            <ModeToggle />
          </div>
          <div className="h-full w-full rounded-lg border shadow-sm">
            <KaKaoMap />
          </div>
        </main>
      </div>
    </HydrationBoundary>
  );
}
