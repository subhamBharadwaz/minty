"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { LeafIcon, Menu, X } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import ShimmerButton from "@/components/ui/shimmer-button";
import { NavItem } from "@/types";
import { Authenticated, Unauthenticated } from "convex/react";
import { UserButton } from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";

export default function HomeNav({ items }: { items?: NavItem[] }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-background/80 backdrop-blur-md shadow-sm"
          : "bg-transparent",
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <Link href="/" className="flex items-center gap-2">
            <LeafIcon className="h-6 w-6 sm:h-8 sm:w-8 fill-primary stroke-foreground" />
            <span className="text-lg sm:text-xl font-bold">Minty</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {items?.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-all hover:underline",
                  isScrolled ? "text-foreground" : "text-foreground/90",
                )}
              >
                {item.title}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <div className="hidden md:block">
              <Unauthenticated>
                <Link href="/sign-in">
                  <ShimmerButton className="shadow-lg">
                    <span className="text-sm font-medium">Sign in</span>
                  </ShimmerButton>
                </Link>
              </Unauthenticated>
              <Authenticated>
                <Link href="/dashboard">
                  <ShimmerButton className="shadow-lg">
                    <span className="text-sm font-medium">Dashboard</span>
                  </ShimmerButton>
                </Link>
              </Authenticated>
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        <div className="overflow-hidden">
          <AnimatePresence mode="wait">
            {isMobileMenuOpen && (
              <motion.div
                initial={{ y: -200 }}
                animate={{ y: 0 }}
                exit={{ y: -200 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="md:hidden py-4 bg-background h-36 w-full rounded-md p-3"
              >
                <nav className="flex flex-col gap-4">
                  {items?.map((item) => (
                    <Link
                      key={item.title}
                      href={item.href}
                      className="text-sm font-medium hover:text-primary"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.title}
                    </Link>
                  ))}
                  <Unauthenticated>
                    <Link href="/sign-in">
                      <ShimmerButton className="shadow-lg">
                        <span className="text-sm font-medium">Sign in</span>
                      </ShimmerButton>
                    </Link>
                  </Unauthenticated>
                  <Authenticated>
                    <Link href="/dashboard">
                      <ShimmerButton className="shadow-lg">
                        <span className="text-sm font-medium">Dashboard</span>
                      </ShimmerButton>
                    </Link>
                  </Authenticated>
                </nav>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
