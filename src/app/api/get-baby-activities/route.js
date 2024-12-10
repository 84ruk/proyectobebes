// src/app/api/get-baby-activities/route.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req) {
  const { babyId } = req.url.searchParams;

  try {
    // Obtener todas las actividades del bebé
    const activities = await prisma.activity.findMany({
      where: { babyId: parseInt(babyId) },
      orderBy: { timestamp: 'desc' },
      include: {
        baby: true,  // Incluir los datos del bebé
      },
    });

    // Devolver las actividades junto con el nombre del bebé
    return new Response(JSON.stringify(activities), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: 'Hubo un error al obtener el historial de actividades' }),
      { status: 500 }
    );
  }
}
