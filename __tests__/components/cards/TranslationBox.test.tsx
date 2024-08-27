import "@testing-library/jest-dom";
import { fireEvent, screen, waitFor } from "@testing-library/react";
import TranslationBox from "@/components/cards/TranslationBox";
import { renderWithRedux } from "../../../__mocks__/renderWithRedux";
import { Translate } from "@/utilities/Translate";

jest.mock("next/router", () => ({
  useRouter() {
    return {
      route: "/",
      pathname: "",
      query: "",
      locale: "hr",
    };
  },
}));

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

jest.mock("../../../src/utilities/Translate", () => ({
  Translate: jest.fn(),
}));

beforeEach(() => {
  jest.clearAllMocks();
});

describe("TranslationBOX", () => {
  const mockTranslate = Translate as jest.Mock;
  it("should render the componet", () => {
    renderWithRedux(<TranslationBox text="test text" defaultLocale="en" />);
    expect(screen.getByText("test text")).toBeInTheDocument();
  });

  it("should show loading state during translation", async () => {
    renderWithRedux(<TranslationBox text="test text" defaultLocale="en" />);
    fireEvent.click(await screen.findByRole("button", { name: "Click me" }));
    expect(Translate).toHaveBeenCalled();
    expect(screen.getByText("Translating...")).toBeInTheDocument();
  });

  it("Should translate the text when translate button is clicked", async () => {
    mockTranslate.mockResolvedValue('Translated Text');
    renderWithRedux(<TranslationBox text="test text" defaultLocale="en" />);
    expect(screen.getByText("test text")).toBeInTheDocument();
    fireEvent.click(await screen.findByRole("button", { name: "Click me" }));
    expect(screen.getByText("Translating...")).toBeInTheDocument();
    await waitFor(()=>  expect(screen.queryByText("Translating...")).toBe(null))
    expect(Translate).toHaveBeenCalled();
    expect(screen.getByText("Translated Text")).toBeInTheDocument();
    
  });
  it("should automatically translate when currentLocale is different from defaultLocale", async () => {
    mockTranslate.mockResolvedValue("Translated Text");
    renderWithRedux(<TranslationBox text="test text" defaultLocale="en" />);
    await waitFor(() => expect(Translate).toHaveBeenCalled());
    expect(screen.getByText("Translated Text")).toBeInTheDocument();
  });
  it("should not show translation options when disabled prop is true", () => {
    renderWithRedux(<TranslationBox text="test text" defaultLocale="en" disabled={true} />);
    expect(screen.queryByText("ui.translate")).not.toBeInTheDocument();
  });

   it("should revert the text back to its original language when revert is clicked", async () => {
     mockTranslate.mockResolvedValue("Hallo");
     renderWithRedux(<TranslationBox text="Hello" defaultLocale="en" />);

     await waitFor(() => expect(screen.getByText("Hallo")).toBeInTheDocument());

     fireEvent.click(screen.getByText("ui.translation.action.original English"));
     expect(screen.getByText("Hello")).toBeInTheDocument();
   });
});
