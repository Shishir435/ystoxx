import { prisma } from "@/../../prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body.userId)
      return NextResponse.json(
        { success: false, error: "please send the valid userId" },
        { status: 401 }
      );

    const user = await prisma.user.upsert({
      where: { clerkId: body.userId },
      create: { clerkId: body.userId },
      update: {},
    });
    return NextResponse.json({
      success: true,
      message: "user info",
      data: user,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Something wen wrong" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json("hello", { status: 200 });
}
