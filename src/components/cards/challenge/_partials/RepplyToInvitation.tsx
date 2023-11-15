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
}

export default function RepplyToInvitation({ invite_id, team_ref }: InvitationProps) {
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

  const onClick = async (text: "accept" | "decline") => {
    if (!team_ref) return;
    // TODO: Add a way of letting the user know that this  team is locked.
    if (team.locked) {
      setCanReply(false);
      return;
    }
    try {
      setLoading(true);
      if (text === "accept") {
        dispatch(acceptInvitation(invite_id));
      } else {
        dispatch(declineInvitation(invite_id));
      }
      if (challenge) await dispatch(getTeamByChallenge(challenge.id));
      dispatch(setInvitesData(null));
    } catch (error) {
      console.log("error withing giving confitmation to invite");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!team_ref) return;
    fetchTeambyId();
  }, []);

  useEffect(() => {
    if (!team?.invites) return;
    const myInvite = team.invites.filter((invite) => invite.id === invite_id)[0];
    if (myInvite && myInvite.status === "PENDING") setCanReply(true);
  }, [invite_id, team]);

  return (
    <div>
      {loading ? (
        <Loader isSmallSpinner />
      ) : (
        <>
          {canReply && (
            <>
              <div className="px-5 flex gap-3">
                <InvitationButton text="accept" onClick={onClick} />
                <InvitationButton text="decline" onClick={onClick} />
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}
