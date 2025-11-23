import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "src/data/users.json");

export async function GET(req: Request) {
  const cookies = (req as any).cookies ?? req.headers.get("cookie") ?? "";
  const session = cookies.match(/session_id=(\d+)/);

  if (!session) {
    return NextResponse.json({ loggedIn: false });
  }

  const userId = Number(session[1]);

  const data = await fs.readFile(filePath, "utf8");
  const users = JSON.parse(data);

  const user = users.find((u: any) => u.id === userId);

  if (!user) {
    return NextResponse.json({ loggedIn: false });
  }

  return NextResponse.json({ loggedIn: true, user });
}
