import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";

export const revalidate = 0;

export async function GET(req: NextRequest) {
  const prisma = new PrismaClient();

  // if no specified id, then get a random aircraft model
  const count = await prisma.faaAircraftInfo.count();
  const randomIndex = Math.floor(Math.random() * count);

  const aircraft_info = (
    await prisma.faaAircraftInfo.findMany({
      take: 1,
      skip: randomIndex,
    })
  )[0];

  return Response.json({ aircraft_info });
}
