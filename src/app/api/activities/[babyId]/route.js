import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req, { params }) {
  const { babyId } = params;

  const activities = await prisma.activity.findMany({
    where: { babyId: parseInt(babyId) },
    orderBy: { timestamp: "desc" },
  });

  return new Response(JSON.stringify(activities), { status: 200 });
}
