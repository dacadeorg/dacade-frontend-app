import { ReactNode } from "react";
import MainHeaderSection from "@/components/sections/communities/overview/MainHeader";
import CommunitySidebar from "@/components/sections/communities/overview/Sidebar";
import Section from "@/components/ui/Section";

/**
 * @interface WrapperProps - Wrapper component properties
 * @property {ReactNode} children - The content to be displayed in the Wrapper component.
 * @property {ReactNode} [filter] - Optional filter component to be displayed in the Wrapper component.
 */
interface WrapperProps {
  children: ReactNode;
  filter?: ReactNode;
}

/**
 * Wrapper component to provide a layout for children and filter props.
 * @param {WrapperProps} props - The properties to configure the Wrapper component.
 * @returns {JSX.Element} A styled Wrapper component containing a MainHeaderSection, CommunitySidebar, 
 * optional filter component, and children content.
 */
export default function Wrapper({ children, filter }: WrapperProps): JSX.Element {
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
