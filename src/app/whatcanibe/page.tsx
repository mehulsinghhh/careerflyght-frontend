import Hero from "@/components/sections/whatcanibe/Hero";
import CareerCategories from "@/components/sections/whatcanibe/CareerCategories";
import EcosystemWheel from "@/components/sections/whatcanibe/EcosystemWheel";
import Pathways from "@/components/sections/whatcanibe/Pathways";
import AboutMethodology from "@/components/sections/whatcanibe/AboutMethodology";
import Mentorship from "@/components/sections/whatcanibe/Mentorship";
import FinalCTA from "@/components/sections/whatcanibe/FinalCTA";

export default function WhatCanIBePage() {
  return (
    <>
      <Hero />
      <EcosystemWheel />
      <CareerCategories />
      <Pathways />
      <AboutMethodology />
      <Mentorship />
      <FinalCTA />
    </>
  );
}
