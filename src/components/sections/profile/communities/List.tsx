import SubmissionCard from "@/components/cards/Submission";
import FeedbackCard from "@/components/cards/Feedback";
import { useSelector } from "@/hooks/useTypedSelector";
import navigation from "@/config/navigation";
import { useTranslation } from "next-i18next";
import { ReactElement } from "react";

/**
 * Submission list component
 * @returns {ReactElement}
 */
export default function SubmissionList(): ReactElement {
  const { t } = useTranslation();
  const { community, submissions } = useSelector((state) => ({
    community: state.communities.current,
    // TODO: Will be uncommented when the feedback slice in implemented
    //   feedbacks: state.feedback.list,
    submissions: state.submissions.list,
  }));

  return (
    <div>
      {submissions && submissions.length ? (
        <div className="py-10">
          <p className="font-medium text-xs text-gray-600 uppercase">
            {t("communities.submissions")}
          </p>
          <div className="my-5 sm:border sm:border-gray-200 sm:border-solid rounded-3.5xl relative">
            <div className="flex flex-col divide-y">
              {submissions.map((submission, i) => (
                <SubmissionCard
                  key={submission.id}
                  stats
                  link={navigation.community.submissionPath(
                    submission.id,
                    submission.challenge.id,
                    submission.challenge.course.slug,
                    community?.slug
                  )}
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
      {/* TODO: Will be uncommented when the feedback slice is migrated */}
      {/* {feedbacks && feedbacks.length && (
        <div className="py-10">
          <p className="font-medium text-xs text-gray-600">
            {community?.challenge.feedbacks.cap}
          </p>
          <div className="my-5 sm:border sm:border-gray-200 sm:border-solid rounded-3.5xl relative">
            <div className="flex flex-col divide-y">
              {feedbacks.map((feedback) => (
                <div key={feedback.id}>
                  <SubmissionCard
                    stats={true}
                    link={`$navigation.community.submissionPath(
                      ${feedback.submission.id},
                      ${feedback.submission.challenge.id},
                      ${feedback.submission.challenge.course.slug},
                      ${community?.slug}
                    )`}
                    submission={feedback.submission}
                    last={false}
                  >
                    <div className="relative">
                      <div className="-mx-6">
                        <FeedbackCard
                          preview={true}
                          value={feedback}
                          last={true}
                        />
                      </div>
                    </div>
                  </SubmissionCard>
                </div>
              ))}
            </div>
          </div>
        </div>
      )} */}
    </div>
  );
}
