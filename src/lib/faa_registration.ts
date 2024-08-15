import {
  FaaAircraftRegistration,
  FaaAircraftType,
  FaaEngineType,
  FaaRegistrantRegion,
  FaaRegistrantType,
  PrismaClient,
} from "@prisma/client";
import { AircraftRegistrationRawInfo } from "./types";
import parse8CharDate from "./utils";

export async function saveFaaRegistrationData(
  registration_data: AircraftRegistrationRawInfo[]
) {
  const prisma = new PrismaClient();

  await prisma.$disconnect();
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
    kit_model: raw_registration[" KIT MODEL"].trim() || null,
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
