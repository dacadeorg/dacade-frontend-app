import Accordion from "@/components/ui/accordion/Accordion";
import "@testing-library/jest-dom";
import { render, screen, act, fireEvent } from "@testing-library/react";
import React from "react";

describe("Accordion", () => {
  it("should render accordion", () => {
    render(<Accordion title="accordion" subtitle="accodion subtitle" content="Accordion content" />);
    const accordion = screen.getByTestId("accordion");
    expect(accordion).toBeInTheDocument();
  });

  it("Should show accordion content when expendeded", () => {
    render(<Accordion title="accordion" subtitle="accodion subtitle" isExpanded={true} content="Accordion content" />);
    const accordionContent = screen.getByTestId("accordion-content");
    expect(accordionContent).toBeInTheDocument();
    expect(accordionContent.textContent).toBe("Accordion content");
  });

  it("Should not show accordion content when not expended", () => {
    render(<Accordion title="accordion" subtitle="accodion subtitle" content="Accordion content" />);
    const accordion = screen.getByTestId("accordion");
    const accordionContent = accordion.querySelector("[data-testid=accordion-content]");
    expect(accordionContent).toBeNull();
  });

  it("Should toggle accordion content when trigger is clicked", () => {
    render(<Accordion title="accordion" subtitle="accordion-title" content="Accordion content" />);
    const accordionTrigger = screen.getByTestId("accordion-trigger");
    const accordion = screen.getByTestId("accordion");
    act(() => fireEvent.click(accordionTrigger));
    const accordionContent = screen.getByTestId("accordion-content");

    expect(accordionTrigger).toBeInTheDocument();
    expect(accordionContent).toBeInTheDocument();
    expect(accordionContent.textContent).toBe("Accordion content");

    act(() => fireEvent.click(accordionTrigger));
    const newAccordionContent = accordion.querySelector("[data-testid=accordion-content]");
    expect(newAccordionContent).toBeNull();
  });
});
