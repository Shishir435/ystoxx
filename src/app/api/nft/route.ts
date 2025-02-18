import { NextResponse } from "next/server";
import { prisma } from "../../../../prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const nftId = searchParams.get("nftId");

  if (!nftId) {
    return NextResponse.json(
      { success: false, error: "Missing nftId query parameter" },
      { status: 400 }
    );
  }

  try {
    const nft = await prisma.nFT.findUnique({
      where: { id: nftId },
    });

    if (!nft) {
      return NextResponse.json(
        { success: false, error: "NFT not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: nft }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Something went wrong" },
      { status: 500 }
    );
  }
}
