import type { NextRequest } from "next/server";
import AdmZip from "adm-zip";
import { Stream } from "stream";
import csvParser from "csv-parser";
import faa_sample_data from "../../../sample_faa_data";
import { AircraftRegistrationRawInfo } from "@/lib/types";
import saveFaaRegistrationData from "@/lib/faa_registration";

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
  let csv_buffer = Buffer.from(faa_sample_data);

  // create a readable stream from the csv buffer
  const readable = new Stream.Readable();
  readable._read = () => {};
  readable.push(csv_buffer);
  readable.push(null);

  const aircraft_registration_data: AircraftRegistrationRawInfo[] = [];

  readable
    .pipe(csvParser())
    .on("data", (row) => {
      aircraft_registration_data.push(row);
    })
    .on("end", async () => {
      // saved to database
      await saveFaaRegistrationData(aircraft_registration_data);
    });

  return Response.json({ success: true });
}
