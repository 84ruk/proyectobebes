// src/app/api/register-nap/route.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req) {
  const { babyId, napDetails } = await req.json();

  try {
    // Crear el registro de siesta
    const newNapEntry = await prisma.activity.create({
      data: {
        type: 'Siesta',
        details: napDetails,
        babyId: babyId,
      },
    });

    return new Response(
      JSON.stringify({ message: 'Siesta registrada correctamente', newNapEntry }),
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: 'Hubo un error al registrar la siesta' }),
      { status: 500 }
    );
  }
}
