import Hero from "@/components/sections/whatcanibe/Hero";
import AnimatedStats from "@/components/sections/whatcanibe/AnimatedStats";
import CareerCategories from "@/components/sections/whatcanibe/CareerCategories";
import HowItWorks from "@/components/sections/whatcanibe/HowItWorks";
import Pathways from "@/components/sections/whatcanibe/Pathways";
import Mentorship from "@/components/sections/whatcanibe/Mentorship";
import FinalCTA from "@/components/sections/whatcanibe/FinalCTA";

export default function WhatCanIBePage() {
  return (
    <>
      <Hero />
      <AnimatedStats />
      <HowItWorks />
      <CareerCategories />
      <Pathways />
      <Mentorship />
      <FinalCTA />
    </>
  );
}
