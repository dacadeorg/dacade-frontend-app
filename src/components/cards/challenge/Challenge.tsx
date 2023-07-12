import Coin from "@/components/ui/Coin";
import ArrowButton from "@/components/ui/button/Arrow";
import Link from "next/link";


/**
 * `ChallengeCard` is a function component that renders a card
 * detailing a blockchain development challenge. The card includes
 * information about the challenge, such as its title, description,
 * reward, deadline, and related content.
 *
 * @returns {JSX.Element} The rendered ChallengeCard component.
 */
export default function ChallengeCard () {
  const link = "/communities/";

  return (
    <div className="border-solid border border-gray-200 bg-gray-50 rounded-3xl mb-5 group text-gray-700">
      <div className="border-solid border-b border-gray-300 bg-white rounded-3xl sm:p-8 sm:pb-6 w-full p-6">
        <div className="w-full">
          <div className="lg:flex mb-1">
            <div className="lg:pr-20 w-full lg:w-3/5">
              <div className="text-lg text-gray-900 font-medium leading-normal">Build a Celo dApp</div>
              <div className="text-sm mt-3 pb-2 max-w-xxs text-gray-700">
                In this course, you will learn the most important blockchain concepts that you will need to navigate the Celo ecosystem.
              </div>
              <div className="md:hidden text-xxs px-2.5 py-0.5 bg-gray-200 text-gray-500 rounded-3xl max-w-max tracking-wider mb-6.5 uppercase font-medium">Beginner</div>
            </div>

            <div className="flex flex-col mb-6 lg:mb-0 mt-6 md:mt-0 rounded-full max-w-max text-sm">
              <div className="flex items-center mb-8">
                <Coin size="medium-mini" token="NFT" />
                <div className="md:pl-2 max-w-max">
                  <div className="flex text-sm text-gray-700">
                    <span className="block font-medium pr-1">150</span>
                    <span className="block font-medium">cUSD Rewards</span>
                  </div>
                  <div className="text-gray-400 text-xs font-normal">Upon successful completion</div>
                </div>
              </div>
              <div className="flex items-center">
                <Coin size="medium" token="cUSD" />
                <div className="md:pl-2 max-w-max">
                  <div className="flex text-sm text-gray-700">
                    <span className="block font-medium  pr-1">150</span>
                    <span className="block font-medium">cUSD Rewards</span>
                  </div>
                  <div className="text-gray-400 text-xs font-normal">Upon successful completion</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="divide-y-2 divide-gray-200 divide-dotted flex flex-col">
          <div className="hidden lg:block text-xxs px-2.5 py-0.5 bg-gray-200 text-gray-500 rounded-3xl max-w-max tracking-wider mb-6.5 uppercase font-medium">Beginner</div>
          <div className="lg:flex lg:flex-row flex-col justify-between pt-6 items-center">
            <div className="text-gray-400 lg:w-2/3 text-sm font-normal mb-6 lg:mb-0">
              <span>Deadline</span>
              <span className="font-medium">March 12th, 2022</span>
            </div>

            <Link href={link}>
              <ArrowButton communityStyles={true} variant="outline-primary">
                See the challenge
              </ArrowButton>
            </Link>
          </div>
        </div>
      </div>

      <div className="sm:px-8 sm:pt-6 sm:pb-9 w-full p-6 rounded-3xl text-sm">
        <div className="mb-3 text-gray-400 font-semibold uppercase text-xxs">related content</div>
        <div className="lg:w-10/12 pb-6.5 text-gray-500 font-normal text-sm">
          <div className="mb-1.5 font-medium leading-normal">Celo Development 101</div>
          <div>In this course, you will learn the most important blockchain concepts that you will need to navigate the Celo ecosystem.</div>
        </div>
        <div className="lg:w-10/12 text-gray-500 font-normal text-sm">
          <div className="mb-1.5 font-medium leading-normal">Celo Development 101</div>
          <div>In this course, you will learn the most important blockchain concepts that you will need to navigate the Celo ecosystem.</div>
        </div>
      </div>
    </div>
  );
};

