// src/app/api/add-baby/route.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req) {
  const { name, birthDate } = await req.json();

  try {
    // Crear un nuevo bebé en la base de datos
    const newBaby = await prisma.baby.create({
      data: {
        name,
        birthDate: new Date(birthDate), // Convierte la fecha si es necesario
      },
    });

    return new Response(JSON.stringify(newBaby), {
      status: 200,
    });
  } catch (error) {
    console.error(error);  // Log del error
    return new Response(
      JSON.stringify({ error: 'Hubo un error al agregar el bebé' }),
      { status: 500 }
    );
  }
}
