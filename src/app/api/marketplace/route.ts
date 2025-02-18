import { NextResponse } from "next/server";
import { prisma } from "../../../../prisma";

export async function GET() {
  try {
    const nfts = await prisma.nFT.findMany({
      where: {
        currentlySelling: true,
      },
    });
    return NextResponse.json({ success: true, data: nfts }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message || "Something went wrong",
    });
  }
}
