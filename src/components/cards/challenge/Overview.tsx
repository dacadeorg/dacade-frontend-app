import React from "react";
import Coin from "@/components/ui/Coin";

/**
 * Renders a container with border, rounded corners, and spacing,
 * displaying information about a challenge.
 *
 * @component
 */
export default function Overview() {
  return (
    <div className="border border-gray-200 rounded-3xl mb-5 group text-gray-700 p-6">
      <div className="text-gray-900 text-lg leading-normal">
        <span className="text-default font-medium">Already ready to complete the challenge?</span>
        <span className="ml-1.5">Build a Celo dApp</span>
      </div>
      <div className="md:flex md:flex-row flex-col rounded-full max-w-max text-sm mt-6 space-y-8 md:space-x-8 md:space-y-0">
        <div className="flex items-center">
          <Coin size="medium-mini" token="NFT" className="p-0 rounded-none" />
          <div className="text-sm md:pl-2 max-w-max">
            <div className="flex text-gray-700 font-medium">
              <span className="pr-1">150</span>
              <span>cUSD Rewards</span>
            </div>
            <div className="text-gray-400 text-xs font-normal">Upon successful completion</div>
          </div>
        </div>
        <div className="flex items-center">
          <Coin size="medium" token="cUSD" />
          <div className="text-sm md:pl-2 max-w-max">
            <div className="flex text-gray-700 font-medium">
              <span className="pr-1">150</span>
              <span>cUSD Rewards</span>
            </div>
            <div className="text-gray-400 text-xs font-normal">Upon successful completion</div>
          </div>
        </div>
      </div>
      <div className="text-gray-400 text-sm font-normal pt-6">
        <span>Deadline: </span>
        <span className="font-medium">March 12th, 2022</span>
      </div>
    </div>
  );
}
