import React from "react";
import { useSelector } from "@/hooks/useTypedSelector";
import Avatar from "@/components/ui/Avatar";

export default function Request() {
  //   const referrals = useSelector((state) => state.user.referrals.list);
  //   const previewList = referrals.slice(0, 3);

  const onClick = () => {
    // navigate to /profile/referrals
  };

  return (
    <div
      // TODO: to be uncommented when redux is ready
      //   className={`relative flex items-center ${
      //     referrals && referrals.length ? "" : "hidden"
      //   }`}
      className="relative flex items-center"
    >
      <div className="flex pr-3 cursor-pointer" onClick={onClick}>
        {/*  TODO: to be uncommented when redux is ready
        {previewList.map((referral, index: number) => (
          <Avatar
            key={index}
            className={`border-2 border-solid border-white ${
              index > 0 ? "-ml-3" : ""
            }`}
            useLink={false}
            user={referral.user}
          />
        ))} */}
      </div>
      <div></div>
      <div
        className="text-sm md:flex text-gray-500 md:font-medium font-normal relative cursor-pointer"
        onClick={onClick}
      >
        <span className="md:inline-block">
          {/* TODO: to be uncommented when redux is ready
             {referrals.length} Friends have used your invite code 
          */}
        </span>
      </div>
    </div>
  );
}
