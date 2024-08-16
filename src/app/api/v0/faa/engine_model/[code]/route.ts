import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params: { code } }: { params: { code: string } }
) {
  const prisma = new PrismaClient();

  const engine_info = await prisma.faaEngineInfo.findUnique({
    where: {
      code,
    },
  });

  if (!engine_info) {
    return Response.json({
      error: "not_found",
      message: "Could not find an engine for the specified model code.",
    });
  }

  return Response.json({ engine_info });
}
