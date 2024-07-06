import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";
import Submission, { FormValues } from "@/components/sections/challenges/Submission";
import { renderWithRedux } from "../../../../__mocks__/renderWithRedux";
import { FieldErrors } from "react-hook-form";
import { challenge, mockTeam, submission } from "@__mocks__/fixtures/challenge";
import { mockUser } from "@__mocks__/fixtures/user";
import { mockReferral } from "@__mocks__/fixtures/referrals";

describe("Submission", () => {
  let errors: FieldErrors<FormValues>;
  it("renders the submission section", async () => {
    renderWithRedux(<Submission />, {
      challenges: { current: challenge, list: [challenge], loading: false, submission: submission },
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
    const canSubmit = () => {
      if (!challenge?.isTeamChallenge) return true;
      return Boolean(!!mockTeam?.organizer);
    };

    renderWithRedux(<Submission testId="submission-form" />, {
      challenges: { current: challenge, list: [challenge], loading: false, submission: submission },
      teams: { current: mockTeam, loading: true },
      user: {
        data: mockUser,
        fetchingUserLoading: true,
        filteredUsers: [mockUser],
        token: "",
        userBalance: "User balance",
        balance: "cusd",
        walletAddresses: "walletAddress",
        referrals: [mockReferral],
      },
    });
    if (!canSubmit) {
      expect(screen.getByText("communities.challenge.submission.hint")).toBeInTheDocument();
    } else {
      expect(screen.getByTestId("submission-form")).toBeInTheDocument();
      if (challenge.format && mockUser && mockUser.avatar && challenge.format.githubLink && errors) {
        expect(screen.getByText(mockTeam.organizer?.displayName || mockUser.displayName)).toBeInTheDocument();
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
