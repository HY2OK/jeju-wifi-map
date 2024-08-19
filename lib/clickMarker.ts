"use client";

import { WifiData } from "@/types/type";
import { QueryClient } from "@tanstack/react-query";

const clickMarker = (queryClient: QueryClient, clickedData: WifiData) => {
  queryClient.setQueryData(["wifi"], (oldData: WifiData[]) => {
    return oldData.map((item) => {
      if (item.isClicked) return { ...item, isClicked: false };

      if (
        item.macAddress === clickedData.macAddress &&
        item.apGroupName === clickedData.apGroupName
      ) {
        return { ...item, isClicked: true };
      }

      return item;
    });
  });
};

export default clickMarker;
