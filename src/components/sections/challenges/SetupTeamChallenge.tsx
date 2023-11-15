import Section from "@/components/sections/communities/_partials/Section";
import FormTeamCard from "@/components/cards/challenge/_partials/FormTeam";
import SubmissionTeamCard from "@/components/cards/SubmissionTeam";
import { useSelector } from "@/hooks/useTypedSelector";
import ConfirmTeamInvitation from "@/components/cards/challenge/ConfirmTeamInvitation";
import { useTranslation } from "next-i18next";

/**
 * SetupTeamChallenge component.
 *
 * @returns {JSX.Element} The SetupTeamChallenge component JSX element.
 */
export default function SetupTeamChallenge(): JSX.Element {
  const invite = useSelector((state) => state.invites.data);
  const { t } = useTranslation();

  return (
    <Section title="Submission">
      <div className="text-base font-normal text-slate-700 pt-8 pb-7 md:w-99">{t("communities.overview.challenge.team.setup.info")}</div>
      <div className="md:flex flex-row gap-5">
        <FormTeamCard index={1} title="Form your team" description="Open discord channel #teams and find your teammates to complete the challenge with you." />
        {invite && !invite.team?.locked ? (
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
