import { useEffect } from "react";
import Section from "@/components/sections/communities/_partials/Section";
import FormTeamCard from "@/components/cards/challenge/_partials/FormTeam";
import SubmissionTeamCard from "@/components/cards/SubmissionTeam";
import { useSelector } from "@/hooks/useTypedSelector";
import { useDispatch } from "@/hooks/useTypedDispatch";
import { authCheck } from "@/store/feature/auth.slice";
import { getUserInvitesByChallenge } from "@/store/services/teams.service";
import ConfirmTeamInvitation from "@/components/cards/challenge/ConfirmTeamInvitation";
/**
 * SetupTeamChallenge component.
 *
 * @returns {JSX.Element} The SetupTeamChallenge component JSX element.
 */
export default function SetupTeamChallenge(): JSX.Element {
  const { challenge, invite, isAuthenticated } = useSelector((state) => ({
    challenge: state.challenges.current,
    invite: state.invites.data,
    isAuthenticated: authCheck(state),
  }));
  const dispatch = useDispatch();

  useEffect(() => {
    if (challenge && isAuthenticated) {
      dispatch(getUserInvitesByChallenge(challenge.id));
    }
  }, [challenge, isAuthenticated]);

  return (
    <Section title="Submission">
      <div className="text-base font-normal text-slate-700 pt-8 pb-7 md:w-99">To complete the team challenge, you need to follow these steps:</div>
      <div className="md:flex flex-row gap-5">
        <FormTeamCard index={1} title="Form your team" description="Open discord channel #teams and find your teammates to complete the challenge with you." />
        {invite ? (
          <ConfirmTeamInvitation index={2} title="Submit your team" text="The maximum team members for this challenge is 3 people" invite={invite} />
        ) : (
          <SubmissionTeamCard index={2} title="Submit your team" text="The maximum team members for this challenge is 3 people" />
        )}
      </div>
    </Section>
  );
}
