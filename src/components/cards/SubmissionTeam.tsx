import React from "react";
import Avatar from "@/components/ui/Avatar";
import TextInput from "@/components/ui/TextInput";
import CloseIcon from "@/icons/close-top-right.svg";
import AsyncSelect from "react-select/async";
import { useGetUserByUsernameQuery } from "@/store/services/user.service";
import { searchUserByUsername } from "@/store/feature/user/search.slice";
import { useDispatch } from "@/hooks/useTypedDispatch";
import { useSelector } from "@/hooks/useTypedSelector";
import api from "@/config/api";
import { User } from "@/types/bounty";

/**
 * Props for the SubmissionTeam component.
 */
interface SubmissionTeamCardProps {
  index?: number | string;
  title?: string;
  text?: string;
  user: User | {};
  username?: string;
  status?: string;
  inputText: string;
}

/**
 * SubmissionTeam component.
 *
 * @param {SubmissionTeamProps} props - The props for the SubmissionTeam component.
 * @returns {JSX.Element} The SubmissionTeam component JSX element.
 */

export default function SubmissionTeamCard({ index = 1, title = "", text = "", user = {}, username, status = "" }: SubmissionTeamCardProps): JSX.Element {
  const path = `/communities/`; // This is link is not the actual link; we will replace it after it's done in the backend

  const { searchResult, challenge } = useSelector((state) => ({
    searchResult: state.search.data,
    challenge: state.challenges.current,
  }));
  const dispatch = useDispatch();
  const filterColors = async (username: string) => {
    await dispatch(searchUserByUsername(username));
    return [
      {
        value: searchResult?.id,
        label: searchResult?.displayName,
        color: "#bada55",
        isFixed: false,
      },
    ];
  };

  const promiseOptions = async (inputValue: string) => {
    if (inputValue.trim().length <= 4) return [];
    const data = await filterColors(inputValue);
    return data;
  };

  const handleOnChange = async (data) => {
    const result = await api().client.post(`/teams/create`, {
      challenge_id: challenge?.id,
      name: "string",
      members: [data.id],
    });

    console.log(result);
  };

  return (
    <div className="flex flex-col relative flex-grow p-6 divide-y sm:divide-y-0 sm:divide-x divide-gray-200 rounded-3xl group text-gray-700 sm:p-7 mb-4 border-solid border border-gray-200">
      <div className="flex flex-col justify-between w-full sm:pb-0">
        <div className="flex flex-col">
          <div className="text-lg font-medium leading-normal text-gray-900">
            <span>{index}.</span>
            <span className="ml-2">{title}</span>
          </div>
          <div className="text-sm font-normal text-gray-700 mt-3 max-w-xxs pb-6">{text}</div>
          <div className="flex items-center w-full pr-0">
            <div className="flex space-x-1 pr-3.5">
              <Avatar user={user} size="medium-fixed" />
            </div>
            <div className="flex flex-col">
              <div className=" text-sm text-gray-700 font-medium">{username}</div>
              <div className=" text-gray-400 text-xs">{status}</div>
            </div>
            <div className="ml-auto">
              <CloseIcon />
            </div>
          </div>
          <div label-for="input-text" className="pt-8">
            {/* <TextInput id="input-text" placeholder="Enter Decade user names now" className="w-full border border-solid border-gray-200 pt-1.5 text-base h-9 px-4" /> */}
            <AsyncSelect cacheOptions defaultOptions loadOptions={promiseOptions} onChange={handleOnChange} />
          </div>
        </div>
      </div>
    </div>
  );
}
