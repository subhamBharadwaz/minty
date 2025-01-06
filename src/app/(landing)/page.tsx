import { HowItWorksSection } from "./_components/sections/how-it-works";
import { landingConfig } from "@/config/landing";
import { currentUser } from "@clerk/nextjs/server";
import HomeNav from "./_components/nav-menu";
import { WhyMintySection } from "./_components/sections/why-minty";
import { PricingSection } from "./_components/sections/pricing";
import { OpenSourceSection } from "./_components/sections/open-source";
import Footer from "@/components/footer";
import { redirect } from "next/navigation";
import HeroSection from "./_components/sections/hero";

export default async function Home() {
  const user = await currentUser();

  if (user) redirect("/dashboard");
  return (
    <>
      <div className="min-h-screen relative">
        <div className="absolute inset-2 bottom-0 rounded-3xl ring-1 ring-inset ring-black/5 bg-[linear-gradient(115deg,var(--tw-gradient-stops))] from-[#6ee7b7] from-[28%] via-[#818cf8] via-[70%] to-[#3b82f6] sm:bg-[linear-gradient(145deg,var(--tw-gradient-stops))]" />
        <div className="relative px-6 lg:px-8 container">
          <HomeNav items={landingConfig} />
          <HeroSection />
        </div>
      </div>
      <HowItWorksSection />
      <WhyMintySection />
      <PricingSection />
      <OpenSourceSection />
      <Footer />
    </>
  );
}
