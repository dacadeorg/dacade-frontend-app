import InvitationButton, { InvitationButtonProps } from "@/components/cards/challenge/_partials/InvitationButton";
import { renderWithRedux } from "@__mocks__/renderWithRedux";
import "@testing-library/jest-dom";
import { screen, fireEvent } from "@testing-library/react";

const invitationButtonPropsAccept: InvitationButtonProps = {
  text: "accept",
  confirmInvitation: jest.fn(),
};

const invitationButtonPropsDecline: InvitationButtonProps = {
  text: "decline",
  confirmInvitation: jest.fn(),
};

function RenderInvitationButton(props: InvitationButtonProps) {
  renderWithRedux(
    <InvitationButton
      text={props.text}
      confirmInvitation={props.confirmInvitation}
    />
  );
}

describe('InvitationButton', () => {
  it('should render the accept button', () => {
    RenderInvitationButton(invitationButtonPropsAccept);
    expect(screen.getByTestId('invitation-button')).toBeInTheDocument();
    expect(screen.getByText('accept')).toBeInTheDocument();
  });

  it('should render the decline button', () => {
    RenderInvitationButton(invitationButtonPropsDecline);
    expect(screen.getByTestId('invitation-button')).toBeInTheDocument();
    expect(screen.getByText('decline')).toBeInTheDocument();
  });

  it('should call confirmInvitation with "accept" when accept button is clicked', () => {
    RenderInvitationButton(invitationButtonPropsAccept);
    const button = screen.getByTestId('invitation-button');
    fireEvent.click(button);
    expect(invitationButtonPropsAccept.confirmInvitation).toHaveBeenCalledWith('accept');
  });

  it('should call confirmInvitation with "decline" when decline button is clicked', () => {
    RenderInvitationButton(invitationButtonPropsDecline);
    const button = screen.getByTestId('invitation-button');
    fireEvent.click(button);
    expect(invitationButtonPropsDecline.confirmInvitation).toHaveBeenCalledWith('decline');
  });
});
