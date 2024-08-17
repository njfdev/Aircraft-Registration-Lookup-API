import {
  FaaAircraftCategoryCode,
  FaaAircraftInfo,
  FaaAircraftRegistration,
  FaaAircraftType,
  FaaAircraftWeightClass,
  FaaBuilderCertificationCode,
  FaaEngineInfo,
  FaaEngineType,
  FaaRegistrantRegion,
  FaaRegistrantType,
  PrismaClient,
} from "@prisma/client";
import {
  AircraftRawInfo,
  AircraftRegistrationRawInfo,
  EngineRawInfo,
} from "./types";
import parse8CharDate from "./utils";

export async function clearFaaData(prisma: PrismaClient) {
  let deleteResult = await prisma.faaAircraftRegistration.deleteMany();
  console.log(
    `Prisma Delete FAA Registration Result: ${JSON.stringify(deleteResult)}`
  );
  deleteResult = await prisma.faaAircraftInfo.deleteMany();

  console.log(
    `Prisma Delete FAA Aircraft Info Result: ${JSON.stringify(deleteResult)}`
  );
  deleteResult = await prisma.faaEngineInfo.deleteMany();

  console.log(
    `Prisma Delete FAA Engine Info Result: ${JSON.stringify(deleteResult)}`
  );
}

export async function saveFaaRegistrationData(
  prisma: PrismaClient,
  registration_data: FaaAircraftRegistration[]
) {
  const createResult = await prisma.faaAircraftRegistration.createMany({
    data: registration_data,
    // ignore any conflicts
    skipDuplicates: true,
  });

  console.log(
    `Prisma Create Many FAA Aircraft Info Result: ${JSON.stringify(
      createResult
    )}`
  );
}

export async function saveFaaAircraftData(
  prisma: PrismaClient,
  aircraft_data: FaaAircraftInfo[]
) {
  const createResult = await prisma.faaAircraftInfo.createMany({
    data: aircraft_data,
  });

  console.log(
    `Prisma Create Many FAA Aircraft Info Result: ${JSON.stringify(
      createResult
    )}`
  );
}

export async function saveFaaEngineData(
  prisma: PrismaClient,
  engine_data: FaaEngineInfo[]
) {
  const createResult = await prisma.faaEngineInfo.createMany({
    data: engine_data,
  });

  console.log(
    `Prisma Create Many FAA Engine Info Result: ${JSON.stringify(createResult)}`
  );
}

export function parseRawFaaAircraft(
  raw_aircraft: AircraftRawInfo
): FaaAircraftInfo {
  return {
    code: raw_aircraft["CODE"].trim(),
    mfr: raw_aircraft["MFR"].trim(),
    model: raw_aircraft["MODEL"].trim(),
    aircraft_type: mapAircraftType(raw_aircraft["TYPE-ACFT"]),
    engine_type: mapEngineType(raw_aircraft["TYPE-ENG"]),
    aircraft_cat_code: mapAircraftCategoryCode(raw_aircraft["AC-CAT"])!,
    builder_cert_code: mapBuilderCertificationCode(
      raw_aircraft["BUILD-CERT-IND"]
    )!,
    engine_count: Number(raw_aircraft["NO-ENG"].trim()),
    seat_count: Number(raw_aircraft["NO-SEATS"].trim()),
    weight_class: mapAircraftWeightClass(raw_aircraft["AC-WEIGHT"])!,
    avg_cruising_speed: Number(raw_aircraft["SPEED"].trim()) || null,
    tc_data_sheet: raw_aircraft["TC-DATA-SHEET"].trim() || null,
    tc_data_holder: raw_aircraft["TC-DATA-HOLDER"].trim() || null,
  };
}

export function parseRawFaaEngine(raw_engine: EngineRawInfo): FaaEngineInfo {
  return {
    code: raw_engine["CODE"].trim(),
    mfr: raw_engine["MFR"].trim(),
    model: raw_engine["MODEL"].trim(),
    type: mapEngineType(raw_engine["TYPE"]),
    horsepower: Number(raw_engine["HORSEPOWER"].trim()) || null,
    lbs_of_thrust: Number(raw_engine["THRUST"].trim()) || null,
  };
}

