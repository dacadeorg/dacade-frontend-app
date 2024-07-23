import UserCard from "@/components/cards/User";
import { renderWithRedux } from "@__mocks__/renderWithRedux";
import { mockUser } from "@__mocks__/fixtures/user";
import { fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

jest.mock("next/router", () => ({
  useRouter: jest.fn(() => ({
    locale: "en",
    push: mockPush,
  })),
}));
const teamMembers = [mockUser];
const handleClick = jest.fn(() => {});
const mockPush = jest.fn();

describe("User card component", () => {
  const timestamp = {
    date: new Date(),
    text: "",
  };
  beforeEach(() => {
    renderWithRedux(
      <UserCard user={mockUser} timestamp={timestamp} teamMembers={teamMembers} onClick={handleClick} link="/testlink">
        <div>test link</div>
      </UserCard>
    );
  });
  // Mock window.getSelection
  window.getSelection = jest.fn().mockReturnValue({
    type: "Caret",
  });
  it("Renders the card component", () => {
    expect(screen.getByTestId("userId")).toBeInTheDocument();
    expect(screen.getAllByTestId("avatar").length).toEqual(teamMembers.length);
    const linkElements = screen.getAllByRole("link");
    linkElements.forEach((element, index) => {
      if (teamMembers[index]) {
        const expectedHref = `/profile/${teamMembers[index].username}`;
        expect(element).toHaveAttribute("href", expectedHref);
      }
    });
  });

  it("Renders the correct tag and currecy when teamMembers is not empty", () => {
    expect(screen.getByTestId("currencyId")).toBeInTheDocument();
    expect(screen.getByTestId("tag")).toBeInTheDocument();
  });

  it("Calls onClick prop when clicked", () => {
    fireEvent.click(screen.getByTestId("userId"));
    expect(handleClick).toHaveBeenCalled();
  });
  it("Navigates to the correct link when clicked", () => {
    const element = screen.getByText("test link");
    fireEvent.click(element);
    expect(mockPush).toHaveBeenCalledWith("/testlink");
  });
});
