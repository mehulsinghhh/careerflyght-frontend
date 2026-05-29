import Hero from "@/components/sections/whatcanibe/Hero";
import CareerCategories from "@/components/sections/whatcanibe/CareerCategories";
import Workflow from "@/components/sections/whatcanibe/Workflow";
import Pathways from "@/components/sections/whatcanibe/Pathways";
import Mentorship from "@/components/sections/whatcanibe/Mentorship";
import FinalCTA from "@/components/sections/whatcanibe/FinalCTA";

export default function WhatCanIBePage() {
  return (
    <>
      <Hero />
      <CareerCategories />
      <Workflow />
      <Mentorship />
      <Pathways />
      <FinalCTA />
    </>
  );
}
