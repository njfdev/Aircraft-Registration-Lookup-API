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
import { MAX_FREE_REQUESTS_PER_MINUTE } from "@/lib/types";
import Link from "next/link";
import { useState } from "react";

export default function DocsPage() {
  return (
    <main className="flex flex-col max-w-[42rem] mx-auto mt-4">
      <h1 className="text-3xl font-bold mb-1">Documentation</h1>
      <p>
        Welcome to the arla docs! They are pretty simple, but they should help
        you getting started and understanding the API.
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
        parameter, a random one will be returned. All parameters are NOT case
        sensitive.
      </p>
      <Accordion type="single" collapsible>
        <AccordionItem value="faa-registration">
          <AccordionTrigger>/faa/registration</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-2 text-base">
            <code className="text-primary">
              https://arla.njf.dev/api/v0/faa/registration/[MODE_S || N_NUMBER]
            </code>
            <p>
              The registration endpoint will return all registration and model
              information about an aircraft based on a given Mode S or N-Number
              registration.
            </p>
            <p>
              <code className="text-primary">MODE_S</code> - The Mode S hex code
              (a.k.a ICAO Address) is a 6 digit hexadecimal number that uniquely
              identifies an aircraft such as <code>A06D1D</code>.
            </p>
            <p>
              <code className="text-primary">N_NUMBER</code> - The N-Number
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
                href=""
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
          <AccordionContent></AccordionContent>
        </AccordionItem>
        <AccordionItem value="engine-model">
          <AccordionTrigger>/faa/engine_model</AccordionTrigger>
          <AccordionContent></AccordionContent>
        </AccordionItem>
      </Accordion>
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
