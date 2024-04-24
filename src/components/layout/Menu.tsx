"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "../ui/sheet";

export default function Menu() {
  const { data: session } = useSession();
  const admin = process.env.NEXT_PUBLIC_ADMIN;

  async function handleLogout() {
    signOut({ redirect: false, callbackUrl: "/" });
  }

  return (
    <div className="mr-3 lg:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <div className="flex flex-col items-end gap-1.5 p-1">
            <span className="h-[2px] w-5 bg-foreground"></span>
            <span className="h-[2px] w-4 bg-foreground"></span>
            <span className="h-[2px] w-5 bg-foreground"></span>
          </div>
        </SheetTrigger>
        <SheetContent className="">
          <SheetHeader>
            <SheetClose asChild>
              <div className="mb-4 flex items-center justify-between px-8 text-primary">
                <Link href={"/"} className="text-xl font-bold">
                  MOHON
                </Link>
              </div>
            </SheetClose>
          </SheetHeader>
          <div className=" flex w-8/12 flex-col gap-3">
            <SheetClose asChild>
              <Link href="/">
                <Button variant="outline" className="flex w-full">
                  Home
                </Button>
              </Link>
            </SheetClose>
            <Accordion type="single" collapsible>
              <AccordionItem value="1">
                <AccordionTrigger>
                  <Button variant="outline">Best Computer T.C</Button>
                </AccordionTrigger>
                <AccordionContent className="flex flex-col gap-2">
                  <Link href="/notice">
                    <Button variant="outline" className="w-full">
                      Notice
                    </Button>
                  </Link>
                  <Link href="/result">
                    <Button variant="outline" className="w-full">
                      Result
                    </Button>
                  </Link>
                  <Link href="/application">
                    <Button variant="outline" className="w-full">
                      Apply Now
                    </Button>
                  </Link>
                  <Link href="/blog/category/our_course">
                    <Button variant="outline" className="w-full">
                      Course Module
                    </Button>
                  </Link>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <SheetClose asChild>
              <Link href="/blog/page/1">
                <Button variant="outline" className="flex w-full">
                  Design
                </Button>
              </Link>
            </SheetClose>
            <SheetClose asChild>
              <Link href="/blog/category/projects">
                <Button variant="outline" className="flex w-full">
                  Projects
                </Button>
              </Link>
            </SheetClose>
            <SheetClose asChild>
              <Link href="/about">
                <Button variant="outline" className="flex w-full">
                  About Me
                </Button>
              </Link>
            </SheetClose>
            <SheetClose asChild>
              <Link href="/blood-donate">
                <Button variant="outline" className="flex w-full">
                  Blood Donate
                </Button>
              </Link>
            </SheetClose>
            <SheetClose asChild>
              <Link href="/application">
                <Button variant="outline" className="flex w-full">
                  Application
                </Button>
              </Link>
            </SheetClose>
            <SheetClose asChild>
              {session?.user ? (
                <Link
                  href={
                    session.user.email === admin
                      ? "/admin-dashboard"
                      : "/dashboard"
                  }
                >
                  <Button variant="outline" className="flex w-full">
                    Dashboard
                  </Button>
                </Link>
              ) : (
                <Link href="/signin">
                  <Button variant="outline" className="flex w-full">
                    Login
                  </Button>
                </Link>
              )}
            </SheetClose>
            {session?.user && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive">Log Out</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleLogout}
                      className="bg-red-600 hover:bg-red-700"
                    >
                      Log Out
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
