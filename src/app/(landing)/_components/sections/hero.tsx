"use client";
import ShimmerButton from "@/components/ui/shimmer-button";
import LottieAnim from "../lottie-anim";
import { motion } from "motion/react";
import Link from "next/link";
import { useConvexAuth } from "convex/react";

// Container variants for stagger effect
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

// Child element variants
const itemVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
      ease: [0.23, 1, 0.32, 1], // Custom easing
    },
  },
};

const HeroSection = () => {
  const { isLoading, isAuthenticated } = useConvexAuth();

  return (
    <section className="pb-24 px-0 pt-24 sm:pb-32 sm:pt-24 md:pb-48 md:pt-32 3xl:pt-52">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex gap-y-10 justify-center items-center flex-col"
      >
        <div className="flex gap-y-6 flex-col items-center justify-center">
          <motion.h1
            variants={itemVariants}
            className="font-display text-balance text-[2.5rem]/[1.1] font-medium tracking-tight text-gray-950 sm:text-5xl/[0.8] md:text-6xl/[0.9] xl:text-6xl/[1] text-center"
          >
            Finance Tracking & Budgeting for Modern Spenders
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="max-w-lg text-xl/7 font-medium text-center text-gray-950/75 sm:text-2xl/8"
          >
            Manage expenses, optimize savings, and reach your financial
            goals—all with Minty.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="z-10 flex items-center justify-center"
          >
            <Link href={isAuthenticated ? "/dashboard" : "/sign-in"}>
              <ShimmerButton className="shadow-2xl">
                <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg">
                  Start Tracking Today
                </span>
              </ShimmerButton>
            </Link>
          </motion.div>
        </div>
        <motion.div variants={itemVariants}>
          <LottieAnim />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
