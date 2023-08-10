import { useEffect, useState } from "react";
import Section from "@/components/sections/communities/_partials/Section";
import FormTeamCard from "@/components/cards/challenge/_partials/FormTeam";
import SubmissionTeamCard from "@/components/cards/SubmissionTeam";
import { useSelector } from "@/hooks/useTypedSelector";
import { Notification } from "@/types/notification";
import AcceptTeamInvitation from "@/components/cards/challenge/AcceptTeamInvitation";
import { useTranslation } from "next-i18next";

/**
 * SetupTeamChallenge component.
 *
 * @returns {JSX.Element} The SetupTeamChallenge component JSX element.
 */
export default function SetupTeamChallenge(): JSX.Element {
  const { notifications } = useSelector((state) => ({
    notifications: state.notifications.notifications,
  }));
  const [teamInvitations, setTeamInvitations] = useState<Notification[]>([]);

  useEffect(() => {
    setTeamInvitations(notifications.filter((notification) => notification.type === "TEAM_INVITE"));
  }, [notifications]);

  const { t } = useTranslation();

  return (
    <Section title="Submission">
      <div className="text-base font-normal text-slate-700 pt-8 pb-7 md:w-99">{t("communities.overview.challenge.team.setup.info")}</div>
      <div className="md:flex flex-row gap-5">
        <FormTeamCard index={1} title={t("communities.overview.challenge.team.setup.title")} description={t("communities.overview.challenge.team.setup.description")} />
        {teamInvitations ? (
          <AcceptTeamInvitation
            index={2}
            title={t("communities.overview.challenge.team.setup.submit-title")}
            text={t("communities.overview.challenge.team.setup.description")}
            teamInvitations={teamInvitations}
          />
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
