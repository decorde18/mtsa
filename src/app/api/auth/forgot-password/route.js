import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { sendPasswordResetEmail } from "@/lib/email";
import crypto from "crypto";

export async function POST(request) {
  const body = await request.json();
  const { email } = body;

  if (!email) {
    return NextResponse.json({ error: "Email is required." }, { status: 400 });
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return NextResponse.json({ success: true });
  }

  const resetToken = crypto.randomUUID();
  const expiresAt = new Date(Date.now() + 3600 * 1000);

  await prisma.user.update({
    where: { email },
    data: {
      resetToken,
      resetTokenExpiresAt: expiresAt,
    },
  });

  await sendPasswordResetEmail(email, resetToken);

  return NextResponse.json({ success: true });
}
