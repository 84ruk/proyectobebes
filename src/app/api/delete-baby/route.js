// src/app/api/delete-baby/route.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function DELETE(req) {
  const { babyId } = await req.json();

  try {
    // Eliminar el bebé por su ID
    const deletedBaby = await prisma.baby.delete({
      where: { id: babyId },
    });

    return new Response(
      JSON.stringify({ message: 'Bebé eliminado correctamente', deletedBaby }),
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: 'Hubo un error al eliminar el bebé' }),
      { status: 500 }
    );
  }
}
