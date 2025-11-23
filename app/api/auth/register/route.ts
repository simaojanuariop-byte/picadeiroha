import { hash } from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();

    if (!name || !email || !password) {
      return Response.json(
        { message: "Campos obrigatórios ausentes" },
        { status: 400 }
      );
    }

    // Verificar se o utilizador já existe
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return Response.json(
        { message: "Este email já está registado" },
        { status: 400 }
      );
    }

    // Hash da senha
    const hashedPassword = await hash(password, 10);

    // Criar utilizador
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: "user",
      },
    });

    return Response.json(
      { 
        message: "Conta criada com sucesso",
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        }
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erro ao registar:", error);
    return Response.json(
      { message: "Erro ao criar conta" },
      { status: 500 }
    );
  }
}
