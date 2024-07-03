import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";
import TranslationBox from "@/components/cards/TranslationBox";
import { renderWithRedux } from "../../../__mocks__/renderWithRedux";
// import { Translate } from "@/utilities/Translate";

jest.mock("next/router", () => ({
  useRouter() {
    return {
      route: "/",
      pathname: "",
      query: "",
      locale: "",
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

// jest.mock('../../../src/components/cards/TranslationBox', ()=>{
// getLocaleName: jest.fn(()=>'English')
// })

// // const getLocaleNameMock = jest.fn(()=>{
// //     'English'
// // )

describe("TranslationBOX", () => {
  it("should render the componet", () => {
    renderWithRedux(<TranslationBox text="test text" defaultLocale="en" />);
    expect(screen.getByText("test text")).toBeInTheDocument();
  });

//   it("should show loading state during translation", async () => {
//     renderWithRedux(<TranslationBox text="test text" defaultLocale="en" />);
//     fireEvent.click(await screen.findByText(/^ui.translated/));
//     expect(Translate).toHaveBeenCalled();
//     expect(screen.getByText("Translating...")).toBeInTheDocument();
//   });


});
