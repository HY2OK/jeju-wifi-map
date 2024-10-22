"use client";

import { WifiData, WifiDetail } from "@/types/type";
import { useQueryClient } from "@tanstack/react-query";

const useClickPost = () => {
  const queryClient = useQueryClient();

  const clickPost = (clickedData: WifiDetail) => {
    queryClient.setQueryData(["wifi"], (oldData: WifiData | undefined) => {
      if (!oldData) return oldData;

      const newData = oldData.data.map((item) => {
        if (item.isClicked) return { ...item, isClicked: false };

        if (
          item.baseDate === clickedData.baseDate &&
          item.macAddress === clickedData.macAddress &&
          item.apGroupName === clickedData.apGroupName
        ) {
          return { ...item, isClicked: true };
        }

        return item;
      });

      return {
        ...oldData,
        data: newData,
      };
    });
  };

  return { clickPost };
};

export default useClickPost;
