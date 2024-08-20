"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Search } from "lucide-react";
import WifiDataList from "./WifiDataList";
import { ScrollArea } from "@/components/ui/scroll-area";
import { WifiData } from "@/types/type";
import getWifiData from "@/server/getWifiData";
import SearchFilter from "./SearchFilter";
import { useRouter, useSearchParams } from "next/navigation";

const SearchForm = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const params = useSearchParams();

  const mutation = useMutation<WifiData, unknown, Record<string, string>>({
    mutationFn: getWifiData,
    onSuccess: (result) => {
      queryClient.setQueryData(["wifi"], result);
    },
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const address = formData.get("address") as string;
    const category = formData.get("category") as string;

    const data: { addressDong?: string; category?: string } = {};

    if (address) data.addressDong = address;
    if (category && category !== "전체") data.category = category;

    const queryParams = new URLSearchParams(data).toString();

    router.push(`/?${queryParams}`);

    mutation.mutate(data);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-center gap-2 p-3"
      >
        <div className="flex w-full items-center justify-center gap-2">
          <Input
            type="text"
            name="address"
            placeholder="지역 검색"
            value={params.get("addressDong") || undefined}
            onChange={() => {}}
          />
          <Button className="h-9 w-9 p-2">
            <Search className="h-5 w-5" />
          </Button>
        </div>

        <SearchFilter />
      </form>
      <ScrollArea>
        <WifiDataList isLoading={mutation.isPending} />
      </ScrollArea>
    </>
  );
};

export default SearchForm;
