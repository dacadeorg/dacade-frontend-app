import { useEffect, useState } from "react";
import Avatar from "@/components/ui/Avatar";
import CloseIcon from "@/icons/close-top-right.svg";
import AsyncSelect from "react-select/async";
import { useDispatch } from "@/hooks/useTypedDispatch";
import { useSelector } from "@/hooks/useTypedSelector";
import { User } from "@/types/bounty";
import { createTeam, getTeamByChallenge } from "@/store/services/teams.service";
import { getUserByUsername } from "@/store/services/user.service";

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
  user?: User;
  status: string;
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
  user: User | null;
}

/**
 * SubmissionTeam component.
 *
 * @param {SubmissionTeamProps} props - The props for the SubmissionTeam component.
 * @returns {JSX.Element} The SubmissionTeam component JSX element.
 */

export default function SubmissionTeamCard({ index = 1, title = "", text = "" }: SubmissionTeamCardProps): JSX.Element {
  const { searchResult, challenge, user, team } = useSelector((state) => ({
    searchResult: state.user.searchUser,
    challenge: state.challenges.current,
    user: state.user.data,
    team: state.teams.current,
  }));

  const [currentOptions, setCurrentOptions] = useState<Option[]>();
  const [membersList, setMembersList] = useState<TeamCandidate[]>([]);
  const [visibleHint, setVisibleHint] = useState<"cancel" | "remove" | "">("");
  const dispatch = useDispatch();

  const filterUsers = async (username: string) => {
    await dispatch(getUserByUsername(username));

    if (searchResult && searchResult.length !== 0) {
      return searchResult.map((user) => {
        return { value: user.id, label: user.displayName, user };
      });
    } else {
      return [];
    }
  };

  const loadUserOptions = async (inputValue: string) => {
    if (inputValue.trim().length <= 4) return [];
    const data = await filterUsers(inputValue);
    setCurrentOptions(data);
    return data;
  };

  //Fetch members for the team that the current user organised if any

  useEffect(() => {
    dispatch(getTeamByChallenge(challenge?.id as string));
  }, [challenge?.id]);

  useEffect(() => {
    if (team) {
      const tempTeamMembers: TeamCandidate[] = [];
      tempTeamMembers.push({ user: team.organizer, status: "Organiser" });

      if (team.teamMembers) {
        team.teamMembers.forEach((member) => tempTeamMembers.push({ user: member.user, status: "Team member" }));
      }

      if (team.invites) {
        team.invites.forEach((invite) => tempTeamMembers.push({ user: invite.member, status: invite.invite.status }));
      }

      setMembersList(tempTeamMembers);
    }
  }, [team]);

  const selectTeamMember = async (option: Option) => {
    if (membersList.filter((member) => member.user?.displayName === option.user?.displayName).length !== 0) {
      return;
    }
    await dispatch(
      createTeam({
        challenge_id: challenge?.id,
        members: [option.user?.id],
      })
    );
  };

  const removeTeamMember = (username: string) => {
    setMembersList(membersList.filter((member) => member.user?.displayName !== username));
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

          {membersList.map(({ status, user }, index) => {
            return (
              <div className="flex items-center w-full pr-0" key={`team-member-${index}`}>
                <div className="flex space-x-1 pr-3.5">
                  <Avatar user={user} size="medium-fixed" />
                </div>
                <div className="flex flex-col">
                  <div className=" text-sm text-gray-700 font-medium">{user?.displayName}</div>
                  <div className=" text-gray-400 text-xs">{status}</div>
                </div>
                {status === "pending" ? (
                  <div
                    className="ml-auto hover:cursor-pointer relative"
                    onClick={() => removeTeamMember(user?.displayName || "")}
                    onMouseEnter={() => setVisibleHint("cancel")}
                    onMouseLeave={() => setVisibleHint("")}
                  >
                    <CloseIcon />
                    <span className={`absolute -top-8 -right-6 text-sm bg-white p-0.5 px-1.5 rounded shadow-md ${visibleHint === "cancel" ? "block" : "hidden"}`}>Cancel</span>
                  </div>
                ) : (
                  <></>
                )}
              </div>
            );
          })}
          {user?.displayName === team.organizer?.displayName || !team ? (
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
                defaultOptions={currentOptions}
                loadOptions={loadUserOptions}
                onChange={(option) => {
                  // TODO: check if the team is actually closed instead of using this condition
                  if (membersList.length < 4) {
                    if (option) selectTeamMember(option);
                  }
                }}
              />
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}
