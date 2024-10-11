import { ModeToggle } from "@/components/ModeToggle";
import SideBar from "./components/SideBar";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import KaKaoMap from "./components/KaKaoMap";
import getWifiData from "./actions/getWifiData";
import { SessionProvider } from "next-auth/react";

export default async function Home({
  searchParams,
}: {
  searchParams: URLSearchParams;
}) {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["wifi"],
    queryFn: () => getWifiData(searchParams),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <SessionProvider>
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
      </SessionProvider>
    </HydrationBoundary>
  );
}
