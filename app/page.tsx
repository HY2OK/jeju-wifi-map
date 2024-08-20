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
    queryFn: () => getWifiData(searchParams!),
  });

  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <SideBar />
        <main className="relative h-full w-full flex-1 p-3">
          <div className="absolute right-6 top-6 z-10">
            <ModeToggle />
          </div>
          <div className="h-full w-full rounded-lg border shadow-sm">
            <KaKaoMap />
          </div>
        </main>
      </HydrationBoundary>
    </>
  );
}
