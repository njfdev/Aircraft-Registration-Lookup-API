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
    include: {
      aircraft_info: true,
      engine_info: true,
    },
  });

  if (!registration_result) {
    return Response.json({
      error: "not_found",
      message: "Could not find registration data for the specified N-Number.",
    });
  }

  return Response.json({ registration_result });
}
