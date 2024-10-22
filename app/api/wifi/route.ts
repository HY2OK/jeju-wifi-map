"use server";

import isLikedPost from "@/app/actions/isLikedPost";
import { auth } from "@/lib/auth";
import filterWifiData from "@/lib/filterWifiData";
import { prisma } from "@/lib/prisma";
import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const session = await auth();

  const queryParams = Object.fromEntries(searchParams.entries());

  try {
    if (session && searchParams.get("liked")) {
      return NextResponse.json(
        await handleLikedPosts(session.user?.id!, searchParams),
      );
    }

    const response = await fetchWifiData(queryParams);

    if (session) {
      return NextResponse.json(await isLikedPost(session.user?.id!, response));
    }

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 },
    );
  }
}

async function fetchWifiData(queryParams: Record<string, string>) {
  const response = await axios.get(
    `https://open.jejudatahub.net/api/proxy/Dtb18ta1btbD1Da1a81aaDttab6tDabb/${process.env.WIFI_KEY}`,
    {
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      params: queryParams,
    },
  );

  return response.data;
}

async function handleLikedPosts(userId: string, searchParams: URLSearchParams) {
  const currentPage = Number(searchParams.get("number")) || 1;
  const skip = (currentPage - 1) * 10;

  const [totCnt, likedPosts] = await Promise.all([
    prisma.likedPost.count({
      where: { userId },
    }),
    prisma.likedPost.findMany({
      where: { userId },
      include: { post: true },
      orderBy: { createdAt: "desc" },
      skip,
      take: 10,
    }),
  ]);

  const posts = likedPosts.map((post) => post.post);
  const filteredData = filterWifiData(posts, searchParams);
  const response = isLikedPost(userId, {
    totCnt,
    hasMore: likedPosts.length === 10,
    data: filteredData,
  });

  return response;
}
