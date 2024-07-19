import { Challenge } from "@/types/course";
import InvitationButton from "./InvitationButton";
import { Team } from "@/types/challenge";
import { useDispatch } from "@/hooks/useTypedDispatch";
import { useMultiSelector } from "@/hooks/useTypedSelector";
import { IRootState } from "@/store";
import { useEffect, useState } from "react";
import { getTeamByChallenge, getTeamById } from "@/store/services/teams.service";
import { acceptInvitation, declineInvitation, setInvitesData } from "@/store/feature/communities/challenges/invites.slice";
import Loader from "@/components/ui/Loader";

interface MultiSelector {
  challenge: Challenge;
  team: Team;
}
export interface InvitationProps {
  invite_id: string;
  team_ref: string;
  ReplyToInvitationTestId?: string
}

export default function ReplyToInvitation({ invite_id, team_ref,ReplyToInvitationTestId }: InvitationProps) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [canReply, setCanReply] = useState(false);
  const { challenge, team } = useMultiSelector<unknown, MultiSelector>({
    challenge: (state: IRootState) => state.challenges.current,
    team: (state: IRootState) => state.teams.current,
  });

  const fetchTeambyId = async () => {
    const teamId = team_ref.split("/")[1];
    setLoading(true);
    await dispatch(getTeamById(teamId));
    setLoading(false);
  };

  const replyToInvitation = async (text: "accept" | "decline") => {
    if (!team_ref) return;
    // TODO: Add a way of letting the user know that this  team is locked.
    if (team?.locked) {
      setCanReply(false);
      return;
    }
    try {
      setLoading(true);
      if (text === "accept") {
        await dispatch(acceptInvitation(invite_id));
      } else {
        await dispatch(declineInvitation(invite_id));
      }
      if (challenge) await dispatch(getTeamByChallenge(challenge.id));
      dispatch(setInvitesData(null));
    } catch (error) {
      console.log("error within invitation confirmation");
    } finally {
      await fetchTeambyId();
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!team_ref) return;
    fetchTeambyId();
  }, []);

  useEffect(() => {
    if (!team?.invites?.length) return;
    const myInvite = team.invites.filter((invite) => invite.id === invite_id)[0];
    setCanReply(myInvite && myInvite.status === "PENDING");
  }, [invite_id, team]);

  return (
    <div data-testid={ReplyToInvitationTestId}>
      {loading ? (
        <Loader isSmallSpinner />
      ) : (
        <>
          {canReply && (
            <>
              <div className="px-5 flex gap-3 justify-center">
                <InvitationButton text="accept" confirmInvitation={replyToInvitation} />
                <InvitationButton text="decline" confirmInvitation={replyToInvitation} />
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}
