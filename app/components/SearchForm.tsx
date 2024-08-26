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
import { useState } from "react";
import PaginationBar from "./PaginationBar";

const SearchForm = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const params = useSearchParams();
  const [address, setAddress] = useState(params.get("addressDong") || "");
  const [category, setCategory] = useState(params?.get("category") || "");
  const [number, setNumber] = useState(Number(params.get("number")) || 1);

  const mutation = useMutation<WifiData, unknown, URLSearchParams>({
    mutationFn: getWifiData,
    onSuccess: (result) => {
      queryClient.setQueryData(["wifi"], result);
    },
  });

  const getFilteredData = (pageNumber?: number) => {
    const data: { addressDong?: string; category?: string; number?: string } =
      {};

    if (address !== "") data.addressDong = address;
    if (category !== "" && category !== "전체") data.category = category;
    data.number = pageNumber ? `${pageNumber}` : `${number}`;

    const queryParams = new URLSearchParams(data);
    router.push(`/?${queryParams.toString()}`);

    mutation.mutate(queryParams);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    getFilteredData();
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
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <Button className="h-9 w-9 p-2">
            <Search className="h-5 w-5" />
          </Button>
        </div>

        <SearchFilter category={category} setCategory={setCategory} />
      </form>
      <ScrollArea>
        <WifiDataList submitPending={mutation.isPending} />
      </ScrollArea>
      <PaginationBar
        number={number}
        setNumber={setNumber}
        getFilteredData={getFilteredData}
      />
    </>
  );
};

export default SearchForm;
