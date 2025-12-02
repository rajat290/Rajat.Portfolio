import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    { message: "PDF export is coming soon." },
    { status: 501 }
  );
}


