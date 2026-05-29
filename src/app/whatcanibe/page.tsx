import Hero from "@/components/sections/whatcanibe/Hero";
import EcosystemWheel from "@/components/sections/whatcanibe/EcosystemWheel";
import CareerCategories from "@/components/sections/whatcanibe/CareerCategories";
import Pathways from "@/components/sections/whatcanibe/Pathways";
import Methodology from "@/components/sections/whatcanibe/Methodology";
import Mentorship from "@/components/sections/whatcanibe/Mentorship";
import FinalCTA from "@/components/sections/whatcanibe/FinalCTA";

export default function WhatCanIBePage() {
  return (
    <>
      <Hero />
      <EcosystemWheel />
      <CareerCategories />
      <Pathways />
      <Methodology />
      <Mentorship />
      <FinalCTA />
    </>
  );
}
