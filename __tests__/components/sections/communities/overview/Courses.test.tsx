import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";
import { CoursesOverview } from "@/components/sections/communities/overview/Courses";
import { renderWithRedux } from "@__mocks__/renderWithRedux";
import { mockCourse } from "@__mocks__/course";
import { mockCommunity } from "@__mocks__/community";

describe("CoursesOverview", () => {
  it("renders the courses overview section with course cards", () => {
    renderWithRedux(<CoursesOverview />, {
      courses: { current: mockCourse, list: [mockCourse], content: mockCourse.community, count: 1, menus: [] },
      community: { current: mockCommunity, list: [mockCommunity], courses: [mockCourse], status: "succeeded", error: "" },
    });
    expect(screen.getByText("communities.overview.courses.title")).toBeInTheDocument();
    [mockCourse].forEach((course) => {
      const courseElement = screen.getByText(course.name);
      expect(courseElement).toBeInTheDocument();
      expect(courseElement.textContent).toBe(course.name);
    });
  });
});
