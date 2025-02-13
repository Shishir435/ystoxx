import { NextResponse } from "next/server";
import { prisma } from "../../../../prisma";

export async function POST(req: Request) {
  const body = await req.json();
  console.log(body);
  const user = await prisma.user.create({
    data: {
      clerkId: body.userId,
    },
  });
  return NextResponse.json({ status: "ok", user });
}

export async function GET() {
  return NextResponse.json("hello", { status: 200 });
}
