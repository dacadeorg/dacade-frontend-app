import { useEffect, useState } from "react";
import Section from "@/components/sections/communities/_partials/Section";
import FormTeamCard from "@/components/cards/challenge/_partials/FormTeam";
import SubmissionTeamCard from "@/components/cards/SubmissionTeam";
import { useSelector } from "@/hooks/useTypedSelector";
import { Notification } from "@/types/notification";
import AcceptTeamInvitation from "@/components/cards/challenge/AcceptTeamInvitation";
import Hint from "@/components/ui/Hint";
import { authCheck } from "@/store/feature/auth.slice";

/**
 * SetupTeamChallenge component.
 *
 * @returns {JSX.Element} The SetupTeamChallenge component JSX element.
 */
export default function SetupTeamChallenge(): JSX.Element {
  const { notifications, user } = useSelector((state) => ({
    notifications: state.notifications.notifications,
    user: state.user.data,
  }));
  const [teamInvitations, setTeamInvitations] = useState<Notification[]>([]);

  useEffect(() => {
    setTeamInvitations(notifications.filter((notification) => notification.type === "TEAM_INVITE"));
  }, [notifications]);

  const team = useSelector((state) => state.teams.current);

  return (
    <Section title="Submission">
      <div className="text-base font-normal text-slate-700 pt-8 pb-7 md:w-99">To complete the team challenge, you need to follow these steps:</div>
      {team && team?.teamMembers?.length && team.teamMembers.length < 3 ? (
        <Hint className="mb-8">Submitions will be enabled when when all the team mebmers accept the invitation and the team is fully formed.</Hint>
      ) : (
        <></>
      )}
      <div className="md:flex flex-row gap-5">
        <FormTeamCard index={1} title="Form your team" description="Open discord channel #teams and find your teammates to complete the challenge with you." />
        {teamInvitations ? (
          <AcceptTeamInvitation index={2} title="Submit your team" text="The maximum team members for this challenge is 3 people" teamInvitations={teamInvitations} />
        ) : (
          <SubmissionTeamCard index={2} title="Submit your team" text="The maximum team members for this challenge is 3 people" />
        )}
      </div>
    </Section>
  );
}
