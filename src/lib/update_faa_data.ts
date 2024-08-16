import type { NextRequest } from "next/server";
import AdmZip from "adm-zip";
import { Stream } from "stream";
import csvParser from "csv-parser";
//import faa_sample_data, { aircraftInfo, engineInfo } from "../sample_faa_data";
import { AircraftRegistrationRawInfo } from "@/lib/types";
import {
  parseRawFaaAircraft,
  parseRawFaaEngine,
  parseRawFaaRegistration,
  saveFaaAircraftData,
  saveFaaEngineData,
  saveFaaRegistrationData,
} from "@/lib/faa_registration";
import {
  FaaAircraftInfo,
  FaaAircraftRegistration,
  FaaEngineInfo,
} from "@prisma/client";
import { pipeline } from "stream/promises";
import { AnyMxRecord } from "dns";

export async function update_faa_data() {
  // download faa aircraft registration csv files
  const zip_download_res = await fetch(
    "https://registry.faa.gov/database/ReleasableAircraft.zip"
  );
  if (!zip_download_res.ok) {
    throw "Failed to download Registration Data from FAA";
  }

  const zip_object = new AdmZip(
    Buffer.from(await zip_download_res.arrayBuffer())
  );

  const aircraft_csv_buffer = getFileFromFaaZip(zip_object, "ACFTREF.txt");
  await processCsvData(
    aircraft_csv_buffer,
    parseRawFaaAircraft,
    saveFaaAircraftData
  );
  console.log("Finished processing Aircraft Reference data");

  const engine_csv_buffer = getFileFromFaaZip(zip_object, "ENGINE.txt");
  await processCsvData(engine_csv_buffer, parseRawFaaEngine, saveFaaEngineData);
  console.log("Finished processing Engine Reference data");

  const registration_csv_buffer = getFileFromFaaZip(zip_object, "MASTER.txt");
  await processCsvData(
    registration_csv_buffer,
    parseRawFaaRegistration,
    saveFaaRegistrationData
  );
  console.log("Finished processing Aircraft Registration data");

  return Response.json({ success: true });
}

function getFileFromFaaZip(zip_object: AdmZip, filename: string): Buffer {
  const file = zip_object.getEntry(filename);
  if (!file || file.isDirectory) {
    throw `Failed to extract ${filename} from FAA zip file`;
  }
  return file.getData();
}

async function processCsvData<RawType, DataType>(
  csv_buffer: Buffer,
  parsing_function: (value: RawType) => DataType,
  saving_function: (data: DataType[]) => Promise<void>
) {
  return new Promise<void>((resolve, reject) => {
    const readable = new Stream.Readable();
    readable._read = () => {};
    readable.push(csv_buffer);
    readable.push(null);

    let data: DataType[] = [];

    readable
      .pipe(csvParser())
      .on("data", (row) => {
        try {
          data.push(parsing_function(row as RawType));
        } catch (error: any) {
          if (error.message.trim()) {
            console.error(error);
          }
        }
      })
      .on("end", async () => {
        try {
          // saved to database
          await saving_function(data);
          resolve();
        } catch (error) {
          reject(error);
        }
      })
      .on("error", (error) => {
        reject(error);
      });
  });
}

(async () => {
  await update_faa_data();
})();
