import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";

// revalidate every hour
export const revalidate = 60 * 60;

// increase max run duration to 30 seconds
export const maxDuration = 30;

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
    return Response.json(
      {
        error: "not_found",
        message: "Could not find an aircraft for the specified model code.",
      },
      { status: 404 }
    );
  }

  return Response.json({ aircraft_info }, { status: 200 });
}
