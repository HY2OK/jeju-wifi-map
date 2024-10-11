"use server";

import { prisma } from "@/lib/prisma";
import { WifiDetail } from "@/types/type";

export const likePost = async (userId: string, postData: WifiDetail) => {
  try {
    // Post 존재 여부 확인 및 없을 경우 생성
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
      update: {}, // 이미 존재하면 업데이트는 하지 않음
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

    // 새로운 찜 추가
    const likedPost = await prisma.likedPost.create({
      data: {
        userId,
        baseDate: postData.baseDate,
        macAddress: postData.macAddress,
        postId: existPost.id, // 연결된 포스트 ID
      },
    });

    console.log("포스트가 찜되었습니다:", likedPost);
    return likedPost;
  } catch (error) {
    console.error("포스트 찜 중 오류 발생:", error);
  }
};
