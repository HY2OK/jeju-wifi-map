"use server";

import { prisma } from "@/lib/prisma";
import { WifiDetail } from "@/types/type";

export const likePost = async (userId: string, postData: WifiDetail) => {
  try {
    const existPost = await prisma.post.upsert({
      where: {
        macAddress_baseDate: {
          macAddress: postData.macAddress,
          baseDate: postData.baseDate,
        },
      },
      create: {
        macAddress: postData.macAddress,
        baseDate: postData.baseDate,
        apGroupName: postData.apGroupName,
        installLocationDetail: postData.installLocationDetail,
        category: postData.category,
        categoryDetail: postData.categoryDetail,
        addressDong: postData.addressDong,
        addressDetail: postData.addressDetail,
        latitude: postData.latitude,
        longitude: postData.longitude,
      },
      update: {},
    });

    const existLikedPost = await prisma.likedPost.findUnique({
      where: {
        userId_postId: {
          userId,
          postId: existPost.id,
        },
      },
    });

    if (existLikedPost) throw new Error("이미 이 포스트를 좋아요 했습니다.");

    const likedPost = await prisma.likedPost.create({
      data: {
        userId,
        baseDate: postData.baseDate,
        macAddress: postData.macAddress,
        postId: existPost.id,
      },
    });

    console.log("포스트가 찜되었습니다:", likedPost);
    return likedPost;
  } catch (error) {
    console.error("포스트 찜 중 오류 발생:", error);
  }
};
