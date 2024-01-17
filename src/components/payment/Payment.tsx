"use client";
import Link from "next/link";
import { Button } from "../ui/button";

export default function Payment() {
  return (
    <div>
      <Link href="https://shop.bkash.com/mia-store01779120023/pay/bdt1/L6aGpv">
        <Button>Pay With Bkash</Button>
      </Link>
    </div>
  );
}
