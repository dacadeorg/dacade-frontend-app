import Section from "@/components/ui/Section";
import React from "react";
import Navigation from "./Navigation";
import MobileNav from "./MobileNav";
import CommunityNavigation from "./CommunityNavigation";

export default function Wrapper() {
  return (
    <Section>
      <div className="lg:flex h-auto">
        <div className="hidden lg:block sticky top-0 self-start w-1/4 py-3 pr-9 lg:py-14">
          <Navigation />
        </div>
        <div className="lg:hidden pt-8 pb-0 w-full lg:py-14">
          <MobileNav showTopBorder />
        </div>
        <div className="w-full lg:w-3/4">
          <CommunityNavigation />
          <slot />
        </div>
      </div>
    </Section>
  );
}
