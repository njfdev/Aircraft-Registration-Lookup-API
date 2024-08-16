import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const prisma = new PrismaClient();

  // if no specified id, then get a random engine model
  const count = await prisma.faaEngineInfo.count();
  const randomIndex = Math.floor(Math.random() * count);

  const engine_info = (
    await prisma.faaEngineInfo.findMany({
      take: 1,
      skip: randomIndex,
    })
  )[0];

  return Response.json({ engine_info });
}
