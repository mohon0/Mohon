"use client";

import { useSession } from "next-auth/react";
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
import { BestComputer } from "./BestComputer";

export function NavigationMenuDemo() {
  const { data: session } = useSession();
  const admin = process.env.NEXT_PUBLIC_ADMIN;

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
        <NavigationMenuItem>
          <NavigationMenuTrigger>Services</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[200px] gap-3 p-4 md:w-[250px] lg:w-[300px]">
              <ListItem title="Blog" href="/blog">
                Follow my blog section for some of the amazing work I do.
              </ListItem>
              <ListItem title="Projects" href="/blog/projects">
                Our Projects section, that showcase all of your recent work.
              </ListItem>
              <ListItem title="Course" href="/blog/our_course">
                We provide some of the best course modules that have known.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Design</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[200px] gap-3 p-4 md:w-[250px] lg:w-[300px]">
              <ListItem title="All Design" href="/blog/design">
                Discover a diverse range of options to suit every style and
                project.
              </ListItem>
              <ListItem title="Premium" href="/blog/premium-design">
                Elevate your experience with exclusive, high-quality selections.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <BestComputer />

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
