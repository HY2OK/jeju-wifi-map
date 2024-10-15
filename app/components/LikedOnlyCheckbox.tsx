"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import useWifiMutation from "@/hooks/useWifiMutation";

const LikedOnlyCheckbox = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isChecked, setIsChecked] = useState<boolean | "indeterminate">(
    searchParams.get("liked") ? true : false,
  );

  const mutation = useWifiMutation();

  const handleCheckboxChange = (checked: boolean | "indeterminate") => {
    setIsChecked(checked);
    const data: { liked?: string } = checked ? { liked: "true" } : {};
    const params = new URLSearchParams(data);

    router.push(`/?${params.toString()}`);

    mutation.mutate(params);
  };

  return (
    <div className="flex items-center justify-end space-x-2">
      <Checkbox
        id="like"
        onCheckedChange={handleCheckboxChange}
        checked={isChecked}
      />
      <label
        htmlFor="like"
        className="cursor-pointer text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        내가 찜한 글만 보기
      </label>
    </div>
  );
};

export default LikedOnlyCheckbox;
