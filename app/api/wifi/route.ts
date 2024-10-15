"use server";

import { auth } from "@/lib/auth";
import filterWifiData from "@/lib/filterWifiData";
import { prisma } from "@/lib/prisma";
import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const session = await auth();

  const queryParams: Record<string, string> = {};

  searchParams.forEach((value, key) => {
    queryParams[key] = value;
  });

  try {
    if (searchParams.get("liked")) {
      const likedPosts = await prisma.likedPost.findMany({
        where: {
          userId: session?.user?.id,
        },
        include: {
          post: true,
        },
      });

      const posts = likedPosts.map((post) => post.post);
      const data = filterWifiData(posts, searchParams);

      return NextResponse.json({
        totCnt: posts.length,
        hasMore: true,
        data,
      });
    }

    const response = await axios.get(
      `https://open.jejudatahub.net/api/proxy/Dtb18ta1btbD1Da1a81aaDttab6tDabb/${process.env.WIFI_KEY}`,
      {
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        params: queryParams,
      },
    );

    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 },
    );
  }
}
