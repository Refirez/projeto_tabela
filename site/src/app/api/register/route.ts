import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { promises as fs } from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "src/data/users.json");

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json({ error: "Dados inválidos" }, { status: 400 });
    }

    const data = await fs.readFile(filePath, "utf8");
    const users = JSON.parse(data);

    const exists = users.find((u: any) => u.email === email);
    if (exists) {
      return NextResponse.json({ error: "Usuário já cadastrado" }, { status: 400 });
    }

    const hashed = await bcrypt.hash(password, 10);

    const newUser = {
      id: Date.now(),
      name,
      email,
      password: hashed,
    };

    users.push(newUser);

    await fs.writeFile(filePath, JSON.stringify(users, null, 2));

    return NextResponse.json({ success: true, user: newUser });
  } catch (error) {
    return NextResponse.json({ error: "Erro no servidor" }, { status: 500 });
  }
}
