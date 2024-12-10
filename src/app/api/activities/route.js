import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const VALID_ACTIVITY_TYPES = ["FEEDING", "DIAPER_CHANGE", "NAP"];

export async function POST(req) {
  const { babyId, type, details } = await req.json();

  if (!VALID_ACTIVITY_TYPES.includes(type)) {
    return new Response(JSON.stringify({ error: "Tipo de actividad no válido" }), { status: 400 });
  }

  const activity = await prisma.activity.create({
    data: { babyId, type, details },
  });

  return new Response(JSON.stringify(activity), { status: 201 });
}
