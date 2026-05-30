import Hero from "@/components/sections/whatcanibe/Hero";
import AboutUs from "@/components/sections/whatcanibe/AboutUs";
import CareerCategories from "@/components/sections/whatcanibe/CareerCategories";
import Workflow from "@/components/sections/whatcanibe/Workflow";
import Mentorship from "@/components/sections/whatcanibe/Mentorship";
import Pathways from "@/components/sections/whatcanibe/Pathways";
import FinalCTA from "@/components/sections/whatcanibe/FinalCTA";

export default function WhatCanIBePage() {
  return (
    <>
      <Hero />
      <AboutUs />
      <CareerCategories />
      <Workflow />
      <Mentorship />
      <Pathways />
      <FinalCTA />
    </>
  );
}
