"use client";
import { buttonVariants } from "@/components/ui/button";
import { WordPullUp } from "@/components/word-pull-up-anim";
import { cn } from "@/lib/utils";
import { motion, useInView } from "framer-motion";
import { Github } from "lucide-react";
import { useRef } from "react";

export const OpenSourceSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true });
  return (
    <section ref={sectionRef} className="container min-h-[50vh] pt-24">
      <motion.div
        className="flex flex-col items-center"
        initial={false}
        animate={{ y: isInView ? 0 : 10, opacity: isInView ? 1 : 0 }}
        transition={{ delay: 0.5, duration: 0.75, ease: "easeIn" }}
      >
        <WordPullUp className="text-center">Proudly Open Source</WordPullUp>
        <p className="max-w-xl text-center text-lg leading-relaxed text-muted-foreground">
          Our source code is available on GitHub - feel free to read, review, or
          contribute to it however you want!
        </p>
        <a
          href="https://github.com/subhamBharadwaz/scribbly"
          className={cn(
            buttonVariants({ size: "lg" }),
            "text- cursor-pointer mt-4 gap-x-3 bg-github-gradient text-white transition-shadow duration-300  hover:shadow-[0px_4px_30px] hover:shadow-[rgb(55_65_81_/_50%)]",
          )}
          target="_blank"
          rel="noreferrer"
        >
          <Github className="h-5 w-5 text-background text-white" /> View on
          Github
        </a>
      </motion.div>
    </section>
  );
};
