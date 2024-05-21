import GithubLinkInput from "@/components/ui/GithubLinkInput";
import "@testing-library/jest-dom";
import { act, fireEvent, render, screen } from "@testing-library/react";

describe("GithubLinkInput component", () => {
  it("should render the github link input", () => {
    render(<GithubLinkInput />);
    const githubLinkInput = screen.getByTestId("githubLinkInput");
    expect(githubLinkInput).toBeInTheDocument();
  });

  it("should render the icon", () => {
    render(<GithubLinkInput />);
    const githubLinkInput = screen.getByTestId("githubIcon");
    expect(githubLinkInput).toBeInTheDocument();
  });

  it("should render the label", () => {
    render(<GithubLinkInput label="Github link label" />);
    const githubLinkInput = screen.getByText("Github link label");
    expect(githubLinkInput).toBeInTheDocument();
  });

  it("Should have the text attribute", () => {
    render(<GithubLinkInput type="text" />);
    const githubInput = screen.getByTestId("githubInput");
    expect(githubInput).toHaveAttribute("type", "text");
  });

  it("Should display error message", () => {
    render(<GithubLinkInput error="This field is required" />);
    const errorMessage = screen.getByText("This field is required");
    expect(errorMessage).toBeInTheDocument();
  });

  it("Should disable input field", () => {
    render(<GithubLinkInput placeholder="Enter your github username" disabled />);
    const inputElement = screen.getByPlaceholderText("Enter your github username");
    expect(inputElement).toBeDisabled();
  });

  it("should handle input change", () => {
    const handleInput = jest.fn();
    render(<GithubLinkInput placeholder="Enter your GitHub link" handleInput={handleInput} />);
    const githubInput = screen.getByPlaceholderText("Enter your GitHub link");
    act(() => {
      fireEvent.change(githubInput, { target: { value: "https://github.com/user/repo" } });
    });
    expect(githubInput).toHaveDisplayValue("https://github.com/user/repo");
  });
});
