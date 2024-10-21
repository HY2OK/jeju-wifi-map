"use server";

import { prisma } from "@/lib/prisma";

export const checkLikedStatus = async (
  userId: string,
  macAddress: string,
  baseDate: string,
) => {
  try {
    let existPost = await prisma.post.findUnique({
      where: {
        macAddress_baseDate: {
          macAddress: macAddress,
          baseDate: baseDate,
        },
      },
    });

    if (!existPost) return;

    const existLikedPost = await prisma.likedPost.findUnique({
      where: {
        userId_postId: {
          userId,
          postId: existPost.id,
        },
      },
    });

    if (!existLikedPost) return;

    return existLikedPost;
  } catch (error) {
    console.error("좋아요 상태 체크 중 오류 발생", error);
  }
};
