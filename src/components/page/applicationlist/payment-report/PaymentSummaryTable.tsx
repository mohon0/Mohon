import DateFormatter from "@/components/helper/hooks/DateFormtter";
import { PaymentReportType } from "@/components/type/PaymentReportType";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";

interface Props {
  data: PaymentReportType[];
}

const PaymentSummaryTable: React.FC<Props> = ({ data }) => {
  const totalAmount = data.reduce((acc, payment) => acc + payment.amount, 0);

  return (
    <div className="mt-10">
      <p className="mb-10 text-center text-4xl font-bold">Payment Summary</p>
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
          {data.map((payment) => (
            <TableRow key={payment.id}>
              <TableCell className="font-medium">{payment.trxId}</TableCell>
              <TableCell>{payment.createdAt}</TableCell>
              <TableCell>{payment.month}</TableCell>
              <TableCell className="text-right">
                &#x09F3; {payment.amount}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">
              &#x09F3; {totalAmount.toFixed(2)}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};

export default PaymentSummaryTable;
