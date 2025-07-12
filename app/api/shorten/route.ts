import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { nanoid } from "nanoid";
import { getAuth } from "@clerk/nextjs/server";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { userId: clerkUserId } = getAuth(req);

  if (!clerkUserId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const existingUser = await prisma.user.findUnique({
    where: { clerkId: clerkUserId },
  });

  if (!existingUser) {
    return NextResponse.json(
      { error: "User not found in database" },
      { status: 404 }
    );
  }

  const body = await req.json();
  const { longUrl } = body;

  if (!longUrl || !longUrl.startsWith("http")) {
    return NextResponse.json({ error: "Invalid URL" }, { status: 400 });
  }

  const shortCode = nanoid(6);

  try {
    const shortLink = await prisma.shortLink.create({
      data: {
        originalUrl: longUrl,
        shortCode,
        userId: existingUser.id,
      },
    });

    console.log(shortLink);

    const shortUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/${shortCode}`;
    return NextResponse.json({ shortUrl, shortCode }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
