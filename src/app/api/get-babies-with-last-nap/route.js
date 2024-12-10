// src/app/api/get-babies-with-last-nap/route.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    // Obtener todos los bebés junto con el último registro de siesta
    const babies = await prisma.baby.findMany({
      include: {
        activities: {
          where: { type: 'Siesta' },
          orderBy: { timestamp: 'desc' },
          take: 1,
        },
      },
    });

    return new Response(JSON.stringify(babies), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: 'Hubo un error al obtener los bebés' }),
      { status: 500 }
    );
  }
}
