import ConfirmTeamInvitation from "@/components/cards/challenge/ConfirmTeamInvitation";
import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";
import { renderWithRedux } from "@__mocks__/renderWithRedux";
import { useDispatch, AppDispatch } from "@/hooks/useTypedDispatch";
import { mockConfirmTeamInvitation } from "@__mocks__/fixtures/confirmTeamInvitation";

jest.mock("@/hooks/useTypedDispatch.ts", () => ({
  useDispatch: jest.fn(),
}));

jest.mock("next/router", () => ({
  useRouter: () => ({
    push: jest.fn(),
    events: {
      on: jest.fn(),
      off: jest.fn(),
      emit: jest.fn(),
    },
    isFallback: false,
    pathname: "mocked-pathname",
  }),
}));

const dispatchMock = jest.fn() as jest.MockedFunction<AppDispatch>;
const useDispatchMock = useDispatch as jest.MockedFunction<typeof useDispatch>;

describe("ConfirmTeamInvitation", () => {
  beforeEach(() => {
    dispatchMock.mockClear();
    useDispatchMock.mockReturnValue(dispatchMock);
  });

  it("should render the ConfirmTeamInvitation component", () => {
    renderWithRedux(<ConfirmTeamInvitation {...mockConfirmTeamInvitation} />);
    const confirmTeamInvitation = screen.getByTestId("confirmTeamInvitation");
    expect(confirmTeamInvitation).toBeInTheDocument();
  });

  it("should render the ReplyToInvitation component within ConfirmTeamInvitation", () => {
    renderWithRedux(<ConfirmTeamInvitation {...mockConfirmTeamInvitation} />);
    const replyToInvitation = screen.getByTestId("reply-to-invitation");
    expect(replyToInvitation).toBeInTheDocument();
  });
});
