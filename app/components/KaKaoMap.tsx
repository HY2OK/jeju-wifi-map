"use client";

import getWifiData from "@/server/getWifiData";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  CustomOverlayMap,
  Map,
  MapMarker,
  ZoomControl,
} from "react-kakao-maps-sdk";
import WifiDetailCard from "./WifiDetailCard";
import { useEffect, useState } from "react";
import clickMarker from "@/lib/clickMarker";

const KaKaoMap = () => {
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ["wifi"],
    queryFn: () => getWifiData(),
  });

  const [center, setCenter] = useState({
    lat: 33.37713501099847,
    lng: 126.53946097047071,
  });
  const [zoom, setZoom] = useState(10);

  const cancelClicked = () => {
    const cancel = data?.data.map((data) => {
      if (data.isClicked) {
        return {
          ...data,
          isClicked: false,
        };
      }
      return data;
    });

    queryClient.setQueryData(["wifi"], { ...data, data: cancel });
  };

  useEffect(() => {
    const clickedData = data?.data?.find((data) => data.isClicked);
    if (clickedData) {
      const changedData = {
        lat: Number(clickedData.latitude),
        lng: Number(clickedData.longitude),
      };
      setCenter(() => changedData);
      setZoom(() => 6);
    }
  }, [data]);

  return (
    <Map
      center={center}
      level={zoom}
      className="h-full w-full rounded-lg"
      onZoomChanged={(map) => setZoom(map.getLevel())}
    >
      <ZoomControl position={"LEFT"} />
      {data?.data?.map((data, index) => (
        <div key={index} className="relative">
          <MapMarker
            position={{
              lat: Number(data.latitude),
              lng: Number(data.longitude),
            }}
            image={{
              src: "https://cdn-icons-png.flaticon.com/128/4852/4852997.png",
              size: {
                width: 35,
                height: 35,
              },
            }}
            title={data.apGroupName}
            onClick={() => clickMarker(queryClient, data)}
          />
          {data.isClicked && (
            <CustomOverlayMap
              position={{
                lat: Number(data.latitude),
                lng: Number(data.longitude),
              }}
              yAnchor={1}
              xAnchor={0.5}
            >
              <WifiDetailCard data={data} cancelClicked={cancelClicked} />
            </CustomOverlayMap>
          )}
        </div>
      ))}
    </Map>
  );
};

export default KaKaoMap;
