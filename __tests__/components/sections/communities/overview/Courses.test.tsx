import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";
import { CoursesOverview } from "@/components/sections/communities/overview/Courses";
import { renderWithRedux } from "../../../../../__mocks__/renderWithRedux";

jest.mock("next/router", () => ({
    useRouter: () => ({
      push: jest.fn(),
      events: {
        on: jest.fn(),
        off: jest.fn(),
        emit: jest.fn(),
      },
    }),
  }));

  describe("CoursesOverview", () => {
    it("renders the courses overview section with course cards", () => {
       
      renderWithRedux(
        <CoursesOverview/>
      );
      expect(screen.getByText("communities.overview.courses.title")).toBeInTheDocument();
      expect(screen.getByText("communities.overview.courses.description")).toBeInTheDocument();
  
    });
  
  });