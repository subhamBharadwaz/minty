"use client";

import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import HoverableAccordion from "../hoverable-accordion";
import { useState, useRef } from "react";
import { AnimatePresence, motion, useInView } from "motion/react";
import Image from "next/image";

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
      ease: [0.23, 1, 0.32, 1],
    },
  },
};

const accordionData = [
  {
    title: "Track Spending",
    description:
      "Get real-time insights into your expenses, organized by categories. Stay on top of where your money goes and keep your budget balanced.",
    src: "/images/track-spending.png",
  },
  {
    title: "Set Budgets & Goals",
    description:
      "Easily set custom budgets for different categories and plan savings goals. Minty helps you stay aligned with your financial aspirations.",
    src: "/images/budget-goals.png",
  },
  {
    title: "Monitor Your Progress",
    description:
      "Get instant visual feedback on your spending and savings. Minty’s dynamic charts and reports make it easy to adjust and stay on track.",
    src: "/images/monitor-progress.png",
  },
  {
    title: "Achieve Financial Success",
    description:
      "With all your data in one place, Minty empowers you to make smarter financial decisions and achieve your goals faster.",
    src: "/images/financial-success.png",
  },
];

const accordionImages = accordionData.reduce(
  (acc, item, index) => {
    acc[`item-${index}`] = item.src;
    return acc;
  },
  {} as Record<string, string>,
);

export const HowItWorksSection = () => {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const descriptionRef = useRef<HTMLDivElement | null>(null);

  const headerRef = useRef<HTMLDivElement | null>(null);
  const accordionRef = useRef<HTMLDivElement | null>(null);

  const headerInView = useInView(headerRef, { once: true, amount: 0.3 });
  const accordionInView = useInView(accordionRef, { once: true, amount: 0.1 });

  const handleAccordionClick = (itemValue: string, index: number) => {
    setSelectedItem(itemValue);
    setTimeout(() => {
      descriptionRef.current?.focus({ preventScroll: true });
    }, 100); // Give time for the content to expand before focusing
  };

  return (
    <section id="how-it-works" className="min-h-screen container pt-24">
      <motion.div
        ref={headerRef}
        className="space-y-5"
        variants={containerVariants}
        initial="hidden"
        animate={headerInView ? "visible" : "hidden"}
      >
        <motion.h3
          variants={itemVariants}
          className="tracking-wider uppercase text-purple-700 text-sm lg:text-lg"
        >
          How it works
        </motion.h3>
        <motion.div variants={itemVariants} className="overflow-hidden">
          <p className="text-xl md:text-2xl xl:text-4xl font-medium leading-relaxed max-w-6xl">
            Minty makes managing your finances simple. Just link your accounts,
            set your budget, and track your spending. Our smart insights help
            you stay on top of your goals, giving you a clear view of your
            income, expenses, and savings—all in one place.
          </p>
        </motion.div>
      </motion.div>
      <motion.div
        ref={accordionRef}
        variants={containerVariants}
        initial="hidden"
        animate={accordionInView ? "visible" : "hidden"}
        className="w-full my-20"
      >
        <HoverableAccordion
          type="single"
          className="w-full"
          images={accordionImages}
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
        >
          {accordionData.map((item, index) => (
            <AccordionItem
              className="group hover:bg-purple-100/30 py-7  transition-colors duration-300"
              value={`item-${index}`}
              key={item.title}
              onClick={() => handleAccordionClick(`item-${index}`, index)}
            >
              <AccordionTrigger>
                <div className="text-sm text-purple-700">{`0${index + 1}`}</div>
                <h4 className="text-xl lg:text-2xl group-hover:text-purple-700 transition-colors duration-300">
                  {item.title}
                </h4>
              </AccordionTrigger>
              <AccordionContent
                ref={selectedItem === `item-${index}` ? descriptionRef : null}
                tabIndex={-1}
              >
                <p className="text-muted-foreground text-base lg:text-lg px-2">
                  {item.description}
                </p>
                <AnimatePresence mode="wait">
                  {selectedItem === `item-${index}` &&
                    accordionImages[`item-${index}`] && (
                      <motion.div
                        key={`mobile-image-${index}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="mt-4 lg:hidden"
                      >
                        <Image
                          priority={true}
                          src={accordionImages[`item-${index}`]}
                          alt={`Image for ${item.title}`}
                          height={300}
                          width={500}
                          className="w-full h-auto"
                        />
                      </motion.div>
                    )}
                </AnimatePresence>
              </AccordionContent>
            </AccordionItem>
          ))}
        </HoverableAccordion>
      </motion.div>
    </section>
  );
};
