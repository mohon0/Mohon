import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const invoices = [
  {
    invoice: "INV001",
    date: "10/12/25",
    totalAmount: "$250.00",
    month: "March",
  },
  {
    invoice: "INV002",
    date: "10/12/25",
    totalAmount: "$150.00",
    month: "March",
  },
  {
    invoice: "INV003",
    date: "10/12/25",
    totalAmount: "$350.00",
    month: "March",
  },
  {
    invoice: "INV004",
    date: "10/12/25",
    totalAmount: "$450.00",
    month: "March",
  },
  {
    invoice: "INV005",
    date: "10/12/25",
    totalAmount: "$550.00",
    month: "March",
  },
  {
    invoice: "INV006",
    date: "10/12/25",
    totalAmount: "$200.00",
    month: "March",
  },
  {
    invoice: "INV007",
    date: "10/12/25",
    totalAmount: "$300.00",
    month: "March",
  },
];

export default function TableDemo() {
  return (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
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
            <TableCell className="text-right">{invoice.totalAmount}</TableCell>
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
  );
}
