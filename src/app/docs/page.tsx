"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useHash from "@/lib/routing/utils";
import { MAX_FREE_REQUESTS_PER_MINUTE } from "@/lib/types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DocsPage() {
  const hash = useHash();
  const [openObjectAccordions, setOpenObjectAccordions] = useState<string[]>(
    []
  );

  useEffect(() => {
    if (hash && !openObjectAccordions.includes(hash)) {
      console.log(openObjectAccordions);
      setOpenObjectAccordions((old) => [...old, hash.substring(1)]);
    }
  }, [hash]);

  return (
    <main className="flex flex-col max-w-[42rem] mx-auto mt-4">
      <h1 className="text-3xl font-bold mb-1">Documentation</h1>
      <p>Welcome to the arla docs!</p>
      <p className="mt-2">
        This version of the API just pulls information directly from the FAA
        with minimal processing. Because the FAA provides the information in all
        capital letters, all information return by the API will be in capitals.
        This also means that certain values in the returned result may need more
        processing by your code.
      </p>
      <h2 className="mt-4 text-2xl font-bold">Rate Limits</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Tier</TableHead>
            <TableHead>Max Request Rate</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Free</TableCell>
            <TableCell>
              {MAX_FREE_REQUESTS_PER_MINUTE} requests/minute
            </TableCell>
          </TableRow>
        </TableBody>
        <TableCaption>
          Paid tiers are not supported, but if you need more capabilities,{" "}
          <Link
            className="underline hover:opacity-80 active:opacity-65 transition-opacity"
            href="mailto:contact@njf.dev"
          >
            email me
          </Link>{" "}
          or{" "}
          <Link
            className="underline hover:opacity-80 active:opacity-65 transition-opacity"
            href="https://github.com/njfdev/Aircraft-Registration-Lookup-API/issues"
          >
            create an issue on GitHub
          </Link>
          .
        </TableCaption>
      </Table>
      <h2 className="mt-4 text-2xl font-bold">API Routes</h2>
      <p>
        The API consists of only 3 endpoints. All endpoints listed here must be
        prefix with &quot;/api/v0&quot;. If you call any endpoint without its
        parameter, a random one will be returned. All parameters are NOT
        case-sensitive.
      </p>
      <Accordion type="multiple">
        <AccordionItem value="faa-registration">
          <AccordionTrigger>/faa/registration</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-2 text-base">
            <code className="text-primary">
              https://arla.njf.dev/api/v0/faa/registration/[mode_s_hex_code ||
              n_number]
            </code>
            <p>
              The registration endpoint will return all registration and model
              information about an aircraft based on a given Mode S or N-Number
              registration.
            </p>
            <p>
              <code className="text-primary">mode_s_hex_code</code> - The Mode S
              hex code (a.k.a ICAO Address) is a 6 digit hexadecimal number that
              uniquely identifies an aircraft such as <code>A06D1D</code>.
            </p>
            <p>
              <code className="text-primary">n_number</code> - The N-Number
              registration is specific to aircraft registered with the FAA. It
              is always prefixed with the letter &quot;N&quot;, may not exceed 6
              characters, and can contains letters or numbers. For example,{" "}
              <code>N560WN</code>.
            </p>
            <h3 className="text-xl font-semibold">Response Object</h3>
            <pre className="rounded p-4 dark:bg-stone-900 bg-stone-100">
              &#123;{"\n"}
              {"  "}&quot;registration&quot;:{" "}
              <Link
                href="#reg-obj-info"
                className="underline hover:opacity-80 active:opacity-65"
              >
                RegistrationObject
              </Link>
              {"\n"}
              &#125;
            </pre>
            <h3 className="text-xl font-semibold mt-2">Try Yourself</h3>
            <TryYourselfAPIBlock
              endpoint="/faa/registration"
              parameters={["", "A06D1D", "N560WN"]}
            />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="aircraft-model">
          <AccordionTrigger>/faa/aircraft_model</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-2 text-base">
            <code className="text-primary">
              https://arla.njf.dev/api/v0/faa/aircraft_model/[mft_mdl_code]
            </code>
            <p>
              The aircraft model endpoint will return the FAA's information
              about a certain aircraft model.
            </p>
            <p>
              <code className="text-primary">mft_mdl_code</code> - The aircraft
              model code is a specific code (as defined by the FAA) for the
              model of any aircraft. Many registrations can point to the same
              aircraft model code. This parameter can be found in the{" "}
              <Link
                href="#reg-obj-info"
                className="underline hover:opacity-80 active:opacity-65"
              >
                aircraft registration object
              </Link>
              .
            </p>
            <h3 className="text-xl font-semibold">Response Object</h3>
            <pre className="rounded p-4 dark:bg-stone-900 bg-stone-100">
              &#123;{"\n"}
              {"  "}&quot;aircraft_info&quot;:{" "}
              <Link
                href="#acft-mdl-info"
                className="underline hover:opacity-80 active:opacity-65"
              >
                AircraftModelObject
              </Link>
              {"\n"}
              &#125;
            </pre>
            <h3 className="text-xl font-semibold mt-2">Try Yourself</h3>
            <TryYourselfAPIBlock
              endpoint="/faa/aircraft_model"
              parameters={["", "2110102", "105011A"]}
            />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="engine-model">
          <AccordionTrigger>/faa/engine_model</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-2 text-base">
            <code className="text-primary">
              https://arla.njf.dev/api/v0/faa/engine_model/[eng_mfr_mdl]
            </code>
            <p>
              The engine model endpoint will return the FAA's information about
              a certain engine model.
            </p>
            <p>
              <code className="text-primary">eng_mfr_mdl</code> - The engine
              model code is a specific code (as defined by the FAA) for the
              model of any engine. Many registrations can have the same engine
              model code. This parameter can be found in the{" "}
              <Link
                href="#reg-obj-info"
                className="underline hover:opacity-80 active:opacity-65"
              >
                aircraft registration object
              </Link>
              .
            </p>
            <h3 className="text-xl font-semibold">Response Object</h3>
            <pre className="rounded p-4 dark:bg-stone-900 bg-stone-100">
              &#123;{"\n"}
              {"  "}&quot;engine_info&quot;:{" "}
              <Link
                href="#eng-mdl-info"
                className="underline hover:opacity-80 active:opacity-65"
              >
                EngineModelObject
              </Link>
              {"\n"}
              &#125;
            </pre>
            <h3 className="text-xl font-semibold mt-2">Try Yourself</h3>
            <TryYourselfAPIBlock
              endpoint="/faa/engine_model"
              parameters={["", "41533", "17003"]}
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <h2 className="mt-4 text-2xl font-bold">API Object Types</h2>
      <Accordion
        type="multiple"
        value={openObjectAccordions}
        onValueChange={(values) => setOpenObjectAccordions(values)}
      >
        <AccordionItem value="reg-obj-info" id="reg-obj-info">
          <AccordionTrigger>RegistrationObject</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-2 text-base"></AccordionContent>
        </AccordionItem>
        <AccordionItem value="acft-mdl-info" id="acft-mdl-info">
          <AccordionTrigger>AircraftModelObject</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-2 text-base"></AccordionContent>
        </AccordionItem>
        <AccordionItem value="eng-mdl-info" id="eng-mdl-info">
          <AccordionTrigger>EngineModelObject</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-2 text-base"></AccordionContent>
        </AccordionItem>
      </Accordion>
      <h2></h2>
    </main>
  );
}

function TryYourselfAPIBlock({
  endpoint,
  parameters,
}: {
  endpoint: string;
  parameters: string[];
}) {
  const [currentResult, setCurrentResult] = useState("");
  const [currentApiPath, setCurrentApiPath] = useState("");

  return (
    <div className="flex flex-col gap-1">
      <div className="flex gap-1 w-full *:grow">
        {parameters.map((parameter) => {
          return (
            <Button
              onClick={async () => {
                const requestPath = `/api/v0${endpoint}/${parameter}`;
                setCurrentApiPath(requestPath);
                const apiResult = await fetch(requestPath);
                setCurrentResult(
                  JSON.stringify(await apiResult.json()!, undefined, "  ")
                );
              }}
              key={parameter}
            >
              {endpoint}
              {parameter && `/${parameter}`}
            </Button>
          );
        })}
      </div>
      <pre className="rounded p-4 dark:bg-stone-900 bg-stone-100">
        {currentApiPath ? (
          <span className="text-primary">
            https://arla.njf.dev{currentApiPath}
            {"\n"}
          </span>
        ) : (
          "{}"
        )}
        {currentResult}
      </pre>
    </div>
  );
}
