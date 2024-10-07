"use client";

import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import HoverableAccordion from "../hoverable-accordion";
import { useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

const accordionData = [
  {
    title: "Connect Your Accounts",
    description:
      "Effortlessly link your bank accounts to Minty in seconds. Our secure system automatically pulls your transaction data, so you never miss a detail.",
    src: "/images/1.jpg",
  },
  {
    title: "Track Spending",
    description:
      "Get real-time insights into your expenses, organized by categories. Stay on top of where your money goes and keep your budget balanced.",
    src: "/images/2.jpg",
  },
  {
    title: "Set Budgets & Goals",
    description:
      "Easily set custom budgets for different categories and plan savings goals. Minty helps you stay aligned with your financial aspirations.",
    src: "/images/3.jpg",
  },
  {
    title: "Monitor Your Progress",
    description:
      "Get instant visual feedback on your spending and savings. Minty’s dynamic charts and reports make it easy to adjust and stay on track.",
    src: "/images/4.jpg",
  },
  {
    title: "Achieve Financial Success",
    description:
      "With all your data in one place, Minty empowers you to make smarter financial decisions and achieve your goals faster.",
    src: "/images/5.jpg",
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

  const handleAccordionClick = (itemValue: string, index: number) => {
    setSelectedItem(itemValue);
    setTimeout(() => {
      descriptionRef.current?.focus({ preventScroll: true });
    }, 100); // Give time for the content to expand before focusing
  };

  return (
    <section className="min-h-screen container py-24">
      <motion.div
        className="space-y-5"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeIn" }}
      >
        <h3 className="tracking-wider uppercase text-purple-700 text-lg">
          How it works
        </h3>
        <div className="overflow-hidden">
          <p className="text-4xl font-medium leading-tight max-w-6xl">
            Minty makes managing your finances simple. Just link your accounts,
            set your budget, and track your spending. Our smart insights help
            you stay on top of your goals, giving you a clear view of your
            income, expenses, and savings—all in one place.
          </p>
        </div>
      </motion.div>

      <HoverableAccordion
        type="single"
        className="w-full my-20"
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
              <div className="px-2">
                <span className="mr-5 text-sm text-purple-700">{`0${index + 1}`}</span>
                <span className="text-2xl group-hover:text-purple-700 transition-colors duration-300">
                  {item.title}
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent
              ref={selectedItem === `item-${index}` ? descriptionRef : null}
              tabIndex={-1}
            >
              <p className="text-muted-foreground text-lg px-2">
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
    </section>
  );
};
