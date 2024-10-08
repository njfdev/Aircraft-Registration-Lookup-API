import { ModeToggle } from "@/components/ModeToggle";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Github } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center gap-4">
      <div className="flex flex-col items-center">
        <div className="flex flex-col items-center my-12">
          <h1 className="font-bold text-7xl">arla</h1>
          <h2 className="text-xl font-medium">
            Aircraft Registration Lookup API
          </h2>
        </div>
        <Button variant="secondary" asChild>
          <Link href="https://github.com/njfdev/Aircraft-Registration-Lookup-API">
            <Github className="mr-2 h-5 w-5" /> GitHub Repository
          </Link>
        </Button>
      </div>
      <Separator />
      <div className="flex flex-col w-full max-w-[42rem] text-justify gap-2">
        <p className="text-center text-lg font-semibold my-2">
          public api for aircraft registration
        </p>
        <p>
          Aircraft Registration Lookup API (arla) is a small hobby project
          created by{" "}
          <Link
            className="underline hover:opacity-80 active:opacity-65 transition-opacity"
            href="https://github.com/njfdev"
          >
            Nicholas Fasching
          </Link>{" "}
          with the goal to provide a free, public, and simple API for getting
          registration and model information about any given aircraft.
          Currently, arla is updated daily from the Federal Aviation
          Administration&apos;s (FAA){" "}
          <Link
            className="underline hover:opacity-80 active:opacity-65 transition-opacity"
            href="https://www.faa.gov/licenses_certificates/aircraft_certification/aircraft_registry/releasable_aircraft_download"
          >
            aircraft registration database
          </Link>{" "}
          (which comes in the format of CSV files).
        </p>
        <p>
          This project was originally made to supplement the development of{" "}
          <Link
            className="underline hover:opacity-80 active:opacity-65 transition-opacity"
            href="https://github.com/njfdev/rtlsdr-radio"
          >
            RTL-SDR Radio
          </Link>
          , and is therefore designed with its goals in mind. Due to only
          pulling from the FAA, any aircraft registered outside of the U.S. will
          likely not be found. If you would like extra countries or features,{" "}
          <Link
            className="underline hover:opacity-80 active:opacity-65 transition-opacity"
            href="https://github.com/njfdev/Aircraft-Registration-Lookup-API"
          >
            star the repository
          </Link>{" "}
          and{" "}
          <Link
            className="underline hover:opacity-80 active:opacity-65 transition-opacity"
            href="https://github.com/njfdev/Aircraft-Registration-Lookup-API/issues"
          >
            make an issue on GitHub
          </Link>{" "}
          so I can work on it!
        </p>
        <p>
          Huge thanks to:
          <ul className="ml-4 *:list-disc">
            <li>
              <Link
                className="underline hover:opacity-80 active:opacity-65 transition-opacity"
                href="https://vercel.com/"
              >
                Vercel
              </Link>{" "}
              - hosting this website and API for free!
            </li>
            <li>
              <Link
                className="underline hover:opacity-80 active:opacity-65 transition-opacity"
                href="https://github.com/features/actions"
              >
                GitHub Actions
              </Link>{" "}
              - running the daily update script (~7 minutes of compute) for
              free!
            </li>
            <li>
              <Link
                className="underline hover:opacity-80 active:opacity-65 transition-opacity"
                href="https://supabase.com/"
              >
                Supabase
              </Link>{" "}
              - hosting the database for free!
            </li>
            <li>
              <Link
                className="underline hover:opacity-80 active:opacity-65 transition-opacity"
                href="https://www.faa.gov/licenses_certificates/aircraft_certification/aircraft_registry/releasable_aircraft_download"
              >
                Federal Aviation Administration
              </Link>{" "}
              - providing aircraft registration information for free!
            </li>
            <li>
              <Link
                className="underline hover:opacity-80 active:opacity-65 transition-opacity"
                href="https://www.adsbdb.com/"
              >
                adsbdb.com
              </Link>{" "}
              - inspiring this project!
            </li>
          </ul>
        </p>
      </div>
    </main>
  );
}
