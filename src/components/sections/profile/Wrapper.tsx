import Section from "@/components/ui/Section";
import { ReactElement, ReactNode } from "react";
import ProfileHeader from "./Header";
import ProfileNagivation from "./Navigation";

/**
 * Profile wrapper interface props
 */
interface ProfileWrapperProps {
  children: ReactNode;
}

/**
 * Profile wrapper component
 * @returns {ReactElement}
 */
export default function ProfileWrapper({ children }: ProfileWrapperProps): ReactElement {
  return (
    <Section padding="py-12">
      <ProfileHeader />
      <div className="lg:flex relative">
        <div className="lg:w-1/4 relative">
          <div className="sticky top-0">
            <ProfileNagivation />
          </div>
        </div>
        <div className="lg:w-3/5 relative">{children}</div>
      </div>
    </Section>
  );
}
