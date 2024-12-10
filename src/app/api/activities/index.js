import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { babyId, type, details } = req.body;

    if (!babyId || !type) {
      return res.status(400).json({ error: "ID del bebé y tipo de actividad requeridos" });
    }

    const activity = await prisma.activity.create({
      data: { babyId, type, details },
    });

    res.status(201).json(activity);
  } else {
    res.status(405).json({ message: "Método no permitido" });
  }
}
