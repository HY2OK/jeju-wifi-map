"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CATEGORY } from "@/constant/constant";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

const SearchFilter = () => {
  const searchParams = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(
    searchParams?.get("category") || undefined,
  );

  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger className="px-3 text-sm">
          추가 검색 옵션
        </AccordionTrigger>
        <AccordionContent>
          <div className="flex w-full flex-col gap-3 p-2">
            <Select
              name="category"
              value={selectedCategory}
              onValueChange={(value) => setSelectedCategory(value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="카테고리 검색" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {CATEGORY.map((item, index) => (
                    <SelectItem key={index} value={item}>
                      {item}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <Button size={"sm"} type="submit">
              필터 적용
            </Button>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default SearchFilter;
