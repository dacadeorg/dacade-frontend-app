import Section from "@/components/sections/communities/_partials/Section";
import ThemeWrapper from "@/components/wrappers/ThemeWrapper";
import Coin from "@/components/ui/Coin";
import Checkmark from "@/icons/checkmark.svg";
import { useMultiSelector } from "@/hooks/useTypedSelector";
import { useTranslation } from "next-i18next";
import classNames from "classnames";
import { ReactElement } from "react";
import { Colors, Community } from "@/types/community";
import { IRootState } from "@/store";

/**
 * interface for RubricRating multiSelector
 * @date 9/13/2023 - 9:05:04 AM
 *
 * @interface RubricRatingMultiSelector
 * @typedef {RubricRatingMultiSelector}
 */
interface RubricRatingMultiSelector {
  community: Community | null;
  colors: Colors;
}
interface RubricRatingProps {
  rubricRating?: {
    relevance: number;
    originality: number;
    quality: number;
    total: number;
    available: number;
    reward: number;
    rewardCoin: string;
    [key: string]: string | number;
  };
  hideTitle?: boolean;
}

/**
 * Rubic Rating component
 * @date 4/18/2023 - 1:05:50 PM
 *
 * @export
 * @param {RubricRatingProps} {
  rubricRating = {
    relevance: 0,
    originality: 3,
    quality: 1,
    total: 4,
    available: 20,
    reward: 5,
    rewardCoin: "CGLD",
  },
  hideTitle = false,
}
 * @returns {ReactElement}
 */
export default function RubricRating({
  rubricRating = {
    relevance: 0,
    originality: 3,
    quality: 1,
    total: 4,
    available: 20,
    reward: 5,
    rewardCoin: "CGLD",
  },
  hideTitle = false,
}: RubricRatingProps): ReactElement {
  const { t } = useTranslation();

  const { community, colors } = useMultiSelector<unknown, RubricRatingMultiSelector>({
    community: (state: IRootState) => state.communities.current,
    colors: (state: IRootState) => state.ui.colors,
  });

  return (
    <ThemeWrapper colors={colors}>
      <Section title={hideTitle ? "" : (t("communities.challenge.criteria.title") as string)}>
        {community?.challenge?.ratingCriteria.map((criteria, i) => (
          <div key={`criteria-${i}`} className="mt-8">
            <span className="block text-sm capitalize font-medium">{criteria.name}</span>
            <div className="grid grid-cols-1 space-y-4 md:space-y-0 md:grid-cols-2 lg:grid-cols-4 mt-3 gap-y-5 gap-x-5">
              {criteria.rubric.map((rubric, k) => (
                <div key={`rubic-${k}`} className="text-sm">
                  <span
                    className={classNames("font-bold leading-normal", {
                      "text-theme-accent flex": rubricRating[criteria.name] === rubric.points,
                      "text-gray-300": rubricRating[criteria.name] !== rubric.points,
                    })}
                  >
                    {rubricRating[criteria.name] === rubric.points && (
                      <div className="p-1 -ml-6">
                        <Checkmark />
                      </div>
                    )}
                    {rubric.points}
                    {t("communities.challenge.criteria.points")}
                  </span>
                  <span
                    className={classNames("block leading-normal", {
                      "text-gray-700": rubricRating[criteria.name] === rubric.points,
                      "text-gray-300": rubricRating[criteria.name] !== rubric.points,
                    })}
                  >
                    {rubric.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
        <div className="md:flex space-y-3 md:space-y-0 md:space-x-10 mt-7 font-medium">
          <div>
            <div className="text-sm leading-loose text-gray-900">{t("communities.challenge.rating.total")}</div>
            <div className="text-theme-accent">
              <span className="text-xl">12</span>
              <span className="text-sm"> 20 Points </span>
            </div>
          </div>
          <div className="md:w-1/4 w-full">
            <div className="text-sm leading-loose text-gray-900">{t("communities.challenge.rating.reward")}</div>
            <div className="text-theme-accent">
              <Coin token="CGLD" size="small" className="-ml-5" />
              <span className="text-xl">5</span>
              {t("communities.challenge.rating.symbol")}
            </div>
            <div className="text-sm font-normal leading-loose">{t("communities.challenge.rating.message")}</div>
          </div>
        </div>
      </Section>
    </ThemeWrapper>
  );
}
