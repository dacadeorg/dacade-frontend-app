import { useEffect, useState } from "react";
import Avatar from "@/components/ui/Avatar";
import CloseIcon from "@/icons/close-top-right.svg";
import AsyncSelect from "react-select/async";
import { searchUserByUsername } from "@/store/feature/user/search.slice";
import { useDispatch } from "@/hooks/useTypedDispatch";
import { useSelector } from "@/hooks/useTypedSelector";
import { User } from "@/types/bounty";
import { createTeam } from "@/store/feature/teams.slice";

/**
 * Props for the SubmissionTeam component.
 */
interface SubmissionTeamCardProps {
  index?: number | string;
  title?: string;
  text?: string;
  inputText: string;
}

/**
 * Interface for the team members
 * @date 7/26/2023 - 9:59:13 AM
 *
 * @interface TeamCandidate
 * @typedef {TeamCandidate}
 */
interface TeamCandidate {
  user: User | null;
  username?: string;
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
    searchResult: state.search.data,
    challenge: state.challenges.current,
    user: state.user.data,
    team: state.teams.current,
  }));

  const [currentOptions, setCurrentOptions] = useState<Option[]>();
  const [membersList, setMembersList] = useState<TeamCandidate[]>([]);
  const [visibleHint, setVisibleHint] = useState<"cancel" | "remove" | "">("");
  const dispatch = useDispatch();

  const filterUsers = async (username: string) => {
    await dispatch(searchUserByUsername(username));

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

  //Fetch members for the team that the current usr organised if any
  useEffect(() => {
    if (team.teamMembers) {
      setMembersList(
        team.teamMembers.map((member) => {
          return { user: member.user, status: "accepted", username: member.user.displayName };
        })
      );
    }
  }, [challenge?.id, team.teamMembers]);

  const handleMemberSelect = async (option: Option) => {
    if (membersList.filter((member) => member.username === option.user?.displayName).length === 0) {
      setMembersList([...membersList, { user: option.user, username: option.label, status: "pending" }]);
    }
    if (membersList.length > 2) {
      const allMembersId = membersList.map((member) => member.user?.id || "");
      try {
        const result = await dispatch(
          createTeam({
            challenge_id: challenge?.id,
            name: "sevennth created team",
            members: allMembersId,
          })
        );
        // TODO: add the notification for after the team has been created
      } catch (Error) {
        console.log("Error within creating the team", Error);
      }
    }
  };

  const handleMemberRemove = (username: string) => {
    setMembersList([...membersList.filter((member) => member.username !== username)]);
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
          <div className="flex items-center w-full pr-0">
            <div className="flex space-x-1 pr-3.5">
              <Avatar user={user} size="medium-fixed" />
            </div>
            <div className="flex flex-col">
              <div className=" text-sm text-gray-700 font-medium">{user?.displayName}</div>
              <div className=" text-gray-400 text-xs">Organiser</div>
            </div>
          </div>
          {membersList.map((member, index) => {
            const { username, status, user } = member;
            return (
              <div className="flex items-center w-full pr-0" key={`team-member-${index}`}>
                <div className="flex space-x-1 pr-3.5">
                  <Avatar user={user} size="medium-fixed" />
                </div>
                <div className="flex flex-col">
                  <div className=" text-sm text-gray-700 font-medium">{username}</div>
                  <div className=" text-gray-400 text-xs">{status}</div>
                </div>
                {username && status === "pending" ? (
                  <div
                    className="ml-auto hover:cursor-pointer relative"
                    onClick={() => handleMemberRemove(username)}
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
          {membersList.length >= 2 && <div className="text-sm font-normal text-red-700 max-w-xxs pb-2 text-center">Team invites can only be sent to 2 users</div>}

          <div label-for="input-text" className="">
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
                if (membersList.length < 2) {
                  if (option) handleMemberSelect(option);
                }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
