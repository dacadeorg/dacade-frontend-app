import { useEffect, useState, useMemo } from "react";
import Avatar from "@/components/ui/Avatar";
import AsyncSelect from "react-select/async";
import { useDispatch } from "@/hooks/useTypedDispatch";
import { useMultiSelector } from "@/hooks/useTypedSelector";
import { User } from "@/types/bounty";
import { cancelTeamInvite, createTeam, getTeamByChallenge, leaveTeam, removeTeamMember } from "@/store/services/teams.service";
import { getUserByUsername } from "@/store/services/user.service";
import Button from "./challenge/_partials/Button";
import debounce from "lodash.debounce";
import Loader from "../ui/Loader";
import { IRootState } from "@/store";
import { Challenge } from "@/types/course";
import { Invite, Team } from "@/types/challenge";
import ErrorBox from "../ui/ErrorBox";
import { clearError } from "@/store/feature/index.slice";
import { CustomError } from "@/types/error";

/**
 * interface for CreateTeamCard  multiSelector
 * @date 9/13/2023 - 8:57:31 AM
 *
 * @interface CreateTeamCardMultiSelector
 * @typedef {CreateTeamCardMultiSelector}
 */
interface CreateTeamCardMultiSelector {
  challenge: Challenge | null;
  user: User | null;
  team: Team;
  invite: Invite | null;
  isTeamLoading: boolean;
  error: CustomError;
}

/**
 * Props for the CreateTeam component.
 */
interface CreateTeamCardProps {
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
 * Enum for storing the types if users on the team
 * @date 9/11/2023 - 12:38:37 PM
 *
 * @enum {number}
 */
enum MemberStatus {
  teamMember = "member",
  organizer = "organizer",
  invite = "invite",
}

/**
 * CreateTeam component.
 *
 * @param {SubmissionTeamProps} props - The props for the CreateTeam component.
 * @returns {JSX.Element} The CreateTeam component JSX element.
 */

export default function CreateTeamCard({ index = 1, title = "", text = "" }: CreateTeamCardProps): JSX.Element {
  const { challenge, user, team, isTeamLoading, error } = useMultiSelector<unknown, CreateTeamCardMultiSelector>({
    challenge: (state: IRootState) => state.challenges.current,
    user: (state: IRootState) => state.user.data,
    team: (state: IRootState) => state.teams.current,
    isTeamLoading: (state: IRootState) => state.teams.loading,
    error: (state: IRootState) => state.store.error,
  });

  const [membersList, setMembersList] = useState<TeamCandidate[]>([]);
  const [isCurrentUserOrganiser, setIsCurrentUserOrganiser] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentAction, setCurrentAction] = useState("");
  const dispatch = useDispatch();

  const searchUserByUsername = debounce(async (inputValue: string, callback: (options: Option[]) => void) => {
    try {
      const foundUsers: any = await dispatch(getUserByUsername(inputValue));
      const users = foundUsers?.data
        ? foundUsers.data.map((user: User) => {
            return { value: user.id, label: user.displayName, user };
          })
        : [];
      callback(users);
    } catch (error) {
      callback([]);
    }
  }, 1000);

  const isTeamFull = useMemo(() => {
    const members = membersList.filter((member) => member.status === MemberStatus.teamMember);
    return challenge?.teamLimit ? members.length >= challenge?.teamLimit - 1 : members.length >= 2;
  }, [challenge?.teamLimit, membersList]);

  const submissionsClosed = challenge?.expiresAt ? Date.parse(challenge?.expiresAt) < Date.now() : false;

  const canAddMembers = useMemo(() => {
    return team ? isCurrentUserOrganiser && !team?.locked && !isTeamFull : true;
  }, [isCurrentUserOrganiser, team, isTeamFull]);

  useEffect(() => {
    if (team) {
      if (team.organizer) setMembersList([{ user: team.organizer, status: MemberStatus.organizer, id: team.organizer_id }]);

      if (team.members) {
        team.members.forEach(({ user, id }) => {
          setMembersList((prev) => [...prev, { user: user, status: MemberStatus.teamMember, id }]);
        });
      }

      if (team.invites) {
        team.invites.forEach(({ user, id }) => {
          setMembersList((prev) => [...prev, { user, status: MemberStatus.invite, id }]);
        });
      }
    }
  }, [team]);

  useEffect(() => {
    setIsCurrentUserOrganiser(user?.id === team?.organizer_id);
  }, [user, team, membersList]);

  const selectTeamMember = async (option: Option) => {
    if (error) dispatch(clearError());

    if (membersList.filter((member) => member.user?.id === option.user?.id).length !== 0) {
      return;
    }
    if (membersList.length === 0) setMembersList([{ user, status: MemberStatus.organizer, id: user?.id as string }]);

    await dispatch(
      createTeam({
        challenge_id: challenge?.id,
        members: [option.user?.id],
      })
    );
    refetchTeam();
  };

  const handleClick = async (text: string, userId?: string) => {
    setLoading(true);
    setCurrentAction(text);
    if (!userId) await dispatch(leaveTeam(team.id));
    else if (text === "remove") await dispatch(removeTeamMember({ member_id: userId, team_id: team.id }));
    else if (text === "cancel") await dispatch(cancelTeamInvite({ invite_id: userId }));
    await refetchTeam();
    setLoading(false);
    setCurrentAction("");
  };
  const refetchTeam = async () => {
    if (challenge) await dispatch(getTeamByChallenge(challenge.id));
  };

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
                    {!team?.locked && (
                      <>
                        {isCurrentUserOrganiser ? (
                          <>
                            {status === MemberStatus.teamMember && (
                              <Button onClick={() => handleClick("remove", id)} text="Remove" loading={loading && currentAction === "remove"} />
                            )}
                            {status === MemberStatus.invite && <Button onClick={() => handleClick("cancel", id)} text="Cancel" loading={loading && currentAction === "cancel"} />}
                          </>
                        ) : (
                          <> {user?.id === member?.id && <Button onClick={() => handleClick("leave")} text="Leave" loading={loading && currentAction === "leave"} />}</>
                        )}
                      </>
                    )}
                  </div>
                );
              })}
              {canAddMembers ? (
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
                    placeholder="Enter dacade username"
                    defaultOptions={[]}
                    className="text-lg"
                    isClearable={true}
                    isDisabled={submissionsClosed}
                    loadOptions={(inputValue: string, callback: (options: Option[]) => void) => {
                      searchUserByUsername(inputValue, callback);
                    }}
                    onChange={(option) => {
                      if (!option) return;
                      if (!team?.locked) selectTeamMember(option);
                    }}
                  />
                  {error && <ErrorBox error={error} />}
                </div>
              ) : (
                <>
                  {isTeamFull && isCurrentUserOrganiser && (
                    <span className="bg-red-50 help text-sm rounded-md border border-red-100 text-red-900 px-5 py-2">Can not add more members</span>
                  )}
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
