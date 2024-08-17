const MAX_FREE_REQUESTS_PER_MINUTE = 512;

export { MAX_FREE_REQUESTS_PER_MINUTE };

export interface AircraftRegistrationRawInfo {
  "N-NUMBER": string;
  "SERIAL NUMBER": string;
  "MFR MDL CODE": string;
  "ENG MFR MDL": string;
  "YEAR MFR": string;
  "TYPE REGISTRANT": string;
  NAME: string;
  STREET: string;
  STREET2: string;
  CITY: string;
  STATE: string;
  "ZIP CODE": string;
  REGION: string;
  COUNTY: string;
  COUNTRY: string;
  "LAST ACTION DATE": string;
  "CERT ISSUE DATE": string;
  CERTIFICATION: string;
  "TYPE AIRCRAFT": string;
  "TYPE ENGINE": string;
  "STATUS CODE": string;
  "MODE S CODE": string;
  "FRACT OWNER": string;
  "AIR WORTH DATE": string;
  "OTHER NAMES(1)": string;
  "OTHER NAMES(2)": string;
  "OTHER NAMES(3)": string;
  "OTHER NAMES(4)": string;
  "OTHER NAMES(5)": string;
  "EXPIRATION DATE": string;
  "UNIQUE ID": string;
  "KIT MFR": string;
  "KIT MODEL": string;
  "MODE S CODE HEX": string;
}

export interface AircraftRawInfo {
  CODE: string;
  MFR: string;
  MODEL: string;
  "TYPE-ACFT": string;
  "TYPE-ENG": string;
  "AC-CAT": string;
  "BUILD-CERT-IND": string;
  "NO-ENG": string;
  "NO-SEATS": string;
  "AC-WEIGHT": string;
  SPEED: string;
  "TC-DATA-SHEET": string;
  "TC-DATA-HOLDER": string;
}

export interface EngineRawInfo {
  CODE: string;
  MFR: string;
  MODEL: string;
  TYPE: string;
  HORSEPOWER: string;
  THRUST: string;
}
