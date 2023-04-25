import React, { ReactElement, useMemo, useState } from "react";
import Coin from "@/components/ui/Coin";
import { useSelector } from "@/hooks/useTypedSelector";
import { useTranslation } from "next-i18next";
import DateManager from "@/utilities/DateManager";
import ChevronBottomIcon from "@/icons/chevron-bottom.svg";
import ChevronTopIcon from "@/icons/chevron-top.svg";
import ObjectiveList from "../../list/Objectives";
import { Feedback } from "@/types/feedback";

/**
 * Criteria component
 * @date 4/25/2023 - 2:26:27 PM
 *
 * @export
 * @returns {*}
 */
export default function Criteria(): ReactElement {
  const [githubLink, setgithubLink] = useState();
  const [text, setText] = useState();
  const [infoVisibility, setinfoVisibility] = useState(false);
  const [description, setdescription] = useState(
    "This applies only if the submission reaches 6/20 Points otherwise the best feedback will get 0.5 CGLD"
  );
  const [feedBacks, setfeedBacks] = useState([
    "The best feedback receives <b>3 CGLD</b>",
    "The second feedback receives <b>1.5 CGLD</b>",
    "The third feedback receives <b>0.5 CGLD</b>",
  ]);

  const submission = useSelector(
    (state) => state.submissions.current
  );
  const challenge = useSelector((state) => state.challenges.current);

  const reward = useMemo(
    () =>
      challenge?.rewards?.find(
        (reward: { type: string }) => reward.type === "FEEDBACK"
      ),
    [challenge]
  );

  const colors = useSelector((state) => state.ui.colors);

  const activeButtonStyle = useMemo(
    () => ({
      color: colors.text,
      backgroundColor: colors.textAccent,
    }),
    [colors]
  );

  const reviewed = useMemo(
    () =>
      submission?.metadata?.evaluation ||
      submission?.metadata?.reviewed,
    [submission?.metadata?.evaluation, submission?.metadata?.reviewed]
  );

  const deadline = useMemo(
    () => DateManager.fromNow(submission?.reviewDeadline as Date),
    [submission?.reviewDeadline]
  );

  const { t } = useTranslation();

  const list = useMemo(
    () => challenge?.feedbackInfo,
    [challenge?.feedbackInfo]
  );
  return (
    <div
      className={
        reviewed
          ? "bg-gray-50 border-gray-200"
          : "bg-yellow-50 border-yellow-200" +
            " py-5 border rounded-t relative"
      }
    >
      {reward && (
        <Coin
          token={reward.token}
          className="absolute sm:-ml-7 left-3 sm:left-0 top-6 sm:top-4 w-10 h-10 sm:w-15 sm:h-15"
          bgColor={reviewed ? "#d2d2d2" : ""}
          textColor={reviewed ? "#FFFFFF" : ""}
        />
      )}
      <div className={reviewed ? "text-gray-700" : "text-yellow-900"}>
        <div className="relative">
          <div
            className={
              reviewed
                ? "divide-gray-200"
                : "divide-yellow-200" +
                  " divide-y sm:divide-y-0 space-y-4"
            }
          >
            <div className="sm:pl-10 pl-15">
              {reward && (
                <div className="font-medium text-lg">
                  {reward.amount}
                  {reward.token}
                </div>
              )}

              <div className="text-sm md">
                {t("feedback.bounty")}
                <span v-if="reviewed" className="font-medium">
                  {t("feedback.issued")}
                </span>
                <span
                  v-if="submission.reviewable"
                  className="font-medium"
                >
                  ~ {deadline}
                </span>
              </div>
            </div>
            <div
              className={
                reviewed
                  ? "divide-gray-200 "
                  : "divide-yellow-200 divide-y space-y-4 flex-inline text-base font-medium sm:right-8 sm:top-3 sm:absolute pt-4 sm:pt-0"
              }
            >
              {challenge?.feedbackInfo &&
              challenge?.feedbackInfo.length ? (
                <div
                  className="pl-15 sm:pl-0 flex items-center justify-between cursor-pointer"
                  onClick={() => {
                    setinfoVisibility(!infoVisibility);
                  }}
                >
                  <p className="text-sm">
                    {t(
                      "communities.submissions.feedback.reward-info"
                    )}
                  </p>
                  <span className="px-4">
                    {infoVisibility === true ? (
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
            {infoVisibility === true && (
              <div
                className={
                  reviewed
                    ? "border-gray-200"
                    : "border-yellow-200" + " divide-y space-y-4"
                }
              >
                {challenge?.feedbackInfo?.length ? (
                  challenge?.feedbackInfo.map(
                    (item, key: number) => {
                      return (
                        <div
                          key={`feedback-${key}`}
                          className={
                            reviewed
                              ? "border-gray-200"
                              : "border-yellow-200" +
                                " pt-6 px-3.75 sm:px-10 pb-0 sm:border-t font-medium"
                          }
                        >
                          <span className="relative block">
                            {t("feedback.criteria." + item.name)}
                          </span>
                          <div
                            className={
                              reviewed
                                ? "text-gray-600"
                                : "text-yellow-900" +
                                  " sm:-ml-6 px-5 sm:p-0"
                            }
                          >
                            <ObjectiveList
                              iconcolor={
                                reviewed ? "#9CA3AF" : "#F59E0B"
                              }
                              crossmark={!item.positive}
                              objectives={item.criteria}
                            />
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
                    }
                  )
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
