import { WifiData } from "@/types/type";
import { prisma } from "./prisma";

const isLikedPost = async (userId: string, data: WifiData) => {
  const likedPosts = await prisma.likedPost.findMany({
    where: {
      userId: userId,
      OR: data.data.map((post) => ({
        macAddress: post.macAddress,
        baseDate: post.baseDate,
      })),
    },
    select: {
      macAddress: true,
      baseDate: true,
    },
  });

  const updatedData = data.data.map((post) => {
    const isLiked = likedPosts.some(
      (likedPost) =>
        likedPost.macAddress === post.macAddress &&
        likedPost.baseDate === post.baseDate,
    );

    return {
      ...post,
      isLiked: isLiked,
    };
  });

  return {
    ...data,
    data: updatedData,
  };
};

export default isLikedPost;
