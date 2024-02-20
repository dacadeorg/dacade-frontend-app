import GithubLinkInput from "@/components/ui/GithubLinkInput";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("GithuLinkInput", () => {
  it("should render the github link input with a label", () => {
    render(<GithubLinkInput label="test Label" disabled />);
    const ghlinkinput = screen.getByText("test Label");
    expect(ghlinkinput).toBeInTheDocument();
  });

  it("should disable the input", () => {
    render(<GithubLinkInput disabled />);
    const input = screen.getByTestId("githubLinkInput-textbox");
    expect(input).toBeDisabled();
  });

  it("should render the input type to be a of a given type", () => {
    render(<GithubLinkInput type="password" />);
    const input = screen.getByTestId("githubLinkInput-textbox");
    expect(input).toHaveAttribute("type", "password");
  });

  it("should hande input", () => {
    const handleInput = jest.fn();
    render(<GithubLinkInput handleInput={handleInput} />);
    const input = screen.getByTestId("githubLinkInput-textbox");
    fireEvent.input(input, { target: { value: "test value" } });
    expect(handleInput).toHaveBeenCalled();
  });
});
