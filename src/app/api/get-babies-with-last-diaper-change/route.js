// src/app/api/get-babies-with-last-diaper-change/route.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    // Obtener todos los bebés junto con el último registro de cambio de pañal
    const babies = await prisma.baby.findMany({
      include: {
        activities: {
          where: { type: 'Cambio de pañal' },
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
