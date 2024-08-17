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
import { ExternalLink } from "lucide-react";
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
          <AccordionContent className="flex flex-col gap-2 text-base">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Param Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Description</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>n_number</TableCell>
                  <TableCell>string</TableCell>
                  <TableCell>
                    The N-Number FAA registration code assign to the aircraft
                    without the &quot;N&quot; prefix.
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>serial_number</TableCell>
                  <TableCell>string</TableCell>
                  <TableCell>
                    The complete serial number assigned by the manufacturer.
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>mft_mdl_code</TableCell>
                  <TableCell>string</TableCell>
                  <TableCell>
                    A code assigned to the aircraft manufacturer, model, and
                    series.
                    <PDFExternalLink page={1} />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>eng_mft_mdl</TableCell>
                  <TableCell>string</TableCell>
                  <TableCell>
                    A code assigned to the engine manufacturer and model.
                    <PDFExternalLink page={1} />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>year_mfr</TableCell>
                  <TableCell>number || null</TableCell>
                  <TableCell></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>registrant_type</TableCell>
                  <TableCell>string || null</TableCell>
                  <TableCell>
                    An enum based on registration type. Possible values:{" "}
                    <code>
                      INDIVIDUAL, PARTNERSHIP, CORPORATATION, CO_OWNED,
                      GOVERNMENT, LLC, NON_CITIZEN_CORPORATION,
                      NON_CITIZEN_CO_OWNED
                    </code>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>registrant_name</TableCell>
                  <TableCell>string || null</TableCell>
                  <TableCell></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>registrant_street</TableCell>
                  <TableCell>string || null</TableCell>
                  <TableCell></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>registrant_street2</TableCell>
                  <TableCell>string || null</TableCell>
                  <TableCell>This value is usually not filled out.</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>registrant_city</TableCell>
                  <TableCell>string || null</TableCell>
                  <TableCell></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>registrant_state</TableCell>
                  <TableCell>string || null</TableCell>
                  <TableCell>
                    The 2 letter code for the registrant's state.
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>registrant_zip_code</TableCell>
                  <TableCell>string || null</TableCell>
                  <TableCell></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>registrant_region</TableCell>
                  <TableCell>string || null</TableCell>
                  <TableCell>
                    An enum based on the registrant's region. Possible values:{" "}
                    <code>
                      EASTERN, SOUTHWESTERN, CENTRAL, WESTERN_PACIFIC, ALASKAN,
                      SOUTHERN, EUROPEAN, GREAT_LAKES, NEW_ENGLAND,
                      NORTHWEST_MOUNTAIN
                    </code>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>registrant_county_code</TableCell>
                  <TableCell>number || null</TableCell>
                  <TableCell></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>registrant_country_code</TableCell>
                  <TableCell>string || null</TableCell>
                  <TableCell>
                    The 2 letter code for the registrant's country (usually
                    &quot;US&quot;).
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>last_action_date</TableCell>
                  <TableCell>string</TableCell>
                  <TableCell>
                    A date with no time component formatted as a string in the
                    ISO 8601 format.
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>cert_issue_date</TableCell>
                  <TableCell>string || null</TableCell>
                  <TableCell>
                    A date with no time component formatted as a string in the
                    ISO 8601 format for when the certification was issued.
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>cert_details</TableCell>
                  <TableCell>string</TableCell>
                  <TableCell>
                    A 10 character long string containing information about the
                    type and uses of the certification requested.
                    <PDFExternalLink page={2} />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>aircraft_type</TableCell>
                  <TableCell>string</TableCell>
                  <TableCell>
                    An enum based on the aircraft type. Possible values:{" "}
                    <code>
                      GLIDER, BALLOON, BLIMP, FIXED_WING_SINGLE_ENGINE,
                      FIXED_WING_MULTI_ENGINE, ROTORCRAFT, WEIGHT_SHIFT_CONTROL,
                      POWERED_PARACHUTE, GYROPLANE, HYBRID_LIFT, OTHER
                    </code>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>engine_type</TableCell>
                  <TableCell>string</TableCell>
                  <TableCell>
                    An enum based on the engine type. Possible values:{" "}
                    <code>
                      NONE, RECIPROCATING, TURBO_PROP, TURBO_SHAFT, TURBO_JET,
                      TURBO_FAN, RAMJET, TWO_CYCLE, FOUR_CYCLE, UNKNOWN,
                      ELECTRIC, ROTARY
                    </code>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>status_code</TableCell>
                  <TableCell>string</TableCell>
                  <TableCell>
                    A single character or number status code for the
                    registration.
                    <PDFExternalLink page={5} />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>mode_s_code</TableCell>
                  <TableCell>number</TableCell>
                  <TableCell>
                    The aircraft transponder code (can be found in ADS-B
                    messages).
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>fractional_ownership</TableCell>
                  <TableCell>boolean</TableCell>
                  <TableCell>
                    Whether the registration has fractional ownership or not.
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>air_worth_date</TableCell>
                  <TableCell>string || null</TableCell>
                  <TableCell>
                    A date with no time component formatted as a string in the
                    ISO 8601 format for when the aircraft had its airworthiness
                    test.
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>other_registrant_name_1</TableCell>
                  <TableCell>string || null</TableCell>
                  <TableCell>This value is usually not filled out.</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>other_registrant_name_2</TableCell>
                  <TableCell>string || null</TableCell>
                  <TableCell>This value is usually not filled out.</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>other_registrant_name_3</TableCell>
                  <TableCell>string || null</TableCell>
                  <TableCell>This value is usually not filled out.</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>other_registrant_name_4</TableCell>
                  <TableCell>string || null</TableCell>
                  <TableCell>This value is usually not filled out.</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>other_registrant_name_5</TableCell>
                  <TableCell>string || null</TableCell>
                  <TableCell>This value is usually not filled out.</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>expiration_date</TableCell>
                  <TableCell>string</TableCell>
                  <TableCell>
                    A date with no time component formatted as a string in the
                    ISO 8601 format for when the registration expires.
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>unique_id</TableCell>
                  <TableCell>number</TableCell>
                  <TableCell>
                    A unique identification number for the registration.
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>kit_mfr</TableCell>
                  <TableCell>string || null</TableCell>
                  <TableCell>
                    This value is usually not filled out.
                    <PDFExternalLink page={7} />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>kit_model</TableCell>
                  <TableCell>string || null</TableCell>
                  <TableCell>
                    This value is usually not filled out.
                    <PDFExternalLink page={7} />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>mode_s_code_hex</TableCell>
                  <TableCell>string</TableCell>
                  <TableCell>
                    The aircraft Mode S transponder code as a hexadecimal
                    string.
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>aircraft_info</TableCell>
                  <TableCell>
                    <Link
                      href="#acft-mdl-info"
                      className="underline hover:opacity-80 active:opacity-65"
                    >
                      AircraftModelObject
                    </Link>
                  </TableCell>
                  <TableCell></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>engine_info</TableCell>
                  <TableCell>
                    <Link
                      href="#eng-mdl-info"
                      className="underline hover:opacity-80 active:opacity-65"
                    >
                      EngineModelObject
                    </Link>
                  </TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </AccordionContent>
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

function PDFExternalLink({ page }: { page: number }) {
  return (
    <Button variant="ghost" asChild className="p-0 h-max ml-1">
      <Link
        href={`https://registry.faa.gov/database/ardata.pdf#page=${page}`}
        target="_blank"
        className="underline hover:opacity-80 active:opacity-65"
      >
        <ExternalLink className="h-4 w-4" />
      </Link>
    </Button>
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
