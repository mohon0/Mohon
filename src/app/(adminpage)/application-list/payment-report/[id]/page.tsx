"use client";

import Loading from "@/components/common/loading/Loading";
import { FetchPaymentReport } from "@/components/fetch/get/application/FetchPaymentReport";
import DeletePaymentSummary from "@/components/page/applicationlist/payment-report/DeletePaymentSummary";
import PaymentSummaryTable from "@/components/page/applicationlist/payment-report/PaymentSummaryTable";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { z } from "zod";

export default function PaymentReport() {
  const params = useParams();
  const id = params.id;
  const { isLoading, data, isError, refetch } = FetchPaymentReport(id);
  const FormSchema = z.object({
    trxId: z.string().min(2, "trxId is required "),
    month: z.string().min(2, "month is required"),
    year: z.string().min(2, "year is required"),
    amount: z
      .string()
      .regex(
        /^\d+(\.\d+)?$/,
        "Amount must be numerical and can not be negative or empty",
      )
      .min(2, "Amount is required")
      .max(10),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      trxId: "",
      amount: "",
      month: "",
      year: "",
    },
  });

  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return <p>Something is wrong..</p>;
  }

  async function onSubmit(data: z.infer<typeof FormSchema>) {
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
    toast.loading("Please wait...");
    const response = await axios.post(
      `/api/application/payment-report?id=${id}`,
      dataWithoutYear,
    );
    if (response.status === 201) {
      toast.dismiss();
      toast.success("Payment Report was successfully added.");
      form.reset();
      refetch();
    } else {
      toast.dismiss();
      toast.error("Failed to add payment report");
    }
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
      <Card className="mx-auto w-2/3">
        <CardContent className="flex gap-10">
          <Image src={data.image} alt="" width={200} height={200} />
          <div>
            <p className="text-2xl font-bold uppercase text-primary">
              {data.firstName} {data.lastName}
            </p>
            <p>{data.fullAddress}</p>
            <p>{data.mobileNumber}</p>
            <p>{data.email}</p>
          </div>
        </CardContent>
      </Card>
      <div className="mt-10">
        <p className="mt-0 text-center text-2xl font-bold">
          Make Payment Report
        </p>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mx-auto mt-4 space-y-2 md:w-2/3"
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
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Month" />
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
                  <FormLabel>Select Year</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
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
        <PaymentSummaryTable data={data.payments} />
      </div>
      <DeletePaymentSummary data={data.payments} id={id} />
      <ToastContainer theme="dark" position="top-center" />
    </>
  );
}
