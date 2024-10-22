"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import useWifiMutation from "@/hooks/useWifiMutation";
import { Card } from "@/components/ui/card";
import { Heart } from "lucide-react";
import { useSession } from "next-auth/react";
import { cn } from "@/lib/utils";
import { useLoadingStore } from "@/lib/loadingStore";

const LikedTab = () => {
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const router = useRouter();
  const isChecked = searchParams.get("liked") === "true";
  const mutation = useWifiMutation();
  const setLoading = useLoadingStore((state) => state.setLoading);

  const handleCheckboxChange = async () => {
    setLoading(true);
    const data: { liked?: string } = !isChecked ? { liked: "true" } : {};
    const params = new URLSearchParams(data);

    router.push(`/?${params.toString()}`);
    await mutation.mutateAsync(params);
    setLoading(false);
  };

  if (!session) return;

  return (
    <Card
      className="flex cursor-pointer items-center gap-2 px-4 py-2 opacity-80 hover:opacity-100"
      onClick={handleCheckboxChange}
    >
      <div className="flex h-[30px] w-[30px] flex-col items-center justify-center rounded-md bg-accent p-1">
        <Heart
          className={cn(
            "h-4 w-4 text-red-500",
            `${isChecked && "fill-red-500"}`,
          )}
        />
      </div>
      <label
        htmlFor="like"
        className="cursor-pointer text-sm font-medium leading-none"
      >
        내가 찜한 글만 보기
      </label>
    </Card>
  );
};

export default LikedTab;
