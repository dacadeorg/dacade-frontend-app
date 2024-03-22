import Section from "@/components/sections/communities/_partials/Section";
import FormTeamCard from "@/components/cards/challenge/_partials/FormTeam";
import CreateTeamCard from "@/components/cards/CreateTeam";
import { useMultiSelector } from "@/hooks/useTypedSelector";
import ConfirmTeamInvitation from "@/components/cards/challenge/ConfirmTeamInvitation";
import { useTranslation } from "next-i18next";
import { IRootState } from "@/store";
import { Invite } from "@/types/challenge";
import { Challenge } from "@/types/course";
import { TEAM_FORMATION } from "@/constants/challengeInfo";

interface Props {
  invite: Invite;
  challenge: Challenge;
}
/**
 * SetupTeamChallenge component.
 *
 * @returns {JSX.Element} The SetupTeamChallenge component JSX element.
 */
export default function SetupTeamChallenge(): JSX.Element {
  const { invite, challenge } = useMultiSelector<unknown, Props>({ invite: (state: IRootState) => state.invites.data, challenge: (state: IRootState) => state.challenges.current });

  const { t } = useTranslation();

  return (
    <Section title="Submission">
      <div className="text-base font-normal text-slate-700 pt-8 pb-7 md:w-182.5">{t("communities.overview.challenge.team.setup.info")}</div>
      <div className="md:flex flex-row gap-5">
        <FormTeamCard index={1} title="Form your team" description={challenge?.additionalInfo?.[TEAM_FORMATION].text || t("communities.overview.challenge.team.organization")} />
        {invite && !invite.team?.locked ? (
          <ConfirmTeamInvitation index={2} title="Submit your team" text={`The maximum team members for this challenge is ${challenge?.teamLimit || "3"} people`} invite={invite} />
        ) : (
          <CreateTeamCard
            index={2}
            title={t("communities.overview.challenge.team.setup.submit-title") || ""}
            text={t("communities.overview.challenge.team.setup.description") || ""}
          />
        )}
      </div>
    </Section>
  );
}
