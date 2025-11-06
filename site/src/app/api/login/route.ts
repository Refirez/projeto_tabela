import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { promises as fs } from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "src/data/users.json");

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    const data = await fs.readFile(filePath, "utf8");
    const users = JSON.parse(data);

    const user = users.find((u: any) => u.email === email);
    if (!user) {
      return NextResponse.json({ error: "Usuário não encontrado" }, { status: 404 });
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return NextResponse.json({ error: "Senha incorreta" }, { status: 401 });
    }

    const response = NextResponse.json({ success: true, user });

    // Salva ID do usuário em cookie HttpOnly
    response.cookies.set("session_id", String(user.id), {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 dias
    });

    return response;
  } catch (error) {
    return NextResponse.json({ error: "Erro no servidor" }, { status: 500 });
  }
}
