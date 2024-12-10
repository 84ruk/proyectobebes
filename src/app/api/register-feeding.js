import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { babyId, description } = req.body;

    try {
      const feeding = await prisma.activity.create({
        data: {
          type: 'Alimentación',
          description,
          babyId: parseInt(babyId),
        },
      });
      res.status(200).json(feeding);
    } catch (error) {
      res.status(500).json({ error: 'Hubo un error al registrar la alimentación' });
    }
  } else {
    res.status(405).json({ error: 'Método no permitido' });
  }
}
