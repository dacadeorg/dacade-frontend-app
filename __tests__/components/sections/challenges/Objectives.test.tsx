import Objectives from "@/components/sections/challenges/Objectives";
import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";
import { renderWithRedux } from "../../../../__mocks__/renderWithRedux";
import DateManager from "@/utilities/DateManager";
import { challenge, submission } from "@__mocks__/fixtures/challenge";

describe("Objectives", () => {
  const challenges = challenge;
  const submissions = submission;
  const mockObjectivesStates = { challenges: { current: challenges, list: [challenges], loading: false, submission: submissions } };
  it("should render objectives", () => {
    renderWithRedux(<Objectives testId="objectiveId" />);
    expect(screen.getByTestId("objectiveId")).toBeInTheDocument();
    expect(screen.getByText("communities.overview.challenge.objective.title")).toBeInTheDocument();
  });

  it("should render the objective list", () => {
    renderWithRedux(<Objectives />, mockObjectivesStates);
    const objectiveValue = challenge.objectives.find((objective) => objective);
    expect(screen.getByText(objectiveValue || "objectives 1")).toBeInTheDocument();
  });

  it("should display expiry date", () => {
    renderWithRedux(<Objectives />, mockObjectivesStates);
    const expirationDate = challenge.expiresAt && DateManager.format(challenge.expiresAt, "MMMM d, yyyy", "en");
    if (expirationDate) {
      const expirationDateElement = screen.getByText(expirationDate);
      expect(expirationDateElement).toBeInTheDocument();
      expect(expirationDateElement).toHaveTextContent(expirationDate);
    }
  });

  it("should display challenge hint", () => {
    renderWithRedux(<Objectives />, { challenges: { current: challenges, list: [challenges], loading: false, submission: submissions } });
    const containsLink = new RegExp(/<a.*?>.*?<\/a>/g);
    expect(containsLink.test('<a href="http://example.com">Example</a>')).toBe(true);
    expect(containsLink.test("This is a test string without a link.")).toBe(false);
    expect(containsLink.test('<a href="http://example.com">Example')).toBe(false);
    expect(containsLink.test('<a href="http://example.com"><a>Nested</a></a>')).toBe(true);

    expect(containsLink.test("<div>Not a link</div>")).toBe(false);
    if (containsLink.test(challenge.hint as string)) {
      expect(screen.getByText(challenge.hint as string)).toBeInTheDocument();
    } else {
      expect(screen.getByText(challenge.hint)).toBeInTheDocument();
    }
  });
});
