import { testData } from "@/server/db";
import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const queryParams: Record<string, string> = {};

  searchParams.forEach((value, key) => {
    queryParams[key] = value;
  });

  try {
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

    // return NextResponse.json(testData);
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 },
    );
  }
}
