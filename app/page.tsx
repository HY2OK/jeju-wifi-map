import { ModeToggle } from "@/components/ModeToggle";
import SideBar from "./components/SideBar";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import getWifiData from "@/server/getWifiData";

export default async function Home() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["wifi"],
    queryFn: getWifiData,
  });

  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <SideBar />
        <main className="relative h-full w-full flex-1 p-3">
          <div className="absolute right-6 top-6">
            <ModeToggle />
          </div>
          <div className="h-full w-full rounded-lg border bg-card text-card-foreground shadow-sm"></div>
        </main>
      </HydrationBoundary>
    </>
  );
}
