import FeedbackCard from "@/components/cards/Feedback";
import { useSelector } from "@/hooks/useTypedSelector";
import useNavigation from "@/hooks/useNavigation";

import { useTranslation } from "next-i18next";
import { ReactElement } from "react";
import SubmissionCard from "@/components/cards/Submission";

/**
 * Submission list component
 * @returns {ReactElement}
 */
export default function SubmissionList(): ReactElement {
  const { t } = useTranslation();
  const { community, submissions, feedbacks } = useSelector((state) => ({
    community: state.profileCommunities.current,
    feedbacks: state.profileCommunities.feedbacks,
    submissions: state.profileCommunities.submissions,
  }));

  const navigation = useNavigation();

  return (
    <div>
      {submissions && submissions.length !== 0 ? (
        <div className="py-10">
          <p className="font-medium text-xs text-gray-600 uppercase">{t("communities.submissions")}</p>
          <div className="my-5 sm:border sm:border-gray-200 sm:border-solid rounded-3.5xl relative">
            <div className="flex flex-col divide-y">
              {submissions.map((submission, i) => (
                <SubmissionCard
                  key={submission.id}
                  stats
                  link={navigation.community.submissionPath(submission.id, submission.challenge.id, community?.slug)}
                  submission={submission}
                  last={i === submissions.length - 1}
                />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
      {feedbacks && feedbacks.length !== 0 && (
        <div className="py-10">
          <p className="font-medium text-xs text-gray-600">{t("communities.challenge.feedbacks.cap")}</p>
          <div className="my-5 sm:border sm:border-gray-200 sm:border-solid rounded-3.5xl relative">
            <div className="flex flex-col divide-y">
              {feedbacks.map((feedback) => (
                <div key={feedback.id}>
                  <SubmissionCard
                    stats={true}
                    link={navigation.community.submissionPath(feedback.submission?.id, feedback.submission?.challenge.id, community?.slug)}
                    submission={feedback.submission}
                    last={false}
                  >
                    <div className="relative">
                      <div className="-mx-6">
                        <FeedbackCard preview={true} value={feedback} last={true} />
                      </div>
                    </div>
                  </SubmissionCard>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
