import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";

export const revalidate = 0;

// increase max run duration to 30 seconds
export const maxDuration = 30;

export async function GET(req: NextRequest) {
  const prisma = new PrismaClient();

  // if no specified id, then get a random aircraft model
  const count = Number(
    (
      (await prisma.$queryRaw`SELECT count(*) from "FaaAircraftInfo";`) as any
    )[0].count
  );
  const randomIndex = Math.floor(Math.random() * count);

  const aircraft_info = (
    await prisma.faaAircraftInfo.findMany({
      take: 1,
      skip: randomIndex,
    })
  )[0];

  return Response.json({ aircraft_info }, { status: 200 });
}
