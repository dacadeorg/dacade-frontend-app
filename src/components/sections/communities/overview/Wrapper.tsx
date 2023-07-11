import { ReactNode } from "react";
import MainHeaderSection from "@/components/sections/communities/overview/MainHeader";
import CommunitySidebar from "@/components/sections/communities/overview/Sidebar";
import Section from "@/components/ui/Section";
interface WrapperProps {
  children: ReactNode;
  filter?: ReactNode;
}

const Wrapper: React.FC<WrapperProps> = ({ children, filter }) => {
  // Implement your component logic here

  return (
    <div className="relative">
      <MainHeaderSection />
      <Section>
        <div className="w-full md:flex gap-36 mx-auto mt-14">
          <div className="md:w-4/12">
            <CommunitySidebar />
            {filter}
          </div>
          <div className="md:w-2/3">{children}</div>
        </div>
      </Section>
    </div>
  );
};

export default Wrapper;
