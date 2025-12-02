import { NextResponse } from "next/server";

export function GET() {
  return NextResponse.json({
    status: "OK",
    message: "Portfolio SaaS API is running",
    timestamp: new Date().toISOString()
  });
}


