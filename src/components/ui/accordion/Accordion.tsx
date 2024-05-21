import React, { useState } from "react";
import H3 from "@/components/ui/text/H3";
import ArrowDown from "@/icons/down-icon-arrow.svg";

interface AccordionProps {
  title: string;
  subtitle: React.ReactNode;
  content: React.ReactNode;
  isExpanded?: boolean;
  testId?: string;
  triggerTestId?: string;
  contentTestId?: string;
}

const Accordion: React.FC<AccordionProps> = ({
  title,
  subtitle,
  content,
  isExpanded = false,
  testId = "accordion",
  triggerTestId = "accordion-trigger",
  contentTestId = "accordion-content",
}) => {
  const [isAccordionExpanded, setIsAccordionExpanded] = useState<boolean>(isExpanded);

  const toggleAccordion = () => {
    setIsAccordionExpanded(!isAccordionExpanded);
  };

  return (
    <div data-testid={testId} className="mt-2">
      <div data-testid={triggerTestId} className={`flex gap-2 justify-between cursor-pointer ${!title && "items-start"}`} onClick={toggleAccordion}>
        <div>
          {title && <H3>{title}</H3>}
          {subtitle && isAccordionExpanded && subtitle}
        </div>
        <div className="pt-3">
          <ArrowDown className={`transform origin-center-top transition-transform ${isAccordionExpanded ? "rotate-180" : ""}`} />
        </div>
      </div>
      {isAccordionExpanded && <div data-testid={contentTestId}>{content}</div>}
    </div>
  );
};

export default Accordion;
