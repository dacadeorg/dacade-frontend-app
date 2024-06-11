import "@testing-library/jest-dom";
import AllComponents from "@/components/sections/courses/overview/index";
import RewardsSection from "@/components/sections/courses/overview/index";
import ObjectivesSection from "@/components/sections/courses/overview/index";
import PrerequisiteSection from "@/components/sections/courses/overview/index";
import DisclaimerSection from "@/components/sections/courses/overview/index";
import TrailerSection from "@/components/sections/courses/overview/index";
import LearningModulesSection from "@/components/sections/courses/overview/index";
import ChallengeSection from "@/components/sections/courses/overview/index";
import PageNavigation from "@/components/sections/courses/overview/index";
import Header from "@/components/sections/courses/overview/index";

import { mockCourse } from "../../../../../__mocks__/course";

import { render, screen } from "@testing-library/react";


interface HeaderProps {
  title: "string";
  description: "string";
}

const RenderHeader = (props?: HeaderProps) => {
  render(<Header {...props} title={[mockCourse.name]} description={[mockCourse.description]}/>);
  return screen.getByTestId("headerId");
};


describe("All Components", () => {

  it("should render the Disclaimer", () => {
    render( <AllComponents />);
    const disclaimerComponent = screen.getByTestId("disclaimerId");
    expect(disclaimerComponent).toBeInTheDocument();
  });


  it("should render Header with title and description", () => {
    const headerContent = RenderHeader();
    expect(headerContent).toBeInTheDocument();
    expect(headerContent).toBeInTheDocument();

    
  });

  it("should render RewardsSection in the index component", () => {
    render( <RewardsSection />);
    const rewardsSection = screen.getByTestId("rewardsSectionId");
    expect(rewardsSection).toBeInTheDocument();
  });


  it("should render ObjectivesSection in the index component", () => {
    render( <ObjectivesSection />);
    const objectivesSection = screen.getByTestId("objectivesSectionId");
    expect(objectivesSection).toBeInTheDocument();
  });

  it("should render PrerequisiteSection in the index component", () => {
    render( <PrerequisiteSection />);
    const prerequisiteSection = screen.getByTestId("prerequisiteSectionId");
    expect(prerequisiteSection).toBeInTheDocument();
  });

  it("should render DisclaimerSection in the index component", () => {
    render( <DisclaimerSection />);
    const disclaimerSection = screen.getByTestId("disclaimerSectionId");
    expect(disclaimerSection).toBeInTheDocument();
  });

  it("should render TrailerSection in the index component", () => {
    render( <TrailerSection />);
    const trailerSection = screen.getByTestId("trailerSectionId");
    expect(trailerSection).toBeInTheDocument();
  });

  it("should render LearningModulesSection in the index component", () => {
    render( <LearningModulesSection />);
    const learningModulesSection = screen.getByTestId("");
    expect(learningModulesSection ).toBeInTheDocument();
  });

  it("should render ChallengeSection in the index component", () => {
    render( <ChallengeSection />);
    const challengeSection = screen.getByTestId("challengeSectionId");
    expect(challengeSection).toBeInTheDocument();
  });

  it("should render PageNavigation in the index component", () => {
    render( <PageNavigation />);
    const pageNavigation = screen.getByTestId("pageNavigationId");
    expect(pageNavigation).toBeInTheDocument();
  });
});