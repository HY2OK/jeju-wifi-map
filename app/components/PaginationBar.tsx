"use client";

import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
} from "@/components/ui/pagination";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import getPageNumbers from "@/lib/getPageNumbers";
import getWifiData from "@/server/getWifiData";
import { useQuery } from "@tanstack/react-query";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useRef } from "react";

interface PaginationBarProps {
  number: number;
  setNumber: React.Dispatch<React.SetStateAction<number>>;
  getFilteredData: (page: number) => void;
}

const PaginationBar = ({
  number,
  setNumber,
  getFilteredData,
}: PaginationBarProps) => {
  const searchParams = useSearchParams();
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const { data } = useQuery({
    queryKey: ["wifi"],
    queryFn: () => getWifiData(searchParams),
  });

  const totalPages = Math.ceil(data?.totCnt! / 10);
  const pageNumbers = getPageNumbers(totalPages, number);

  const handlePageClick = (page: number) => {
    setNumber(() => page);
    getFilteredData(page);
  };

  useEffect(() => {
    const currentButton = buttonRefs.current[number];
    if (currentButton) {
      currentButton.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [number]);

  const PageButton = ({
    page,
    children,
  }: {
    page: number;
    children: React.ReactNode;
  }) => {
    return (
      <Button
        variant={number === page ? "outline" : "ghost"}
        size={"sm"}
        ref={(el) => {
          buttonRefs.current[page] = el;
        }}
        className="hover:bg-background hover:text-accent-foreground"
        onClick={() => handlePageClick(page)}
      >
        {children}
      </Button>
    );
  };

  return (
    <>
      {data?.data.length !== 0 && (
        <Pagination>
          <PaginationContent className="flex w-full items-center justify-center">
            {!isNaN(totalPages) && (
              <>
                <PaginationItem>
                  <PageButton page={number - 1}>
                    <ChevronLeft className="h-4 w-4" />
                  </PageButton>
                </PaginationItem>

                <ScrollArea>
                  <div className="flex flex-1 gap-1 px-1 py-3">
                    {pageNumbers.map((page, index) => (
                      <PaginationItem key={index}>
                        {page === "..." ? (
                          <PaginationEllipsis />
                        ) : (
                          <PageButton page={Number(page)}>{page}</PageButton>
                        )}
                      </PaginationItem>
                    ))}
                    <ScrollBar orientation="horizontal" />
                  </div>
                </ScrollArea>

                <PaginationItem>
                  <PageButton page={number + 1}>
                    <ChevronRight className="h-4 w-4" />
                  </PageButton>
                </PaginationItem>
              </>
            )}
          </PaginationContent>
        </Pagination>
      )}
    </>
  );
};

export default PaginationBar;
