import { ReactElement, useMemo, useState } from "react";
import Coin from "@/components/ui/Coin";
import { useMultiSelector } from "@/hooks/useTypedSelector";
import { useTranslation } from "next-i18next";
import DateManager from "@/utilities/DateManager";
import ChevronBottomIcon from "@/icons/chevron-bottom.svg";
import ChevronTopIcon from "@/icons/chevron-top.svg";
import ObjectiveList from "../../list/Objectives";
import classNames from "classnames";
import { IRootState } from "@/store";
import { Submission } from "@/types/bounty";
import { Challenge } from "@/types/course";
import { Colors } from "@/types/community";

interface CriteriaMultiSelector {
  submission: Submission | null;
  challenge: Challenge | null;
  colors: Colors;
}

/**
 * Criteria component
 * @date 4/25/2023 - 2:26:27 PM
 *
 * @export
 * @returns {*}
 */
export default function Criteria(): ReactElement {
  const { t } = useTranslation();
  const [infoVisibility, setinfoVisibility] = useState(false);
  // const { submission, challenge } = useSelector((state) => ({
  //   submission: state.submissions.current,
  //   challenge: state.challenges.current,
  //   colors: state.ui.colors,
  // }));

  const { submission, challenge } = useMultiSelector<unknown, CriteriaMultiSelector>({
    submission: (state: IRootState) => state.submissions.current,
    challenge: (state: IRootState) => state.challenges.current,
    colors: (state: IRootState) => state.ui.colors,
  });

  const reward = useMemo(() => challenge?.rewards?.find((reward: { type: string }) => reward.type === "FEEDBACK"), [challenge]);
  const reviewed = useMemo(() => submission?.metadata?.evaluation || submission?.metadata?.reviewed, [submission?.metadata?.evaluation, submission?.metadata?.reviewed]);
  const deadline = useMemo(() => DateManager.fromNow(submission?.reviewDeadline as Date), [submission?.reviewDeadline]);

  return (
    <div className={`py-5 border rounded-t relative ${reviewed ? "bg-gray-50 border-gray-200" : "bg-yellow-50 border-yellow-200"}`}>
      {reward && (
        <div className="absolute sm:-ml-7 left-3 sm:left-0 top-6 sm:top-4">
          <Coin token={reward.token} className="w-10 h-10 sm:w-15 sm:h-15" bgColor={reviewed ? "#d2d2d2" : ""} textColor={reviewed ? "#000000" : ""} />
        </div>
      )}
      <div className={reviewed ? "text-gray-700" : "text-yellow-900"}>
        <div className="relative">
          <div className={`divide-y sm:divide-y-0 space-y-4 ${reviewed ? "divide-gray-200" : "divide-yellow-200 "}`}>
            <div className="sm:pl-10 pl-15">
              {reward && (
                <div className="font-medium text-lg">
                  {reward.amount} {reward.token}
                </div>
              )}

              <div className="text-sm md">
                {t("feedback.bounty")}

                {reviewed && <span className="font-medium ml-0.5">{t("feedback.issued")}</span>}
                {submission?.reviewable && <span className="font-medium">~ {deadline}</span>}
              </div>
            </div>
            <div
              className={classNames("divide-y space-y-4 flex-inline text-base font-medium sm:right-8 sm:top-3 sm:absolute pt-4 sm:pt-0", {
                "divide-yellow-200": !reviewed,
                "divide-gray-200": reviewed,
              })}
            >
              {challenge?.feedbackInfo && challenge?.feedbackInfo.length ? (
                <div
                  className="pl-15 sm:pl-0 flex items-center justify-between cursor-pointer"
                  onClick={() => {
                    setinfoVisibility(!infoVisibility);
                  }}
                >
                  <p className="text-sm">{t("communities.submissions.feedback.reward-info")}</p>
                  <span className="px-4">
                    {infoVisibility ? (
                      <div>
                        <ChevronTopIcon />
                      </div>
                    ) : (
                      <div>
                        <ChevronBottomIcon />
                      </div>
                    )}
                  </span>
                </div>
              ) : (
                <></>
              )}
            </div>
            {infoVisibility && (
              <div className={`divide-y space-y-4 ${reviewed ? "border-gray-200" : "border-yellow-200 "}`}>
                {challenge?.feedbackInfo?.length ? (
                  challenge?.feedbackInfo.map((item, key: number) => {
                    return (
                      <div key={`feedback-${key}`} className={`pt-6 px-3.75 sm:px-10 pb-0 sm:border-t font-medium ${reviewed ? "border-gray-200" : "border-yellow-200 "}`}>
                        <span className="relative block">{t(`feedback.criteria.${item.name}`)}</span>
                        <div className={`sm:-ml-6 px-5 sm:p-0 ${reviewed ? "text-gray-600" : "text-yellow-900 "}`}>
                          <ObjectiveList iconcolor={reviewed ? "#9CA3AF" : "#F59E0B"} crossmark={!item.positive} objectives={item.criteria} />
                          {item.description && (
                            <div
                              className="mt-4 text-sm font-normal"
                              dangerouslySetInnerHTML={{
                                __html: item.description,
                              }}
                            />
                          )}
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <></>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
