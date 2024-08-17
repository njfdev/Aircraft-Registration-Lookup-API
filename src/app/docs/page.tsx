import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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
      <p>The API consists of only 3 endpoints.</p>
      <Accordion type="single" collapsible>
        <AccordionItem value="faa-registration">
          <AccordionTrigger>/faa/registration</AccordionTrigger>
          <AccordionContent></AccordionContent>
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
