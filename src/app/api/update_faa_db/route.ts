import type { NextRequest } from "next/server";
import AdmZip from "adm-zip";
import { Stream } from "stream";
import csvParser from "csv-parser";
import faa_sample_data, {
  aircraftInfo,
  engineInfo,
} from "../../../sample_faa_data";
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

export async function GET(request: NextRequest) {
  // verify that the request is coming from the vercel cron job and not a random person
  const authHeader = request.headers.get("authorization");
  if (
    authHeader !== `Bearer ${process.env.CRON_SECRET}` &&
    process.env.NODE_ENV !== "development"
  ) {
    return new Response("Unauthorized", {
      status: 401,
    });
  }

  // download faa aircraft registration csv files
  // const zip_download_res = await fetch(
  //   "https://registry.faa.gov/database/ReleasableAircraft.zip"
  // );
  // if (!zip_download_res.ok) {
  //   return new Response("Internal Server Error", {
  //     status: 500,
  //   });
  // }

  // const zip_object = new AdmZip(
  //   Buffer.from(await zip_download_res.arrayBuffer())
  // );

  // const registration_csv = zip_object.getEntry("MASTER.txt");
  // if (!registration_csv || registration_csv.isDirectory) {
  //   return new Response("Internal Server Error", {
  //     status: 500,
  //   });
  // }
  //
  // let csv_buffer = registration_csv.getData();
  let aircraft_csv_buffer = Buffer.from(aircraftInfo);

  let engine_csv_buffer = Buffer.from(engineInfo);

  let registration_csv_buffer = Buffer.from(faa_sample_data);

  processCsvFiles(
    aircraft_csv_buffer,
    engine_csv_buffer,
    registration_csv_buffer
  );

  return Response.json({ success: true });
}

function processCsvFiles(
  aircraft_csv_buffer: Buffer,
  engine_csv_buffer: Buffer,
  registration_csv_buffer: Buffer
) {
  processAircraftCsv(aircraft_csv_buffer, async () => {
    await processEngineCsv(engine_csv_buffer, async () => {
      await processRegistrationCsv(registration_csv_buffer, async () => {
        console.log("Finished updating database!");
      });
    });
  });
}

function processAircraftCsv(
  aircraft_csv_buffer: Buffer,
  after_finish: () => Promise<void>
) {
  const aircraft_readable = new Stream.Readable();
  aircraft_readable._read = () => {};
  aircraft_readable.push(aircraft_csv_buffer);
  aircraft_readable.push(null);

  let aircraft_data: FaaAircraftInfo[] = [];

  aircraft_readable
    .pipe(csvParser())
    .on("data", (row) => {
      try {
        aircraft_data.push(parseRawFaaAircraft(row));
      } catch {}
    })
    .on("end", async () => {
      // saved to database
      await saveFaaAircraftData(aircraft_data);
      await after_finish();
    });
}

function processEngineCsv(
  engine_csv_buffer: Buffer,
  after_finish: () => Promise<void>
) {
  const engine_readable = new Stream.Readable();
  engine_readable._read = () => {};
  engine_readable.push(engine_csv_buffer);
  engine_readable.push(null);

  let engine_data: FaaEngineInfo[] = [];

  engine_readable
    .pipe(csvParser())
    .on("data", (row) => {
      try {
        engine_data.push(parseRawFaaEngine(row));
      } catch {}
    })
    .on("end", async () => {
      // saved to database
      await saveFaaEngineData(engine_data);
      await after_finish();
    });
}

function processRegistrationCsv(
  registration_csv_buffer: Buffer,
  after_finish: () => Promise<void>
) {
  const registration_readable = new Stream.Readable();
  registration_readable._read = () => {};
  registration_readable.push(registration_csv_buffer);
  registration_readable.push(null);

  let registration_data: FaaAircraftRegistration[] = [];

  registration_readable
    .pipe(csvParser())
    .on("data", (row) => {
      try {
        registration_data.push(parseRawFaaRegistration(row));
      } catch {}
    })
    .on("end", async () => {
      // saved to database
      await saveFaaRegistrationData(registration_data);
      await after_finish();
    });
}
