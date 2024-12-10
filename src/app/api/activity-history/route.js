import prisma from "@/lib/prisma"; // Asegúrate de que este archivo exista

// Obtener el historial de actividades de un bebé específico
export async function GET(request) {
  try {
    // Obtener el ID del bebé desde los parámetros de la consulta
    const url = new URL(request.url);
    const babyId = url.searchParams.get('babyId');
    
    if (!babyId) {
      return new Response(JSON.stringify({ error: "babyId es necesario" }), { status: 400 });
    }

    // Obtener las actividades del bebé desde la base de datos
    const activities = await prisma.activity.findMany({
      where: {
        babyId: parseInt(babyId), // Asegúrate de que babyId sea un número
      },
      include: {
        baby: true, // Incluye los detalles del bebé si es necesario
      },
      orderBy: {
        timestamp: 'desc', // Ordena las actividades por fecha de manera descendente
      },
    });

    // Devuelve el historial de actividades en formato JSON
    return new Response(JSON.stringify(activities), { status: 200 });
  } catch (error) {
    console.error("Error al obtener el historial de actividades:", error);
    return new Response(JSON.stringify({ error: "Error al obtener el historial de actividades" }), { status: 500 });
  }
}
