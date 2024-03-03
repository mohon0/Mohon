"use client";

import logo from "@/images/hero/logo1.png";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import * as React from "react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";
import { FaPowerOff } from "react-icons/fa";

type Component = {
  title: string;
  href: string;
  description: string;
};

export default function NavigationMenuUi() {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const { data: session } = useSession();
  const admin = process.env.NEXT_PUBLIC_ADMIN;

  const components: Component[] = [
    {
      title: "Notice",
      href: "/blog/category/notice",
      description: "All the information you need to know.",
    },
    {
      title: "Projects",
      href: "/blog/category/projects",
      description:
        "Our Projects section, that showcase all of your recent work.",
    },
    {
      title: "Course",
      href: "/blog/category/our_course",
      description:
        "We provide some of the best course modules that have known.",
    },
    {
      title: "Blog",
      href: "/blog/page/1",
      description: "Follow our blog section for some of the amazing work I do.",
    },
    {
      title: "Contact Me",
      href: "/contact",
      description: "Let's know each other better. Contact me now.",
    },
    {
      title: "Application",
      href: "/application",
      description:
        "If you want to enroll in our course, then this is the section you are looking for.",
    },
  ];

  const handleDelete = async () => {
    setShowConfirmation(true);
  };

  const handleLogout = () => {
    signOut({ redirect: true, callbackUrl: "/" });
  };

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link href="/" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Home
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem className="hidden lg:block">
          <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
          {session?.user ? (
            <NavigationMenuContent>
              <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                <li className="row-span-3">
                  <NavigationMenuLink asChild>
                    <a
                      className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                      href="/dashboard"
                    >
                      {session.user.image && (
                        <Image
                          src={session.user.image}
                          alt=""
                          height={200}
                          width={200}
                        />
                      )}
                      <div className="mb-2 mt-4 text-lg font-medium">
                        {session.user.name}
                      </div>
                      <p className="text-sm leading-tight text-muted-foreground">
                        Its a beautiful day. Go out there and smash it.
                      </p>
                    </a>
                  </NavigationMenuLink>
                </li>
                <ListItem href="/dashboard" title="Dashboard">
                  Manage your account and everything in one place.
                </ListItem>
                <ListItem href="/application" title="Application">
                  Check out the application page.
                </ListItem>
                <div className="flex items-center justify-center">
                  <button
                    onClick={handleDelete}
                    className="flex items-center justify-center gap-4 rounded-lg bg-red-600 px-10 py-2 font-bold text-white hover:bg-red-500"
                  >
                    Log Out
                    <FaPowerOff size={14} />
                  </button>
                </div>
              </ul>
              {showConfirmation && (
                <div className="fixed inset-0 z-50  flex h-screen w-screen items-center justify-center bg-black bg-opacity-50  backdrop-blur-sm">
                  <div className="w-11/12 rounded-lg bg-blue-950 p-6 shadow-md lg:w-2/6">
                    <p className="text-xl">Are you sure you want to Log Out</p>
                    <div className="mt-8 flex justify-end">
                      <button
                        onClick={() => setShowConfirmation(false)}
                        className="mr-4 rounded bg-gray-600 px-4 py-2 hover:bg-gray-700"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleLogout}
                        className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
                      >
                        Log Out
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </NavigationMenuContent>
          ) : (
            <NavigationMenuContent>
              <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                <li className="row-span-3">
                  <NavigationMenuLink asChild>
                    <a
                      className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                      href="/dashboard"
                    >
                      <Image src={logo} alt="" height={200} width={200} />

                      <div className="mb-2 mt-4 text-lg font-medium">
                        Hey There,
                      </div>
                      <p className="text-sm leading-tight text-muted-foreground">
                        Its a beautiful day. Go out there and smash it.
                      </p>
                    </a>
                  </NavigationMenuLink>
                </li>
                <ListItem href="/signin" title="Login">
                  Login to your account and unlock your full access.
                </ListItem>
                <ListItem href="/signup" title="Registration">
                  New here? Let&#39;s get started by creating your account.
                </ListItem>
                <ListItem href="/blog" title="Blog">
                  Check out all our latest updates.
                </ListItem>
              </ul>
            </NavigationMenuContent>
          )}
        </NavigationMenuItem>
        <NavigationMenuItem className="hidden lg:block">
          <NavigationMenuTrigger>Services</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {components.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/blog/page/1" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Design
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/about" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              About Me
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        {session?.user ? (
          <NavigationMenuItem>
            <Link
              href={
                session.user.email === admin ? "/admin-dashboard" : "/dashboard"
              }
              legacyBehavior
              passHref
            >
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Dashboard
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        ) : (
          <NavigationMenuItem>
            <Link href="/signin" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                LogIn
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        )}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className,
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
