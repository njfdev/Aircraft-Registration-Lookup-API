/*
  Warnings:

  - The values [CORPORTATION] on the enum `FaaRegistrantType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "FaaRegistrantType_new" AS ENUM ('INDIVIDUAL', 'PARTNERSHIP', 'CORPORATATION', 'CO_OWNED', 'GOVERNMENT', 'LLC', 'NON_CITIZEN_CORPORATION', 'NON_CITIZEN_CO_OWNED');
ALTER TABLE "FaaAircraftRegistration" ALTER COLUMN "registrant_type" TYPE "FaaRegistrantType_new" USING ("registrant_type"::text::"FaaRegistrantType_new");
ALTER TYPE "FaaRegistrantType" RENAME TO "FaaRegistrantType_old";
ALTER TYPE "FaaRegistrantType_new" RENAME TO "FaaRegistrantType";
DROP TYPE "FaaRegistrantType_old";
COMMIT;
