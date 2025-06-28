import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { generateSlug } from "@/app/util/generateSlug";

export async function POST(req: NextRequest) {
  const { userId } = auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();

  const { longUrl } = body;

  const decodedUrl = decodeURIComponent(longUrl);

  if (!decodedUrl || !decodedUrl.startsWith("http")) {
    return NextResponse.json({ error: "Invalid URL" }, { status: 400 });
  }

  let slug = generateSlug();
  let existing = await prisma.shortLink.findUnique({ where: { slug } });

  while (existing) {
    slug = generateSlug();
    existing = await prisma.shortLink.findUnique({ where: { slug } });
  }

  await prisma.shortLink.create({
    data: {
      originalUrl: decodedUrl, 
      slug,
      user: { connect: { clerkId: userId } },
    },
  });

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  return NextResponse.json({ shortUrl: `${baseUrl}/${slug}` });
}
