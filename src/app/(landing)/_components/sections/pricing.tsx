"use client";

import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { Check } from "lucide-react";

const freePlanFeatures = [
  "Track your basic expenses",
  "Simple budget tracking",
  "Limited features",
];

const paidPlanFeatures = [
  "Full access to all features",
  "Advanced budgeting tools",
  "Real-time financial insights",
  "Priority support",
  "Secure data sync across devices",
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};
export const PricingSection = () => {
  return (
    <section id="pricing" className="min-h-screen container pt-24">
      <motion.div
        className="space-y-5"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeIn" }}
      >
        <h3 className="tracking-wider uppercase text-purple-700 text-sm lg:text-lg">
          Pricing
        </h3>
        <div className="overflow-hidden">
          <p className="text-xl md:text-2xl xl:text-4xl font-medium leading-relaxed max-w-6xl">
            Minty offers flexible pricing to fit your financial goals. Whether
            you&apos;re managing daily expenses or planning for the future, our
            plans make tracking your finances easy and accessible.
          </p>
        </div>
      </motion.div>
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="grid md:grid-cols-2 gap-8 mt-20"
      >
        <PricingCard
          title="Free Plan"
          price="Free"
          features={freePlanFeatures}
        />
        <PricingCard
          title="Premium Plan"
          price="₹450"
          features={paidPlanFeatures}
          isPopular
        />
      </motion.div>
    </section>
  );
};

interface PricingCardProps {
  title: string;
  price: string;
  features: string[];
  isPopular?: boolean;
}

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export function PricingCard({
  title,
  price,
  features,
  isPopular,
}: PricingCardProps) {
  return (
    <motion.div
      variants={cardVariants}
      className="relative p-8 rounded-2xl border bg-white shadow-lg h-full flex flex-col"
    >
      {isPopular && (
        <div className="absolute -top-3 -right-3">
          <div className="relative">
            <div className="absolute inset-0 animate-ping bg-primary/90 rounded-full w-6 h-6 opacity-75" />
            <div className="relative bg-primary rounded-full w-6 h-6" />
          </div>
        </div>
      )}

      <div className="flex-1">
        <h3 className="text-lg font-semibold text-primary mb-2">{title}</h3>
        <div className="mb-6">
          <span className="text-4xl font-bold text-gray-900">{price}</span>
          {price !== "Free" && (
            <span className="text-gray-600 ml-2">/month</span>
          )}
        </div>

        <ul className="space-y-4">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center text-gray-700">
              <Check className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
              {feature}
            </li>
          ))}
        </ul>
      </div>

      <button
        className={cn(
          "w-full py-3 px-6 rounded-lg font-medium transition-colors mt-8",
          isPopular
            ? "bg-primary/90 text-white hover:bg-primary/100"
            : "bg-gray-100 text-gray-900 hover:bg-gray-200",
        )}
      >
        Get Started
      </button>
    </motion.div>
  );
}
