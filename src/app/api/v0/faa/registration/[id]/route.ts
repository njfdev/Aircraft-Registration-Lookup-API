import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  const prisma = new PrismaClient();

  let idUpper = id.toUpperCase();

  const findParams = idUpper.startsWith("N")
    ? {
        n_number: idUpper.slice(1),
      }
    : {
        mode_s_code_hex: idUpper,
      };

  const registration_result = await prisma.faaAircraftRegistration.findUnique({
    where: findParams,
    include: {
      aircraft_info: true,
      engine_info: true,
    },
  });

  if (!registration_result) {
    return Response.json({
      error: "not_found",
      message: `Could not find registration data for the specified ${
        idUpper.startsWith("N") ? "N-Number" : "Mode S Hex Code"
      }.`,
    });
  }

  return Response.json({ registration_result });
}
