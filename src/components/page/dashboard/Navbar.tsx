"use client";
import { NavigationMenuDemo } from "@/components/layout/NavigationMenu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSession } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();

  const name = session?.user?.name || "MOHON";
  const fallback = name.slice(0, 2);
  const image = session?.user?.image;
  return (
    <div className="flex h-16 items-center justify-between border-b px-10">
      <NavigationMenuDemo />
      <>
        {session && (
          <Avatar className="cursor-pointer">
            {image && <AvatarImage src={image} />}
            <AvatarFallback>{fallback}</AvatarFallback>
          </Avatar>
        )}
      </>
    </div>
  );
}
