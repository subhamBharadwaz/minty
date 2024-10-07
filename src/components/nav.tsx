"use client";

import { MountainIcon, MenuIcon, LeafIcon } from "lucide-react";
import Link from "next/link";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button, buttonVariants } from "@/components/ui/button";
import { NavItem } from "@/types";
import { Authenticated, Unauthenticated } from "convex/react";
import { UserButton } from "@clerk/nextjs";
import { cn } from "@/lib/utils";

export default function Nav({ items }: { items?: NavItem[] }) {
  return (
    <header className="sticky top-0 z-50 w-full bg-background shadow-sm">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-1" prefetch={false}>
          <LeafIcon className="size-[20px] fill-primary stroke-foreground" />
          <span className="text-lg font-semibold">Minty</span>
        </Link>
        <nav className="relative hidden items-center gap-6 md:flex">
          {items?.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="text-sm cursor-pointer block relative text-white mix-blend-difference z-10 font-medium"
              prefetch={false}
            >
              {item.title}
            </Link>
          ))}
          <div>
            <Unauthenticated>
              <Link href="/sign-in" className={cn(buttonVariants)}>
                Sign in
              </Link>
            </Unauthenticated>
            <Authenticated>
              <UserButton />
            </Authenticated>
          </div>
        </nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <MenuIcon className="h-6 w-6" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px]">
            <div className="flex flex-col gap-6 p-4">
              <Link
                href="#"
                className="flex items-center gap-2"
                prefetch={false}
              >
                <MountainIcon className="h-6 w-6" />
                <span className="text-lg font-semibold">Acme Inc</span>
              </Link>
              <nav className="grid gap-2">
                {items?.map((item) => (
                  <Link
                    key={item.title}
                    href={item.href}
                    className="text-sm font-medium hover:underline hover:underline-offset-4"
                    prefetch={false}
                  >
                    {item.title}
                  </Link>
                ))}
                <div>
                  <Unauthenticated>
                    <Link href="/sign-in" className={cn(buttonVariants)}>
                      Sign in
                    </Link>
                  </Unauthenticated>
                  <Authenticated>
                    <UserButton />
                  </Authenticated>
                </div>
              </nav>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
