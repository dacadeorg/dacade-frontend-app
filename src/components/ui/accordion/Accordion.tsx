import React, { useState } from "react";
import H3 from "@/components/ui/text/H3";
import ArrowDown from "@/icons/down-icon-arrow.svg";

interface AccordionProps {
  title: string;
  subtitle: React.ReactNode;
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
      <div className={`flex gap-2 justify-between cursor-pointer ${!title && "items-start"}`} onClick={toggleAccordion}>
        <div>
          {title && <H3>{title}</H3>}
          {subtitle && isAccordionExpanded && subtitle}
        </div>
        <div className="pt-3">
          <ArrowDown className={`transform origin-center-top transition-transform ${isAccordionExpanded ? "rotate-180" : ""}`} />
        </div>
      </div>
      {isAccordionExpanded && <div>{content}</div>}
    </div>
  );
};

export default Accordion;
