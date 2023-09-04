import { useEffect, useState } from "react";
import Avatar from "@/components/ui/Avatar";
import AsyncSelect from "react-select/async";
import { useDispatch } from "@/hooks/useTypedDispatch";
import { useSelector } from "@/hooks/useTypedSelector";
import { User } from "@/types/bounty";
import { cancelTeamInvite, createTeam, getTeamByChallenge, removeTeamMember } from "@/store/services/teams.service";
import { getUserByUsername } from "@/store/services/user.service";
import { setInviteStatus } from "@/store/feature/communities/challenges/invites.slice";
import Button from "./challenge/_partials/Button";
import debounce from "lodash.debounce";
import Loader from "../ui/Loader";

/**
 * Props for the SubmissionTeam component.
 */
interface SubmissionTeamCardProps {
  index?: number | string;
  title?: string;
  text?: string;
}

/**
 * Interface for the team members
 * @date 7/26/2023 - 9:59:13 AM
 *
 * @interface TeamCandidate
 * @typedef {TeamCandidate}
 */
interface TeamCandidate {
  user?: User | null;
  status: string;
  id: string;
}

/**
 * Interface for the member seaarch input
 * @date 7/26/2023 - 6:13:59 PM
 *
 * @interface Option
 * @typedef {Option}
 */
interface Option {
  value?: string;
  label?: string;
  user: User;
}

/**
 * SubmissionTeam component.
 *
 * @param {SubmissionTeamProps} props - The props for the SubmissionTeam component.
 * @returns {JSX.Element} The SubmissionTeam component JSX element.
 */

export default function SubmissionTeamCard({ index = 1, title = "", text = "" }: SubmissionTeamCardProps): JSX.Element {
  const { challenge, user, team, inviteStatus, isTeamLoading } = useSelector((state) => ({
    challenge: state.challenges.current,
    user: state.user.data,
    team: state.teams.current,
    invite: state.invites.data,
    inviteStatus: state.invites.inviteStatus,
    isTeamLoading: state.teams.loading,
  }));

  const [membersList, setMembersList] = useState<TeamCandidate[]>([]);
  const [isCurrentUserMember, setIsCurrentUserMember] = useState(false);
  const [isCurrentUserOrganiser, setIsCurrentUserOrganiser] = useState(false);
  const dispatch = useDispatch();

  const filterUsers = async (username: string, callback: any) => {
    const { data = [] } = await dispatch(getUserByUsername(username));
    const users = data?.map((user: User) => {
      return { value: user.id, label: user.displayName, user };
    });
    return callback(users);
  };

  const loadUserOptions = debounce(filterUsers, 1000);

  useEffect(() => {
    if (team) {
      if (team.organizer) setMembersList([{ user: team.organizer, status: "organizer", id: team.organizer_id }]);

      if (team.members) {
        team.members.forEach(({ user, id }) => {
          setMembersList((prev) => [...prev, { user: user, status: "Team member", id }]);
        });
      }

      if (team.teamInvites) {
        team.teamInvites.forEach(({ user, status, id }) => {
          setMembersList((prev) => [...prev, { user, status, id }]);
        });
      }
    }
  }, [team]);

  useEffect(() => {
    setIsCurrentUserOrganiser(user?.id === team?.organizer_id);
    setIsCurrentUserMember(membersList.some((member) => member?.user?.id === user?.id));
  }, [user, team, membersList]);

  const selectTeamMember = async (option: Option) => {
    if (membersList.filter((member) => member.user?.id === option.user?.id).length !== 0) {
      return;
    }
    if (membersList.length === 0) setMembersList([{ user, status: "organizer", id: user?.id as string }]);

    setMembersList((prev) => [...prev, { user: option.user, status: "Sending invite", id: option.user.id }]);
    await dispatch(
      createTeam({
        challenge_id: challenge?.id,
        members: [option.user?.id],
      })
    );
  };

  const removeTeamMemberFromTeam = async (id: string) => {
    await dispatch(removeTeamMember({ member_id: id, team_id: team.id }));
    if (challenge) dispatch(getTeamByChallenge(challenge.id));
  };

  const cancelInvite = async (id: string) => {
    await dispatch(cancelTeamInvite({ invite_id: id }));
    if (challenge) dispatch(getTeamByChallenge(challenge.id));
  };

  const leaveMyTeam = () => {
    // TODO: Add correct implementation to leave the team
    console.log("Team member is going to leave the team");
  };

  useEffect(() => {
    if (inviteStatus) {
      let status = "";
      if (inviteStatus === "sent") status = "PENDING";
      else if (inviteStatus === "not sent") status = "Not sent";

      setMembersList((prev) => {
        const newMembersList = [...prev];
        newMembersList[prev.length - 1].status = status;
        return newMembersList;
      });

      dispatch(setInviteStatus(null));
    }
  }, [inviteStatus]);

  return (
    <div className="flex flex-col relative flex-grow p-6 divide-y sm:divide-y-0 sm:divide-x divide-gray-200 rounded-3xl group text-gray-700 sm:p-7 mb-4 border-solid border border-gray-200">
      <div className="flex flex-col justify-between w-full sm:pb-0">
        <div className="flex flex-col gap-4">
          <div className="text-lg font-medium leading-normal text-gray-900">
            <span>{index}.</span>
            <span className="ml-2">{title}</span>
          </div>
          <div className="text-sm font-normal text-gray-700 max-w-xxs pb-2">{text}</div>

          {isTeamLoading ? (
            <div className="h-24 sm:h-48 grid place-items-center">
              <Loader />
            </div>
          ) : (
            <>
              {membersList.map(({ status, user: member, id }, index) => {
                return (
                  <div className="flex items-center w-full pr-0" key={`team-member-${index}`}>
                    <div className="flex space-x-1 pr-3.5">
                      <Avatar user={member} size="medium-fixed" />
                    </div>
                    <div className="flex flex-col">
                      <div className=" text-sm text-gray-700 font-medium">{member?.displayName}</div>
                      <div className=" text-gray-400 text-xs">{status}</div>
                    </div>
                    {!team.locked && (
                      <>
                        {isCurrentUserOrganiser ? (
                          <>
                            {status === "Team member" && <Button onClick={() => removeTeamMemberFromTeam(id)} text="Remove" />}
                            {status === "PENDING" && <Button onClick={() => cancelInvite(id)} text="Cancel" />}
                          </>
                        ) : (
                          <> {user?.id === member?.id && <Button onClick={leaveMyTeam} text="Leave" />}</>
                        )}
                      </>
                    )}
                  </div>
                );
              })}
              {(team && isCurrentUserOrganiser && !team.locked) ||
                (!isCurrentUserMember && (
                  <div>
                    <AsyncSelect
                      cacheOptions
                      styles={{
                        input: (baseStyles) => ({
                          ...baseStyles,
                          input: {
                            height: "36px",
                          },
                        }),
                      }}
                      className="text-lg"
                      defaultOptions={[]}
                      loadOptions={loadUserOptions}
                      onChange={(option) => {
                        if (!team.locked && option) selectTeamMember(option);
                      }}
                    />
                  </div>
                ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
