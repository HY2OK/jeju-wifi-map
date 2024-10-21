"use client";

import { WifiDetail } from "@/types/type";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import { checkLikedStatus } from "../actions/checkLikedStatus";
import { likePost } from "../actions/likePost";
import { unlikePost } from "../actions/unlikePost";

const LikedButton = ({ data }: { data: WifiDetail }) => {
  const [isLiked, setIsLiked] = useState(false);
  const { data: session } = useSession();

  const handleLikePost = (event: React.MouseEvent<SVGSVGElement>) => {
    event.stopPropagation();
    if (session?.user?.id) likePost(session?.user?.id, data);
    setIsLiked(() => true);
  };

  const handleUnlikePost = (event: React.MouseEvent<SVGSVGElement>) => {
    event.stopPropagation();
    if (session?.user?.id) unlikePost(session?.user?.id, data);
    setIsLiked(() => false);
  };

  useEffect(() => {
    const checkLiked = async () => {
      if (session?.user?.id) {
        const post = await checkLikedStatus(
          session.user.id,
          data.macAddress,
          data.baseDate,
        );
        setIsLiked(() => (post ? true : false));
      }
    };

    checkLiked();
  }, [data.baseDate, data.macAddress, session]);

  if (!session) return null;

  return (
    <>
      {isLiked ? (
        <Heart
          className="w-5 fill-red-500 text-red-500"
          onClick={handleUnlikePost}
        />
      ) : (
        <Heart className="w-5 text-red-500" onClick={handleLikePost} />
      )}
    </>
  );
};

export default LikedButton;
