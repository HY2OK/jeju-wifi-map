"use client";

import { WifiData, WifiDetail } from "@/types/type";
import { useSession } from "next-auth/react";
import React from "react";
import { Heart } from "lucide-react";
import { likePost } from "../actions/likePost";
import { unlikePost } from "../actions/unlikePost";
import { useQueryClient } from "@tanstack/react-query";

const LikedButton = ({ data }: { data: WifiDetail }) => {
  const queryClient = useQueryClient();
  const { data: session } = useSession();

  const handleLikeToggle = async (event: React.MouseEvent<SVGSVGElement>) => {
    event.stopPropagation();
    if (!session?.user?.id) return;

    const isCurrentlyLiked = data.isLiked;

    if (isCurrentlyLiked) {
      await unlikePost(session.user.id, data);
    } else {
      await likePost(session.user.id, data);
    }

    queryClient.setQueryData(["wifi"], (oldData: WifiData | undefined) => {
      if (!oldData) return oldData;

      return {
        ...oldData,
        data: oldData.data.map((post: WifiDetail) =>
          post.macAddress === data.macAddress && post.baseDate === data.baseDate
            ? { ...post, isLiked: !isCurrentlyLiked }
            : post,
        ),
      };
    });
  };

  if (!session) return null;

  return (
    <>
      <Heart
        className={`w-5 ${data.isLiked ? "fill-red-500 text-red-500" : "text-red-500"}`}
        onClick={handleLikeToggle}
        style={{ cursor: "pointer" }}
      />
    </>
  );
};

export default LikedButton;
