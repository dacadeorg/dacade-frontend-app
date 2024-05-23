import Objectives from "@/components/sections/challenges/Objectives";
import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";
import { renderWithRedux } from "../../../../__mocks__/renderWithRedux";
import { challenge as mockChallenge, submission } from "../../../../__mocks__/challenge";
import DateManager from "@/utilities/DateManager";

describe("Objectives", () => {
  const challenge = mockChallenge();
  it("should render objectives", () => {
    renderWithRedux(<Objectives testId="objectiveId" />, { challenges: { current: mockChallenge(), list: [mockChallenge()], loading: false, submission: submission() } });
    const objectives = screen.getByTestId("objectiveId");
    expect(objectives).toBeInTheDocument();
    expect(screen.getByText("communities.overview.challenge.objective.title")).toBeInTheDocument();
  });

  it("should render the objective list", () => {
    renderWithRedux(<Objectives />, { challenges: { current: mockChallenge(), list: [mockChallenge()], loading: false, submission: submission() } });
    const objectiveValue = challenge.objectives.find((objective) => objective);
    expect(screen.getByText(objectiveValue || "objectives 1")).toBeInTheDocument();
  });

  it("should display expiry date", () => {
    renderWithRedux(<Objectives />, { challenges: { current: mockChallenge(), list: [mockChallenge()], loading: false, submission: submission() } });
    const expirationDate = challenge.expiresAt && DateManager.format(challenge.expiresAt, "MMMM d, yyyy", "en");
    if (expirationDate) {
      expect(screen.getByText(expirationDate)).toBeInTheDocument();
    }
  });

  it("should display challenge hint", () => {
    renderWithRedux(<Objectives />, { challenges: { current: mockChallenge(), list: [mockChallenge()], loading: false, submission: submission() } });
    const containsLink = new RegExp(/<a.*?>.*?<\/a>/g);
    expect(containsLink.test('<a href="http://example.com">Example</a>')).toBe(true); 
    expect(containsLink.test('This is a test string without a link.')).toBe(false);  
    expect(containsLink.test('<a href="http://example.com">Example')).toBe(false);  
    expect(containsLink.test('<a href="http://example.com"><a>Nested</a></a>')).toBe(true); 
    
    expect(containsLink.test('<div>Not a link</div>')).toBe(false);
    if (containsLink.test(challenge.hint as string)) {
        expect(screen.getByText(challenge.hint as string)).toBeInTheDocument();
    } else {
      expect(screen.getByText(challenge.hint)).toBeInTheDocument();
    }
  });
});