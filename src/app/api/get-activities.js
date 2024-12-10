import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const activities = await prisma.activity.findMany({
        include: {
          baby: true,
        },
      });
      res.status(200).json(activities);
    } catch (error) {
      res.status(500).json({ error: 'Hubo un error al obtener el historial de actividades' });
    }
  } else {
    res.status(405).json({ error: 'Método no permitido' });
  }
}
