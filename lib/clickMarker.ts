"use client";

import { WifiData, WifiDetail } from "@/types/type";
import { QueryClient } from "@tanstack/react-query";

const clickMarker = (queryClient: QueryClient, clickedData: WifiDetail) => {
  queryClient.setQueryData(["wifi"], (oldData: WifiData) => {
    const newData = oldData.data.map((item) => {
      if (item.isClicked) return { ...item, isClicked: false };

      if (
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

export default clickMarker;
