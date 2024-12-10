// src/app/api/get-babies-feeding/route.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const babies = await prisma.baby.findMany({
      include: {
        activities: {
          where: { type: 'Alimentación' },  // Solo obtenemos los registros de alimentación
          orderBy: { timestamp: 'desc' },  // Ordenamos por fecha (descendente)
          take: 1,  // Solo obtenemos el último registro de alimentación
        },
      },
    });

    return new Response(JSON.stringify(babies), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: 'Hubo un error al obtener los bebés y registros de alimentación' }),
      { status: 500 }
    );
  }
}
