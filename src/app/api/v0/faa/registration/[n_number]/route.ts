import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params: { n_number } }: { params: { n_number: string } }
) {
  const prisma = new PrismaClient();

  const registration_result = await prisma.faaAircraftRegistration.findUnique({
    where: {
      n_number,
    },
  });

  return Response.json({ registration_result });
}
