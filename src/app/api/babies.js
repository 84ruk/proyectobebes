import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const VALID_ACTIVITY_TYPES = ["FEEDING", "DIAPER_CHANGE", "NAP"];

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { babyId, type, details } = req.body;

    if (!VALID_ACTIVITY_TYPES.includes(type)) {
      return res.status(400).json({ error: "Tipo de actividad no válido" });
    }

    const activity = await prisma.activity.create({
      data: {
        babyId,
        type,
        details,
      },
    });

    res.status(201).json(activity);
  } else {
    res.status(405).json({ message: "Método no permitido" });
  }
}
