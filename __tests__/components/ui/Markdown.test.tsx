import Markdown from "@/components/ui/Markdown";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import ReduxProvider from "../../../__mocks__/provider/ReduxProvider";

jest.mock("next/router", () => ({
  useRouter: () => ({
    push: jest.fn(),
    events: {
      on: jest.fn(),
      off: jest.fn(),
      emit: jest.fn(),
    },
    isFallback: false,
  }),
}));

describe("Markdown", () => {
  it("should render Markdown", () => {
    render(
      <ReduxProvider>
        <Markdown value="Markdown test" />
      </ReduxProvider>
    );

    const markdown = screen.queryByText("Markdown test");
    expect(markdown).toBeInTheDocument();
  });

  it("Should have the markdown styles passed as props", () => {
    const markdownStyle = "mark down style";
    render(
      <ReduxProvider>
        <Markdown value="Markdown test" markDownStyles={markdownStyle} />
      </ReduxProvider>
    );

    const markdown = screen.queryByText("Markdown test");
    expect(markdown?.className).toContain(markdownStyle);
  });
});
