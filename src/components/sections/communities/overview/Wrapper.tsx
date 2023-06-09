import React from "react";
import MainHeaderSection from '@/components/sections/communities/overview/MainHeader'
import CommunitySidebar from '@/components/sections/communities/overview/Sidebar'
import Section from '@/components/ui/Section'
interface WrapperProps {
  // Define your component props here
}

const Wrapper: React.FC<WrapperProps> = ({}) => {
  // Implement your component logic here

  return (
    <div className="relative">
    <MainHeaderSection />
    <Section>
      <div className="w-full md:flex gap-36 mx-auto mt-14">
        <div className="md:w-4/12">
          <CommunitySidebar />
          <slot name="sidebar" />
        </div>
        <div className="md:w-2/3">
          <slot />
        </div>
      </div>
    </Section>
  </div>
  );
};

export default Wrapper;