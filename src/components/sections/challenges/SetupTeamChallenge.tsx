import { useEffect } from "react";
import Section from "@/components/sections/communities/_partials/Section";
import FormTeamCard from "@/components/cards/challenge/_partials/FormTeam";
import SubmissionTeamCard from "@/components/cards/SubmissionTeam";
import { useMultiSelector } from "@/hooks/useTypedSelector";
import { useDispatch } from "@/hooks/useTypedDispatch";
import { authCheck } from "@/store/feature/auth.slice";
import { getTeamByChallenge, getUserInvitesByChallenge } from "@/store/services/teams.service";
import ConfirmTeamInvitation from "@/components/cards/challenge/ConfirmTeamInvitation";
import { useTranslation } from "next-i18next";
import { Challenge } from "@/types/course";
import { Invite } from "@/types/challenge";
import { IRootState } from "@/store";

/**
 * interface for SetupTeamChallenge multiSelector
 * @date 9/13/2023 - 9:05:40 AM
 *
 * @interface SetupTeamChallengeMultiSelector
 * @typedef {SetupTeamChallengeMultiSelector}
 */
interface SetupTeamChallengeMultiSelector {
  challenge: Challenge | null;
  invite: Invite | null;
  isAuthenticated: boolean;
}

/**
 * SetupTeamChallenge component.
 *
 * @returns {JSX.Element} The SetupTeamChallenge component JSX element.
 */
export default function SetupTeamChallenge(): JSX.Element {
  const { challenge, invite, isAuthenticated } = useMultiSelector<unknown, SetupTeamChallengeMultiSelector>({
    challenge: (state: IRootState) => state.challenges.current,
    invite: (state: IRootState) => state.invites.data,
    isAuthenticated: (state: IRootState) => authCheck(state),
  });
  const dispatch = useDispatch();

  useEffect(() => {
    if (challenge && isAuthenticated) {
      dispatch(getUserInvitesByChallenge(challenge.id));
      dispatch(getTeamByChallenge(challenge.id));
    }
  }, [challenge, isAuthenticated]);

  const { t } = useTranslation();

  return (
    <Section title="Submission">
      <div className="text-base font-normal text-slate-700 pt-8 pb-7 md:w-99">{t("communities.overview.challenge.team.setup.info")}</div>
      <div className="md:flex flex-row gap-5">
        <FormTeamCard index={1} title="Form your team" description="Open discord channel #teams and find your teammates to complete the challenge with you." />
        {invite ? (
          <ConfirmTeamInvitation index={2} title="Submit your team" text="The maximum team members for this challenge is 3 people" invite={invite} />
        ) : (
          <SubmissionTeamCard
            index={2}
            title={t("communities.overview.challenge.team.setup.submit-title") || ""}
            text={t("communities.overview.challenge.team.setup.description") || ""}
          />
        )}
      </div>
    </Section>
  );
}
