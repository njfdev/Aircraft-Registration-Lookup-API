/*
  Warnings:

  - Made the column `type` on table `FaaEngineInfo` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "FaaEngineInfo" ALTER COLUMN "type" SET NOT NULL;
