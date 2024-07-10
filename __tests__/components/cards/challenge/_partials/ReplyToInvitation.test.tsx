import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { useDispatch } from "../../../../../src/hooks/useTypedDispatch";
import { useMultiSelector } from "@/hooks/useTypedSelector";
import ReplyToInvitation, { InvitationProps } from "@/components/cards/challenge/_partials/ReplyToInvitation";
import { acceptInvitation, declineInvitation } from "@/store/feature/communities/challenges/invites.slice";


jest.mock("../../../../../src/hooks/useTypedDispatch");
jest.mock("../../../../../src/hooks/useTypedSelector");
jest.mock("../../../../../src/store/services/teams.service");
jest.mock("../../../../../src/store/feature/communities/challenges/invites.slice");
const mockDispatch = jest.fn();

(useDispatch as jest.Mock).mockReturnValue(mockDispatch);
(useMultiSelector as jest.Mock).mockReturnValue({
  challenge: { id: "challenge-id" },
  team: { invites: [{ id: "invite-id", status: "PENDING" }] },
});

const invitationProps: InvitationProps = {
  invite_id: "invite-id",
  team_ref: "team/1",
};

describe("ReplyToInvitation", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render the ReplyToInvitation component", () => {
    render(<ReplyToInvitation {...invitationProps} />);
    expect(screen.getByTestId("reply-to-invitation")).toBeInTheDocument();
  });

  it("should display loader when loading", async () => {
    render(<ReplyToInvitation {...invitationProps} />);
    expect(screen.getByTestId("loader")).toBeInTheDocument();
    await waitFor(() => expect(screen.queryByTestId("loader")).not.toBeInTheDocument());
  });

  it("should call acceptInvitation when accept button is clicked", async () => {
    render(<ReplyToInvitation {...invitationProps} />);
    await waitFor(() => expect(screen.queryByTestId("loader")).not.toBeInTheDocument());

    const acceptButton = screen.getByText("accept");
    fireEvent.click(acceptButton);
    await waitFor(() => expect(mockDispatch).toHaveBeenCalledWith(acceptInvitation("invite-id")));
  });

  it("should call declineInvitation when decline button is clicked", async () => {
    render(<ReplyToInvitation {...invitationProps} />);
    await waitFor(() => expect(screen.queryByTestId("loader")).not.toBeInTheDocument());

    const declineButton = screen.getByText("decline");
    fireEvent.click(declineButton);
    await waitFor(() => expect(mockDispatch).toHaveBeenCalledWith(declineInvitation("invite-id")));
  });

  it("should not allow replies if the team is locked", async () => {
    (useMultiSelector as jest.Mock).mockReturnValueOnce({
      challenge: { id: "challenge-id" },
      team: { invites: [{ id: "invite-id", status: "PENDING" }], locked: true },
    });

    render(<ReplyToInvitation {...invitationProps} />);
    
    await waitFor(() => expect(screen.queryByTestId("loader")).not.toBeInTheDocument());
    const invitationButtons = screen.queryAllByTestId("invitation-button");
    expect(invitationButtons).toHaveLength(2);
  });
});