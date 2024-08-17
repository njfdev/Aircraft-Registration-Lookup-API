import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params: { code } }: { params: { code: string } }
) {
  const prisma = new PrismaClient();

  const aircraft_info = await prisma.faaAircraftInfo.findUnique({
    where: {
      code: code.toUpperCase(),
    },
  });

  if (!aircraft_info) {
    return Response.json({
      error: "not_found",
      message: "Could not find an aircraft for the specified model code.",
    });
  }

  return Response.json({ aircraft_info });
}
