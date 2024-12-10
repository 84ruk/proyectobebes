import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, birthDate } = req.body;

    try {
      // Crear un nuevo bebé en la base de datos
      const newBaby = await prisma.baby.create({
        data: {
          name,
          birthDate: new Date(birthDate), // Asegúrate de convertir la fecha si es necesario
        },
      });

      res.status(200).json(newBaby);  // Devuelve el bebé creado con código 200
    } catch (error) {
      console.error(error);  // Log del error
      res.status(500).json({ error: 'Hubo un error al agregar el bebé' });  // Error 500
    }
  } else {
    res.status(405).json({ error: 'Método no permitido' });  // Si el método no es POST
  }
}
