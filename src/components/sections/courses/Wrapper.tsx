import Section from "@/components/ui/Section";
import React from "react";
import Navigation from "./Navigation";
import MobileNav from "./MobileNav";
import CommunityNavigation from "./CommunityNavigation";

/**
 *  Wrapper component interface
 * @date 4/18/2023 - 12:22:26 PM
 *
 * @interface WrapperProps
 * @typedef {WrapperProps}
 */
interface WrapperProps {
  children: React.ReactNode;
}

/**
 * Wrapper component
 * @date 4/18/2023 - 12:22:49 PM
 *
 * @export
 * @param {WrapperProps} { children }
 * @returns {*}
 */
export default function Wrapper({ children }: WrapperProps) {
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
          {children}
        </div>
      </div>
    </Section>
  );
}
