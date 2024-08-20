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

  const engine_info = await prisma.faaEngineInfo.findUnique({
    where: {
      code: code.toUpperCase(),
    },
  });

  if (!engine_info) {
    return Response.json(
      {
        error: "not_found",
        message: "Could not find an engine for the specified model code.",
      },
      { status: 404 }
    );
  }

  return Response.json({ engine_info }, { status: 200 });
}
