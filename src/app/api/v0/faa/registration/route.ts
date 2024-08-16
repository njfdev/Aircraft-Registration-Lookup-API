import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const prisma = new PrismaClient();

  // if no specified id, then get a random registration
  const count = await prisma.faaAircraftRegistration.count();
  const randomIndex = Math.floor(Math.random() * count);

  const registration = (
    await prisma.faaAircraftRegistration.findMany({
      take: 1,
      skip: randomIndex,
    })
  )[0];

  return Response.json({ registration });
}