export function parseRawFaaRegistration(
  raw_registration: AircraftRegistrationRawInfo
): FaaAircraftRegistration {
  return {
    n_number: raw_registration["N-NUMBER"].trim(),
    serial_number: raw_registration["SERIAL NUMBER"].trim(),
    mft_mdl_code: raw_registration["MFR MDL CODE"].trim(),
    eng_mfr_mdl: raw_registration["ENG MFR MDL"].trim() || null,
    year_mfr: Number(raw_registration["YEAR MFR"].trim()) || null,
    registrant_type: mapRegistrantType(
      raw_registration["TYPE REGISTRANT"].trim()
    ),
    registrant_name: raw_registration["NAME"].trim() || null,
    registrant_street: raw_registration["STREET"].trim() || null,
    registrant_street2: raw_registration["STREET2"].trim() || null,
    registrant_city: raw_registration["CITY"].trim() || null,
    registrant_state: raw_registration["STATE"].trim() || null,
    registrant_zip_code: raw_registration["ZIP CODE"].trim() || null,
    registrant_region: mapRegistrantRegion(raw_registration["REGION"].trim()),
    registrant_county_code: Number(raw_registration["COUNTY"].trim()) || null,
    registrant_country_code: raw_registration["COUNTRY"].trim() || null,
    last_action_date: parse8CharDate(
      raw_registration["LAST ACTION DATE"].trim()
    )!,
    cert_issue_date: parse8CharDate(raw_registration["CERT ISSUE DATE"].trim()),
    // do not trim because the location of each char is very important
    cert_details: raw_registration["CERTIFICATION"],
    aircraft_type: mapAircraftType(raw_registration["TYPE AIRCRAFT"].trim()),
    engine_type: mapEngineType(raw_registration["TYPE ENGINE"].trim()),
    status_code: raw_registration["STATUS CODE"].trim(),
    mode_s_code: Number(raw_registration["MODE S CODE"].trim())!,
    fractional_ownership: raw_registration["FRACT OWNER"] ? true : false,
    air_worth_date: parse8CharDate(raw_registration["AIR WORTH DATE"].trim()),
    other_registrant_name_1: raw_registration["OTHER NAMES(1)"].trim() || null,
    other_registrant_name_2: raw_registration["OTHER NAMES(2)"].trim() || null,
    other_registrant_name_3: raw_registration["OTHER NAMES(3)"].trim() || null,
    other_registrant_name_4: raw_registration["OTHER NAMES(4)"].trim() || null,
    other_registrant_name_5: raw_registration["OTHER NAMES(5)"].trim() || null,
    expiration_date: parse8CharDate(
      raw_registration["EXPIRATION DATE"].trim()
    )!,
    unique_id: Number(raw_registration["UNIQUE ID"].trim())!,
    kit_mfr: raw_registration["KIT MFR"].trim() || null,
    kit_model: raw_registration["KIT MODEL"].trim() || null,
    mode_s_code_hex: raw_registration["MODE S CODE HEX"].trim(),
  };
}

function mapRegistrantType(value: string): FaaRegistrantType | null {
  switch (value) {
    case "1":
      return FaaRegistrantType.INDIVIDUAL;
    case "2":
      return FaaRegistrantType.PARTNERSHIP;
    case "3":
      return FaaRegistrantType.CORPORATATION;
    case "4":
      return FaaRegistrantType.CO_OWNED;
    case "5":
      return FaaRegistrantType.GOVERNMENT;
    case "7":
      return FaaRegistrantType.LLC;
    case "8":
      return FaaRegistrantType.NON_CITIZEN_CORPORATION;
    case "9":
      return FaaRegistrantType.NON_CITIZEN_CO_OWNED;
    default:
      return null;
  }
}

