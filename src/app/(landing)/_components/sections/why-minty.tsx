"use client";
import { WobbleCard } from "@/components/wobble-card";
import { motion } from "framer-motion";
import Image from "next/image";

export const WhyMintySection = () => {
  return (
    <section id="features" className="min-h-screen container pt-24">
      <motion.div
        className="space-y-5"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeIn" }}
      >
        <h3 className="tracking-wider uppercase text-purple-700 text-sm lg:text-lg">
          Why Choose Minty?
        </h3>
        <div className="overflow-hidden">
          <p className="text-xl md:text-2xl xl:text-4xl font-medium leading-relaxed max-w-6xl">
            Minty simplifies your finances with smart tools for budgeting,
            tracking, and saving. Stay in control and achieve your goals
            effortlessly!
          </p>
        </div>
      </motion.div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-20  w-full">
        <WobbleCard
          containerClassName="col-span-1 lg:col-span-2 h-full bg-green-700 min-h-[500px] lg:min-h-[300px]"
          className=""
        >
          <div className="max-w-xs">
            <h2 className="text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
              Real-Time Expense Tracking
            </h2>
            <p className="mt-4 text-left  text-base/6 text-neutral-200">
              Get instant updates on your spending habits with real-time expense
              tracking. See where your money goes and make smarter decisions on
              the fly.
            </p>
          </div>
          <Image
            src="/images/expense-tracking.png"
            width={500}
            height={500}
            alt="Expense Tracking"
            className="absolute -right-4 lg:-right-[10%]  -bottom-10 object-contain rounded-2xl"
          />
        </WobbleCard>
        <WobbleCard containerClassName="col-span-1 min-h-[300px]">
          <h2 className="max-w-80  text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
            Personalized Goals
          </h2>
          <p className="mt-4 max-w-[26rem] text-left  text-base/6 text-neutral-200">
            Set meaningful financial goals and watch your progress in real-time.
            Minty helps you stay motivated with actionable insights and
            reminders.
          </p>
        </WobbleCard>
        <WobbleCard containerClassName="col-span-1  bg-amber-700 min-h-[300px]">
          <div className="max-w-sm">
            <h2 className="max-w-sm md:max-w-lg  text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
              Visual Insights
            </h2>
            <p className="mt-4 max-w-[26rem] text-left  text-base/6 text-neutral-200">
              Understand your finances at a glance with intuitive graphs and
              dashboards. Gain clarity on spending patterns and identify areas
              to save.
            </p>
          </div>
        </WobbleCard>
        <WobbleCard containerClassName="col-span-1 lg:col-span-2 bg-teal-700 min-h-[500px] lg:min-h-[600px] xl:min-h-[300px]">
          <div className="max-w-sm">
            <h2 className="max-w-sm md:max-w-lg  text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
              Smart Budgeting Tools
            </h2>
            <p className="mt-4 max-w-[26rem] text-left  text-base/6 text-neutral-200">
              Easily create customizable budgets that fit your lifestyle. Stay
              on track with intuitive insights and reminders designed to help
              you save more every month.
            </p>
          </div>
          <Image
            src="/images/budgeting.png"
            width={500}
            height={500}
            alt="Smart Budgeting Tools"
            className="absolute -right-4 lg:-right-[10%]  -bottom-10 object-contain rounded-2xl"
          />
        </WobbleCard>
      </div>
    </section>
  );
};
