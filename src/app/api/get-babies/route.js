// src/app/api/get-babies/route.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const babies = await prisma.baby.findMany();
    return new Response(JSON.stringify(babies), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: 'Hubo un error al obtener los bebés' }),
      { status: 500 }
    );
  }
}
