"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const invoices = [
  {
    invoice: "INV001",
    date: "10/12/25",
    totalAmount: "$250.00",
    month: "March 2024",
  },
  {
    invoice: "INV002",
    date: "10/12/25",
    totalAmount: "$150.00",
    month: "March 2024",
  },
  {
    invoice: "INV003",
    date: "10/12/25",
    totalAmount: "$350.00",
    month: "March 2024",
  },
  {
    invoice: "INV004",
    date: "10/12/25",
    totalAmount: "$450.00",
    month: "March 2024",
  },
  {
    invoice: "INV005",
    date: "10/12/25",
    totalAmount: "$550.00",
    month: "March 2024",
  },
  {
    invoice: "INV006",
    date: "10/12/25",
    totalAmount: "$200.00",
    month: "March 2024",
  },
  {
    invoice: "INV007",
    date: "10/12/25",
    totalAmount: "$300.00",
    month: "March 2024",
  },
];

export default function TableDemo() {
  const FormSchema = z.object({
    trxId: z.string().min(2),
    month: z.string().min(2),
    year: z.string().min(2),
    amount: z.string().min(2),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      trxId: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const { trxId, amount } = data;
    const currentDate = new Date();
    const month = currentDate.toLocaleString("default", { month: "numeric" });
    const day = currentDate.getDate().toString().padStart(2, "0");
    const year = String(currentDate.getFullYear()).padStart(4, "0");

    const formattedDate = `${month}/${day}/${year}`;

    const dataWithoutYear = {
      trxId,
      month: `${data.month} ${data.year}`,
      amount,
      date: formattedDate,
    };
    console.log(dataWithoutYear);
  }

  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 2009 },
    (_, index) => currentYear - index,
  );

  const yearOptions = years.map((year) => (
    <SelectItem key={year} value={year.toString()}>
      {year}
    </SelectItem>
  ));

  return (
    <>
      <p className="mb-10 text-center text-4xl font-bold">Demo Name</p>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">TrxID</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Month</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice) => (
            <TableRow key={invoice.invoice}>
              <TableCell className="font-medium">{invoice.invoice}</TableCell>
              <TableCell>{invoice.date}</TableCell>
              <TableCell>{invoice.month}</TableCell>
              <TableCell className="text-right">
                {invoice.totalAmount}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">$2,500.00</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
      <p className="mt-10 text-center text-2xl font-bold">Add Data</p>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mx-auto space-y-2 md:w-2/3"
        >
          <FormField
            control={form.control}
            name="trxId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>TrxId</FormLabel>
                <FormControl>
                  <Input placeholder="TransactionID" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="month"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Month</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Month" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="January">January</SelectItem>
                    <SelectItem value="February">February</SelectItem>
                    <SelectItem value="March">March</SelectItem>
                    <SelectItem value="April">April</SelectItem>
                    <SelectItem value="May">May</SelectItem>
                    <SelectItem value="June">June</SelectItem>
                    <SelectItem value="July">July</SelectItem>
                    <SelectItem value="August">August</SelectItem>
                    <SelectItem value="September">September</SelectItem>
                    <SelectItem value="October">October</SelectItem>
                    <SelectItem value="November">November</SelectItem>
                    <SelectItem value="December">December</SelectItem>
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="year"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Year</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Year" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>{yearOptions}</SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Amount</FormLabel>
                <FormControl>
                  <Input placeholder="Amount" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </>
  );
}
