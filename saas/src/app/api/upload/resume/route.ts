import { NextResponse } from "next/server";
import { Buffer } from "node:buffer";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { parseResumeFile } from "@/lib/resume-parser";
import { enforceRateLimit } from "@/lib/rate-limit";

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const limit = await enforceRateLimit(`resume:${session.user.id}`);
  if (!limit.success) {
    return NextResponse.json(
      { error: "Too many uploads, please try again shortly." },
      { status: 429, headers: limit.reset ? { "x-ratelimit-reset": String(limit.reset) } : undefined }
    );
  }

  const formData = await request.formData();
  const file = formData.get("file");

  if (!file || !(file instanceof Blob)) {
    return NextResponse.json({ error: "File required" }, { status: 400 });
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const { data, confidence } = await parseResumeFile(
    buffer,
    file instanceof File ? file.name : "resume"
  );

  const upload = await prisma.resumeUpload.create({
    data: {
      userId: session.user.id,
      fileUrl: "local",
      parsedData: data,
      status: "PARSED"
    }
  });

  return NextResponse.json({
    uploadId: upload.id,
    data,
    confidence
  });
}


