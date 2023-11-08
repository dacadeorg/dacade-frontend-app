import React, { useState } from "react";
import H3 from "@/components/ui/text/H3";
import ArrowDown from "@/icons/down-icon-arrow.svg";

interface AccordionProps {
  title: string;
  subtitle: React.ReactNode; // Add subtitle prop
  content: React.ReactNode;
  isExpanded?: boolean;
}

const Accordion: React.FC<AccordionProps> = ({ title, subtitle, content, isExpanded = false }) => {
  const [isAccordionExpanded, setIsAccordionExpanded] = useState<boolean>(isExpanded);

  const toggleAccordion = () => {
    setIsAccordionExpanded(!isAccordionExpanded);
  };

  return (
    <div className="mt-2">
      <div className= {`flex justify-between cursor-pointer ${!title && "items-center"}`} onClick={toggleAccordion}>
        <div>
          {title && <H3>{title}</H3>}
          {subtitle && subtitle} {/* Render the subtitle */}
        </div>
        <ArrowDown className={`transform origin-center-top transition-transform ${isAccordionExpanded ? "rotate-180" : ""}`} />
      </div>
      {isAccordionExpanded && <div>{content}</div>}
    </div>
  );
};

export default Accordion;
