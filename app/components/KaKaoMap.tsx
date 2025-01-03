"use client";

import { useQuery } from "@tanstack/react-query";
import {
  CustomOverlayMap,
  Map,
  MapMarker,
  Roadview,
} from "react-kakao-maps-sdk";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Card } from "@/components/ui/card";
import { truncateString } from "@/lib/truncateString";
import getWifiData from "../actions/getWifiData";
import useClickPost from "@/hooks/useClickPost";

const KaKaoMap = () => {
  const { clickPost } = useClickPost();
  const searchParams = useSearchParams();

  const { data, isLoading } = useQuery({
    queryKey: ["wifi"],
    queryFn: () => getWifiData(searchParams),
  });

  const [center, setCenter] = useState({
    lat: 33.37713501099847,
    lng: 126.53946097047071,
  });
  const [zoom, setZoom] = useState(10);

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
      {!isLoading &&
        data?.data?.map((data, index) => (
          <div key={index} className="relative transition-all">
            <MapMarker
              position={{
                lat: Number(data.latitude),
                lng: Number(data.longitude),
              }}
              image={{
                src: "https://cdn-icons-png.flaticon.com/128/4852/4852997.png",
                size: {
                  width: data.isClicked ? 40 : 30,
                  height: data.isClicked ? 40 : 30,
                },
              }}
              title={data.apGroupName}
              onClick={() => clickPost(data)}
            />
            {data.isClicked && (
              <>
                <Roadview
                  position={{
                    lat: Number(data.latitude),
                    lng: Number(data.longitude),
                    radius: 50,
                  }}
                  className="absolute bottom-0 right-0 z-10 hidden h-[300px] w-[250px] sm:block"
                />
                <CustomOverlayMap
                  position={{
                    lat: Number(data.latitude),
                    lng: Number(data.longitude),
                  }}
                  yAnchor={2}
                  xAnchor={0.5}
                >
                  <Card className="flex border-2 border-primary p-2">
                    {truncateString(data.apGroupName, 20)}
                  </Card>
                </CustomOverlayMap>
              </>
            )}
          </div>
        ))}
    </Map>
  );
};

export default KaKaoMap;
