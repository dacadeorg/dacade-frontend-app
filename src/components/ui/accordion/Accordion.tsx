import React, { useState } from "react";
import H3 from "@/components/ui/text/H3";
import ArrowDown from "@/icons/down-icon-arrow.svg";

interface AccordionProps {
  title: string;
  content: React.ReactNode;
  isExpanded?: boolean;
}

const Accordion: React.FC<AccordionProps> = ({ title, content, isExpanded = false }) => {
  const [isAccordionExpanded, setIsAccordionExpanded] = useState<boolean>(isExpanded);

  const toggleAccordion = () => {
    setIsAccordionExpanded(!isAccordionExpanded);
  };

  return (
    <div className="mt-2">
      <div className="flex items-center justify-between cursor-pointer" onClick={toggleAccordion}>
        <H3>{title}</H3>
        <ArrowDown className={`transform origin-center-top transition-transform ${
            isAccordionExpanded ? "rotate-180" : ""
          }`} />
      </div>
      {isAccordionExpanded && <div>{content}</div>}
    </div>
  );
};

export default Accordion;
