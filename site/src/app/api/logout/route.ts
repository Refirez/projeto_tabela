import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ success: true });

  response.cookies.set("session_id", "", {
    path: "/",
    expires: new Date(0), // apaga cookie
  });

  return response;
}