function mapRegistrantRegion(value: string): FaaRegistrantRegion | null {
  switch (value) {
    case "1":
      return FaaRegistrantRegion.EASTERN;
    case "2":
      return FaaRegistrantRegion.SOUTHWESTERN;
    case "3":
      return FaaRegistrantRegion.CENTRAL;
    case "4":
      return FaaRegistrantRegion.WESTERN_PACIFIC;
    case "5":
      return FaaRegistrantRegion.ALASKAN;
    case "7":
      return FaaRegistrantRegion.SOUTHERN;
    case "8":
      return FaaRegistrantRegion.EUROPEAN;
    case "C":
      return FaaRegistrantRegion.GREAT_LAKES;
    case "E":
      return FaaRegistrantRegion.NEW_ENGLAND;
    case "S":
      return FaaRegistrantRegion.NORTHWEST_MOUNTAIN;
    default:
      return null;
  }
}

function mapAircraftType(value: string): FaaAircraftType {
  switch (value) {
    case "1":
      return FaaAircraftType.GLIDER;
    case "2":
      return FaaAircraftType.BALLOON;
    case "3":
      return FaaAircraftType.BLIMP;
    case "4":
      return FaaAircraftType.FIXED_WING_SINGLE_ENGINE;
    case "5":
      return FaaAircraftType.FIXED_WING_MULTI_ENGINE;
    case "6":
      return FaaAircraftType.ROTORCRAFT;
    case "7":
      return FaaAircraftType.WEIGHT_SHIFT_CONTROL;
    case "8":
      return FaaAircraftType.POWERED_PARACHUTE;
    case "9":
      return FaaAircraftType.GYROPLANE;
    case "H":
      return FaaAircraftType.HYBRID_LIFT;
    case "O":
      return FaaAircraftType.OTHER;
    default:
      return FaaAircraftType.OTHER;
  }
}

function mapEngineType(value: string): FaaEngineType {
  switch (value) {
    case "0":
      return FaaEngineType.NONE;
    case "1":
      return FaaEngineType.RECIPROCATING;
    case "2":
      return FaaEngineType.TURBO_PROP;
    case "3":
      return FaaEngineType.TURBO_SHAFT;
    case "4":
      return FaaEngineType.TURBO_JET;
    case "5":
      return FaaEngineType.TURBO_FAN;
    case "6":
      return FaaEngineType.RAMJET;
    case "7":
      return FaaEngineType.TWO_CYCLE;
    case "8":
      return FaaEngineType.FOUR_CYCLE;
    case "9":
      return FaaEngineType.UNKNOWN;
    case "10":
      return FaaEngineType.ELECTRIC;
    case "11":
      return FaaEngineType.ROTARY;
    default:
      return FaaEngineType.UNKNOWN;
  }
}

function mapAircraftCategoryCode(
  value: string
): FaaAircraftCategoryCode | null {
  switch (value) {
    case "1":
      return FaaAircraftCategoryCode.LAND;
    case "2":
      return FaaAircraftCategoryCode.SEA;
    case "3":
      return FaaAircraftCategoryCode.AMPHIBIAN;
    default:
      return null;
  }
}

function mapBuilderCertificationCode(
  value: string
): FaaBuilderCertificationCode | null {
  switch (value) {
    case "0":
      return FaaBuilderCertificationCode.TYPE_CERTIFIED;
    case "1":
      return FaaBuilderCertificationCode.NOT_TYPE_CERTIFIED;
    case "2":
      return FaaBuilderCertificationCode.LIGHT_SPORT;
    default:
      return null;
  }
}

function mapAircraftWeightClass(value: string): FaaAircraftWeightClass | null {
  switch (value) {
    case "CLASS 1":
      return FaaAircraftWeightClass.CLASS_1;
    case "CLASS 2":
      return FaaAircraftWeightClass.CLASS_2;
    case "CLASS 3":
      return FaaAircraftWeightClass.CLASS_3;
    case "CLASS 4":
      return FaaAircraftWeightClass.CLASS_4;
    default:
      return null;
  }
}
