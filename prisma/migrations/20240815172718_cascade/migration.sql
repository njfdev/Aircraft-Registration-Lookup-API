-- DropForeignKey
ALTER TABLE "FaaAircraftRegistration" DROP CONSTRAINT "FaaAircraftRegistration_eng_mfr_mdl_fkey";

-- DropForeignKey
ALTER TABLE "FaaAircraftRegistration" DROP CONSTRAINT "FaaAircraftRegistration_mft_mdl_code_fkey";

-- AddForeignKey
ALTER TABLE "FaaAircraftRegistration" ADD CONSTRAINT "FaaAircraftRegistration_mft_mdl_code_fkey" FOREIGN KEY ("mft_mdl_code") REFERENCES "FaaAircraftInfo"("code") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FaaAircraftRegistration" ADD CONSTRAINT "FaaAircraftRegistration_eng_mfr_mdl_fkey" FOREIGN KEY ("eng_mfr_mdl") REFERENCES "FaaEngineInfo"("code") ON DELETE CASCADE ON UPDATE CASCADE;
