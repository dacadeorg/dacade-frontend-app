import InvitationButton, { InvitationButtonProps } from "@/components/cards/challenge/_partials/InvitationButton";
import { renderWithRedux } from "@__mocks__/renderWithRedux";
import "@testing-library/jest-dom";
import { screen, fireEvent } from "@testing-library/react";

const invitationButtonPropsAccept: InvitationButtonProps = {
  text: "accept",
  confirmInvitation: jest.fn(),
  invitationButtonTestId: "invitation-button",
};

const invitationButtonPropsDecline: InvitationButtonProps = {
  text: "decline",
  confirmInvitation: jest.fn(),
  invitationButtonTestId: "invitation-button",
};

function RenderInvitationButton(props: InvitationButtonProps) {
  renderWithRedux(<InvitationButton text={props.text} confirmInvitation={props.confirmInvitation} invitationButtonTestId={props.invitationButtonTestId} />);
}

describe("InvitationButton", () => {
  it("should render the accept button", () => {
    RenderInvitationButton(invitationButtonPropsAccept);
    expect(screen.getByTestId(invitationButtonPropsAccept.invitationButtonTestId!)).toBeInTheDocument();
    expect(screen.getByText("accept")).toBeInTheDocument();
  });

  it("should render the decline button", () => {
    RenderInvitationButton(invitationButtonPropsDecline);
    expect(screen.getByTestId(invitationButtonPropsDecline.invitationButtonTestId!)).toBeInTheDocument();
    expect(screen.getByText("decline")).toBeInTheDocument();
  });

  it('should call confirmInvitation with "accept" when accept button is clicked', () => {
    RenderInvitationButton(invitationButtonPropsAccept);
    const button = screen.getByTestId(invitationButtonPropsAccept.invitationButtonTestId!);
    fireEvent.click(button);
    expect(invitationButtonPropsAccept.confirmInvitation).toHaveBeenCalledWith("accept");
  });

  it('should call confirmInvitation with "decline" when decline button is clicked', () => {
    RenderInvitationButton(invitationButtonPropsDecline);
    const button = screen.getByTestId(invitationButtonPropsDecline.invitationButtonTestId!);
    fireEvent.click(button);
    expect(invitationButtonPropsDecline.confirmInvitation).toHaveBeenCalledWith("decline");
  });
});
