"use server";

import { prisma } from "@/lib/prisma";
import { WifiDetail } from "@/types/type";

export const unlikePost = async (userId: string, postData: WifiDetail) => {
  try {
    let existPost = await prisma.post.findUnique({
      where: {
        macAddress_baseDate: {
          macAddress: postData.macAddress,
          baseDate: postData.baseDate,
        },
      },
    });

    if (!existPost) throw new Error("해당하는 포스트가 없습니다.");

    const deletedLikedPost = await prisma.likedPost.delete({
      where: {
        userId_postId: {
          userId: userId,
          postId: existPost.id,
        },
      },
    });

    console.log("좋아요가 삭제되었습니다:", deletedLikedPost);
    return deletedLikedPost;
  } catch (error) {
    console.error("좋아요 삭제 중 오류 발생:", error);
  }
};
