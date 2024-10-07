import Image from "next/image";
import { AnimatedListDemo } from "./_components/transaction-animated-list";
import { HowItWorksSection } from "./_components/sections/how-it-works";
import Link from "next/link";
import { LeafIcon } from "lucide-react";
import { landingConfig } from "@/config/landing";
import { currentUser } from "@clerk/nextjs/server";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import ShimmerButton from "@/components/ui/shimmer-button";
import HomeNav from "./_components/nav-menu";

export default async function Home() {
  const user = await currentUser();
  return (
    <>
      <section className="min-h-screen relative">
        <div className="absolute inset-2 bottom-0 rounded-3xl ring-1 ring-inset ring-black/5 bg-[linear-gradient(115deg,var(--tw-gradient-stops))] from-[#6ee7b7] from-[28%] via-[#818cf8] via-[70%] to-[#3b82f6] sm:bg-[linear-gradient(145deg,var(--tw-gradient-stops))]" />
        <div className="relative px-6 lg:px-8">
          <div className="container">
            <HomeNav items={landingConfig} />
            <div className="pb-24 pt-16 sm:pb-32 sm:pt-24 md:pb-48 md:pt-32 flex justify-between">
              <div>
                <h1 className="font-display text-balance text-5xl/[0.9] font-medium tracking-tight text-gray-950 sm:text-6xl/[0.8] md:text-7xl/[0.9] 2xl:text-8xl/[0.9]">
                  Finance Tracking & Budgeting for Modern Spenders
                </h1>
                <p className="mt-8 max-w-lg text-xl/7 font-medium text-gray-950/75 sm:text-2xl/8">
                  Manage expenses, optimize savings, and reach your financial
                  goals—all with Minty.
                </p>
                <div className="mt-12 flex flex-col gap-x-6 gap-y-4 sm:flex-row">
                  <a
                    className="inline-flex items-center justify-center px-4 py-[calc(theme(spacing.2)-1px)] rounded-full border border-transparent bg-gray-950 shadow-md whitespace-nowrap text-base font-medium text-white data-[disabled]:bg-gray-950 data-[hover]:bg-gray-800 data-[disabled]:opacity-40"
                    data-headlessui-state=""
                    href="#"
                  >
                    Get started
                  </a>
                  <a
                    className="relative inline-flex items-center justify-center px-4 py-[calc(theme(spacing.2)-1px)] rounded-full border border-transparent bg-white/15 shadow-md ring-1 ring-[#D15052]/15 after:absolute after:inset-0 after:rounded-full after:shadow-[inset_0_0_2px_1px_#ffffff4d] whitespace-nowrap text-base font-medium text-gray-950 data-[disabled]:bg-white/15 data-[hover]:bg-white/20 data-[disabled]:opacity-40"
                    data-headlessui-state=""
                    href="/pricing"
                  >
                    See pricing
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <HowItWorksSection />
    </>
  );
}
