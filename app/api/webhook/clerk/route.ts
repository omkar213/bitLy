import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { Webhook } from "svix";
import prisma from "@/lib/prisma";

const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET || "";

export async function POST(req: Request) {
  const payload = await req.text();
  const headerPayload = await headers();

  const svix_id = headerPayload.get("svix-id") as string;
  const svix_timestamp = headerPayload.get("svix-timestamp") as string;
  const svix_signature = headerPayload.get("svix-signature") as string;

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new NextResponse("Missing Svix headers", { status: 400 });
  }

  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: any;
  try {
    evt = wh.verify(payload, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    });
  } catch (error) {
    console.error("Webhook verification failed:", error);
    return new NextResponse("Invalid signature", { status: 400 });
  }

  const eventType = evt.type;
  const data = evt.data;

  let clerkId: string;
  let email: string;
  let name: string;
  let imageUrl: string;

  if (eventType === "user.created") {
    clerkId = data.id;
    email = data.email_addresses?.[0]?.email_address || null;
    name =
      data.first_name && `${data.first_name} ${data.last_name ?? ""}`.trim();
    imageUrl = data.image_url || null;

    try {
      await prisma.user.upsert({
        where: { clerkId },
        update: {},
        create: { clerkId, email, name, imageUrl },
      });
    } catch (err) {
      console.error("Error saving user to DB:", err);
      return new NextResponse("Database error", { status: 500 });
    }
  }

  return NextResponse.json({ success: true });
}
