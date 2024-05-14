import Certificate from "@/components/ui/Certificate";
import Coin from "@/components/ui/Coin";
import ArrowButton from "@/components/ui/button/Arrow";
import { Community } from "@/types/community";
import { Challenge } from "@/types/course";
import Link from "next/link";
import RelatedContent from "./RelatedContent";
import Badges from "./Badges";
import { useMemo } from "react";
import { useTranslation } from "next-i18next";
import { shortenNumber } from "@/utilities";

/**
 * `ChallengeCard` is a function component that renders a card
 * detailing a blockchain development challenge. The card includes
 * information about the challenge, such as its title, description,
 * reward, deadline, and related content.
 *
 * @returns {JSX.Element} The rendered ChallengeCard component.
 * @interface ChallengeCardProps
 */
interface ChallengeCardProps {
  data: Challenge;
  community: Community;
  isCourseEnd?: boolean;
}
export default function ChallengeCard({ data, community, isCourseEnd }: ChallengeCardProps) {
  const { t } = useTranslation();

  const link = `/communities/${community.slug}/challenges/${data.id}`;
  const expiresAt = useMemo(() => (data.expiresAt ? new Date(data.expiresAt).toLocaleDateString() : null), [data.expiresAt]);
  const reward = isCourseEnd ? data?.rewards?.find((reward) => reward.type === "SUBMISSION") : data?.reward;
  const amount = shortenNumber(data?.rewards?.reduce((acc, reward) => (acc += Number(reward.amount)), 0));

  return (
    <div className="border-solid border border-gray-200 bg-gray-50 rounded-3xl mb-5 group text-gray-700">
      <div className="border-solid border-b border-gray-300 bg-white rounded-3xl sm:p-8 sm:pb-6 w-full p-6">
        <div className="w-full">
          <div className="lg:flex mb-1">
            <div className="lg:pr-20 w-full lg:w-3/5">
              <div className="text-lg text-gray-900 font-medium leading-normal">{data.name}</div>
              <div className="text-sm mt-3 pb-2 text-gray-700">{data.description}</div>
              <Badges challenge={data} className="md:hidden" />
            </div>

            <div className="flex flex-col mb-6 lg:mb-0 mt-6 md:mt-0 max-w-max text-sm">
              <div className="flex items-center mb-8 gap-2 md:gap-0">
                <Certificate size="medium" name={community.slug} />
                <div className="md:pl-2 max-w-max">
                  <div className="flex text-sm text-gray-700">
                    <span className="block font-medium pr-1">
                      {community?.slug === "celo" && "NFT"} {t("communities.overview.challenge.certificate")}
                    </span>
                  </div>
                  <div className="text-gray-400 text-xs font-normal">Upon successful completion</div>
                </div>
              </div>
              <div className="flex items-center">
                <Coin size="medium" token={reward?.token} />
                <div className="md:pl-2 max-w-max">
                  <div className="flex text-sm text-gray-700">
                    <span className="block font-medium">
                      {data?.isHackathon ? <>{reward?.fiatCurrency ?
                        t('communities.overview.reward.fiat.prize.pool', { amount, currency: reward.fiatCurrency, token: reward?.token }) :
                        t('communities.overview.reward.crypto.prize.pool', { amount, token: reward?.token })
                      } </> : <>{amount} {reward?.token} </>}

                      {t("communities.overview.reward.title")}
                    </span>
                  </div>
                  <div className="text-gray-400 text-xs font-normal">{data?.isHackathon ? "Top projects win money prizes" : "For submission and feedback"}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="divide-y-2 divide-gray-200 divide-dotted flex flex-col">
          <Badges challenge={data} className="hidden md:flex" />
          <div className="lg:flex lg:flex-row flex-col justify-between pt-6 items-center">
            <div className="text-gray-400 lg:w-2/3 text-sm font-normal mb-6 lg:mb-0">
              {expiresAt && (
                <>
                  <span>Deadline</span>
                  <span className="font-medium pl-1">{expiresAt}</span>
                </>
              )}
            </div>

            <Link href={link}>
              <ArrowButton communityStyles={true} variant="outline-primary">
                {isCourseEnd ? "Take the challenge" : "See the challenge"}
              </ArrowButton>
            </Link>
          </div>
        </div>
      </div>

      {(data.courses?.length > 0 || data.learningModules?.length > 0) && !isCourseEnd && (
        <div className="sm:px-8 sm:pt-6 sm:pb-9 w-full p-6 rounded-3xl text-sm">
          <div className="mb-3 text-gray-400 font-semibold uppercase text-xxs">related content</div>
          {data.courses?.map((course) => (
            <RelatedContent key={course.id} content={course} />
          ))}
          {data.learningModules?.map((learningModule) => (
            <RelatedContent key={learningModule.id} content={learningModule} />
          ))}
        </div>
      )}
    </div>
  );
}
