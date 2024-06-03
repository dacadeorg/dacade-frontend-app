import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";
import Submission, { FormValues } from "@/components/sections/challenges/Submission";
import { renderWithRedux } from "../../../../__mocks__/renderWithRedux";
import { challenge as mockChallenge, mockTeam, mockUser, submission } from "../../../../__mocks__/challenge";
import { FieldErrors } from "react-hook-form";
import { mockReferral } from "../../../../__mocks__/referrals";

describe("Submission", () => {
  let errors: FieldErrors<FormValues>;
  const challenge = mockChallenge();

  it("renders the submission section", async () => {
    renderWithRedux(<Submission />, {
      challenges: { current: challenge, list: [challenge], loading: false, submission: submission() },
      teams: { current: mockTeam, loading: true },
    });
    const submissionsClosed = challenge?.expiresAt ? Date.parse(challenge?.expiresAt) < Date.now() : false;
    if (submissionsClosed) {
      expect(screen.getByText("communities.overview.challenge.submissions-closed")).toBeInTheDocument();
    } else if (challenge.isTeamChallenge) {
      expect(screen.getByText("communities.overview.challenge.submission.description")).toBeInTheDocument();
    }
  });

  it("validates submission form and displays necessary elements", () => {
    const user = mockUser();
    const canSubmit = () => {
      if (!challenge?.isTeamChallenge) return true;
      return Boolean(!!mockTeam?.organizer);
    };

    renderWithRedux(<Submission testId="submission-form" />, {
      challenges: { current: challenge, list: [challenge], loading: false, submission: submission() },
      teams: { current: mockTeam, loading: true },
      user: {
        data: user,
        fetchingUserLoading: true,
        filteredUsers: [user],
        token: "",
        userBalance: "User balance",
        balance: "cusd",
        walletAddresses: "walletAddress",
        referrals: [mockReferral()],
      },
    });
    if (!canSubmit) {
      expect(screen.getByText("communities.challenge.submission.hint")).toBeInTheDocument();
    } else {
      expect(screen.getByTestId("submission-form")).toBeInTheDocument();
      if (challenge.format && user && user.avatar && challenge.format.githubLink && errors) {
        expect(screen.getByText(mockTeam.organizer?.displayName || user.displayName)).toBeInTheDocument();
        expect(screen.getByText(errors.text?.message as string)).toBeInTheDocument();
        expect(screen.getByText(errors.githubLink?.message as string)).toBeInTheDocument();
      }
      expect(screen.getByText("Markdown")).toBeInTheDocument();
      if (challenge?.format.disclaimer) {
        expect(screen.getByRole("checkbox")).toBeInTheDocument();
      }
      expect(screen.getByText("submit")).toBeInTheDocument();
    }
  });
});