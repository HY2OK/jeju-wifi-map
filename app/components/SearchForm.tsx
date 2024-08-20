"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Search } from "lucide-react";
import WifiDataList from "./WifiDataList";
import { ScrollArea } from "@/components/ui/scroll-area";
import { WifiData } from "@/types/type";
import getWifiData from "@/server/getWifiData";

const SearchForm = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<WifiData, unknown, { addressDong: string }>({
    mutationFn: getWifiData,
    onSuccess: (result) => {
      queryClient.setQueryData(["wifi"], result);
    },
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const address = formData.get("address") as string;
    if (address !== "") mutation.mutate({ addressDong: address });
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex items-center justify-center gap-2 p-3"
      >
        <Input type="text" name="address" placeholder="지역 검색" />
        <Button className="h-10 w-10 p-2">
          <Search className="h-5 w-5" />
        </Button>
      </form>
      <ScrollArea>
        <WifiDataList isLoading={mutation.isPending} />
      </ScrollArea>
    </>
  );
};

export default SearchForm;
