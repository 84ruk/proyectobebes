// src/app/api/register-diaper-change/route.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req) {
  const { babyId, diaperDetails } = await req.json();

  try {
    // Crear el registro de cambio de pañal
    const newDiaperChangeEntry = await prisma.activity.create({
      data: {
        type: 'Cambio de pañal',
        details: diaperDetails,
        babyId: babyId,
      },
    });

    return new Response(
      JSON.stringify({ message: 'Cambio de pañal registrado correctamente', newDiaperChangeEntry }),
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: 'Hubo un error al registrar el cambio de pañal' }),
      { status: 500 }
    );
  }
}
