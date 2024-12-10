// src/app/api/register-feeding/route.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req) {
  const { babyId, foodDetails } = await req.json();  // Recibimos el ID del bebé y los detalles de la alimentación

  try {
    // Crear el nuevo registro de alimentación
    const newFeeding = await prisma.activity.create({
      data: {
        type: 'Alimentación',
        details: foodDetails,
        babyId: babyId,
      },
    });

    return new Response(
      JSON.stringify({ message: 'Alimentación registrada correctamente', newFeeding }),
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: 'Hubo un error al registrar la alimentación' }),
      { status: 500 }
    );
  }
}
