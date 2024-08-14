-- CreateEnum
CREATE TYPE "FaaRegistrantType" AS ENUM ('INDIVIDUAL', 'PARTNERSHIP', 'CORPORTATION', 'CO_OWNED', 'GOVERNMENT', 'LLC', 'NON_CITIZEN_CORPORATION', 'NON_CITIZEN_CO_OWNED');

-- CreateEnum
CREATE TYPE "FaaRegistrantRegion" AS ENUM ('EASTERN', 'SOUTHWESTERN', 'CENTRAL', 'WESTERN_PACIFIC', 'ALASKAN', 'SOUTHERN', 'EUROPEAN', 'GREAT_LAKES', 'NEW_ENGLAND', 'NORTHWEST_MOUNTAIN');

-- CreateEnum
CREATE TYPE "FaaAircraftType" AS ENUM ('GLIDER', 'BALLOON', 'BLIMP', 'FIXED_WING_SINGLE_ENGINE', 'FIXED_WING_MULTI_ENGINE', 'ROTORCRAFT', 'WEIGHT_SHIFT_CONTROL', 'POWERED_PARACHUTE', 'GYROPLANE', 'HYBRID_LIFT', 'OTHER');

-- CreateEnum
CREATE TYPE "FaaEngineType" AS ENUM ('NONE', 'RECIPROCATING', 'TURBO_PROP', 'TURBO_SHAFT', 'TURBO_JET', 'TURBO_FAN', 'RAMJET', 'TWO_CYCLE', 'FOUR_CYCLE', 'UNKNOWN', 'ELECTRIC', 'ROTARY');

-- CreateEnum
CREATE TYPE "FaaAircraftCategoryCode" AS ENUM ('LAND', 'SEA', 'AMPHIBIAN');

-- CreateEnum
CREATE TYPE "FaaBuilderCertificationCode" AS ENUM ('TYPE_CERTIFIED', 'NOT_TYPE_CERTIFIED', 'LIGHT_SPORT');

-- CreateEnum
CREATE TYPE "FaaAircraftWeightClass" AS ENUM ('CLASS_1', 'CLASS_2', 'CLASS_3', 'CLASS_4');

-- CreateTable
CREATE TABLE "FaaAircraftRegistration" (
    "n_number" TEXT NOT NULL,
    "serial_number" TEXT NOT NULL,
    "mft_mdl_code" TEXT NOT NULL,
    "eng_mfr_mdl" TEXT,
    "year_mfr" INTEGER,
    "registrant_type" "FaaRegistrantType",
    "registrant_name" TEXT,
    "registrant_street" TEXT,
    "registrant_street2" TEXT,
    "registrant_city" TEXT,
    "registrant_state" TEXT,
    "registrant_zip_code" TEXT,
    "registrant_region" "FaaRegistrantRegion",
    "registrant_county_code" INTEGER,
    "registrant_country_code" TEXT,
    "last_action_date" DATE NOT NULL,
    "cert_issue_date" DATE NOT NULL,
    "cert_details" TEXT NOT NULL,
    "aircraft_type" "FaaAircraftType" NOT NULL,
    "engine_type" "FaaEngineType" NOT NULL,
    "status_code" TEXT NOT NULL,
    "mode_s_code" INTEGER NOT NULL,
    "fractional_ownership" BOOLEAN NOT NULL,
    "air_worth_date" DATE,
    "other_registrant_name_1" TEXT,
    "other_registrant_name_2" TEXT,
    "other_registrant_name_3" TEXT,
    "other_registrant_name_4" TEXT,
    "other_registrant_name_5" TEXT,
    "expiration_date" DATE NOT NULL,
    "unique_id" INTEGER NOT NULL,
    "kit_mfr" TEXT,
    "kit_model" TEXT,
    "mode_s_code_hex" TEXT NOT NULL,

    CONSTRAINT "FaaAircraftRegistration_pkey" PRIMARY KEY ("unique_id")
);

-- CreateTable
CREATE TABLE "FaaAircraftInfo" (
    "code" TEXT NOT NULL,
    "mfr" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "aircraft_type" "FaaAircraftType" NOT NULL,
    "engine_type" "FaaEngineType" NOT NULL,
    "aircraft_cat_code" "FaaAircraftCategoryCode" NOT NULL,
    "builder_cert_code" "FaaBuilderCertificationCode" NOT NULL,
    "engine_count" INTEGER NOT NULL,
    "seat_count" INTEGER NOT NULL,
    "weight_class" "FaaAircraftWeightClass" NOT NULL,
    "avg_cruising_speed" INTEGER,
    "tc_data_sheet" TEXT,
    "tc_data_holder" TEXT,

    CONSTRAINT "FaaAircraftInfo_pkey" PRIMARY KEY ("code")
);

-- CreateTable
CREATE TABLE "FaaEngineInfo" (
    "code" TEXT NOT NULL,
    "mfr" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "type" "FaaEngineType",
    "horsepower" INTEGER,
    "lbs_of_thrust" INTEGER,

    CONSTRAINT "FaaEngineInfo_pkey" PRIMARY KEY ("code")
);

-- CreateIndex
CREATE UNIQUE INDEX "FaaAircraftRegistration_n_number_key" ON "FaaAircraftRegistration"("n_number");

-- CreateIndex
CREATE UNIQUE INDEX "FaaAircraftRegistration_serial_number_key" ON "FaaAircraftRegistration"("serial_number");

-- CreateIndex
CREATE UNIQUE INDEX "FaaAircraftRegistration_mode_s_code_key" ON "FaaAircraftRegistration"("mode_s_code");

-- CreateIndex
CREATE UNIQUE INDEX "FaaAircraftRegistration_mode_s_code_hex_key" ON "FaaAircraftRegistration"("mode_s_code_hex");

-- CreateIndex
CREATE UNIQUE INDEX "FaaAircraftInfo_model_key" ON "FaaAircraftInfo"("model");

-- CreateIndex
CREATE UNIQUE INDEX "FaaEngineInfo_model_key" ON "FaaEngineInfo"("model");

-- AddForeignKey
ALTER TABLE "FaaAircraftRegistration" ADD CONSTRAINT "FaaAircraftRegistration_mft_mdl_code_fkey" FOREIGN KEY ("mft_mdl_code") REFERENCES "FaaAircraftInfo"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FaaAircraftRegistration" ADD CONSTRAINT "FaaAircraftRegistration_eng_mfr_mdl_fkey" FOREIGN KEY ("eng_mfr_mdl") REFERENCES "FaaEngineInfo"("code") ON DELETE SET NULL ON UPDATE CASCADE;
