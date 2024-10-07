import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface HoverableAccordionProps {
  type: "single" | "multiple";
  className?: string;
  children: React.ReactNode;
  images: { [key: string]: string };
  selectedItem: string | null;
  setSelectedItem: Dispatch<SetStateAction<string | null>>;
}

const HoverableAccordion: React.FC<HoverableAccordionProps> = ({
  type,
  className,
  children,
  images,
  selectedItem,
  setSelectedItem,
}) => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  // Set the first item as selected by default
  useEffect(() => {
    if (!selectedItem && React.Children.toArray(children)[0]) {
      const firstItemValue = (
        React.Children.toArray(children)[0] as React.ReactElement
      ).props.value;
      setSelectedItem(firstItemValue);
    }
  }, [children, selectedItem, setSelectedItem]);

  const handleValueChange = (value: string | string[]) => {
    const newValue = Array.isArray(value) ? value[0] : value;
    if (newValue !== selectedItem) {
      setSelectedItem(newValue);
    }
  };

  return (
    <div className="w-full flex flex-col lg:flex-row lg:justify-between lg:space-x-8">
      <Accordion
        type="single"
        className={cn(className, "w-full lg:w-2/5")}
        value={selectedItem || undefined}
        onValueChange={handleValueChange}
      >
        {React.Children.map(children, (child, index) => {
          if (React.isValidElement(child) && child.type === AccordionItem) {
            const itemValue = child.props.value;
            const isHoveredOrSelected =
              hoveredItem === itemValue || selectedItem === itemValue;
            return (
              <div className="relative">
                <div
                  onMouseEnter={() => setHoveredItem(itemValue)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  {React.cloneElement(child, {
                    //@ts-ignore
                    children: React.Children.map(
                      child.props.children,
                      (grandChild) => {
                        if (
                          React.isValidElement(grandChild) &&
                          grandChild.type === AccordionTrigger
                        ) {
                          return React.cloneElement(grandChild, {
                            //@ts-ignore
                            children: (
                              <div className="flex items-center justify-between w-full">
                                {/* @ts-ignore */}
                                {grandChild.props.children}
                                <AnimatePresence>
                                  {isHoveredOrSelected && (
                                    <motion.div
                                      initial={{ opacity: 0, x: -5 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      exit={{ opacity: 0, x: -5 }}
                                    >
                                      <ArrowRightIcon className="h-4 w-4 shrink-0 text-violet-800" />
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </div>
                            ),
                          });
                        }
                        return grandChild;
                      },
                    ),
                  })}
                </div>
              </div>
            );
          }
          return child;
        })}
      </Accordion>
      {/* Desktop image */}
      <AnimatePresence mode="wait">
        {selectedItem && images[selectedItem] && (
          <motion.div
            key={`desktop-${selectedItem}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="hidden my-20 lg:block lg:w-1/2 lg:ml-8"
          >
            <Image
              priority
              src={images[selectedItem]}
              alt={`Image for ${selectedItem}`}
              className="w-full"
              width={550}
              height={150}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HoverableAccordion;
