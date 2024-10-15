"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import WifiDataList from "./WifiDataList";
import { ScrollArea } from "@/components/ui/scroll-area";
import SearchFilter from "./SearchFilter";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import PaginationBar from "./PaginationBar";
import useWifiMutation from "@/hooks/useWifiMutation";

const SearchForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [address, setAddress] = useState(searchParams.get("addressDong") || "");
  const [category, setCategory] = useState(searchParams?.get("category") || "");
  const [number, setNumber] = useState(Number(searchParams.get("number")) || 1);

  const mutation = useWifiMutation();

  const getFilteredData = (pageNumber?: number) => {
    const data: { addressDong?: string; category?: string; number?: string } =
      {};

    if (address !== "") data.addressDong = address;
    if (category !== "" && category !== "전체") data.category = category;
    data.number = pageNumber ? `${pageNumber}` : `${number}`;

    const params = new URLSearchParams(data);
    router.push(`/?${params.toString()}`);

    mutation.mutate(params);
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
