import { ReactElement, useState, useMemo } from "react";
import Loader from "@/components/ui/button/Loader";
import EmptyState from "@/components/ui/EmptyState";
import { useTranslation } from "next-i18next";
import { useSelector } from "@/hooks/useTypedSelector";
import SubmissionCard from "@/components/cards/Submission";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch } from "@/hooks/useTypedDispatch";
import { fetchAllSubmission } from "@/store/feature/communities/challenges/submissions";
import { useRouter } from "next/router";

/**
 * Submissions list component
 * @date 4/25/2023 - 2:21:17 PM
 *
 * @export
 * @returns {ReactElement}
 */
export default function List({ setSelectedSubmission }: any): ReactElement {
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showButton, setShowButton] = useState(true);
  const { t } = useTranslation();
  const submissions = useSelector((state) => state.submissions.list);
  const router = useRouter();
  const showLoadMore = useMemo(
    () => showButton && submissions.length >= 30,
    [showButton, submissions.length]
  );

  const submissionId =
    submissions[submissions.length - 1]?.id || null;
  const dispatch = useDispatch();

  const nextPage = async () => {
    if (loading || !showButton) {
      return;
    }
    try {
      setLoading(true);
      const list = await dispatch(
        fetchAllSubmission({
          startAfter: submissionId as string,
          challengeId: router.query.challenge_id as string,
        })
      );
      setPage(page + 1);
    } catch (error) {
      console.error(error);
    } finally {
      setShowButton(false);
      setLoading(false);
    }
  };
  return (
    <>
      {submissions && submissions.length ? (
        <div className="text-xl md:text-.5xl px-0 py-5 md:py-10 md:pb-5">
          <div className="sm:border sm:border-gray-200 sm:border-solid rounded-3.5xl relative">
            <div
              className="flex flex-col divide-y"
              id="scrollableDiv"
            >
              <InfiniteScroll
                dataLength={submissions.length}
                next={nextPage}
                hasMore={showLoadMore}
                // loader is required for InfiniteScroll to work
                loader={<></>}
              >
                {submissions.map((submission: any, i: number) => (
                  <SubmissionCard
                    key={`submission-${i}`}
                    submission={submission}
                    setSelectedSubmission={setSelectedSubmission}
                  />
                ))}
              </InfiniteScroll>
            </div>
            {loading && (
              <Loader
                loading={loading}
                className="sm:absolute sm:left-6 sm:-bottom-7.5"
                onClick={() => nextPage()}
              />
            )}
          </div>
        </div>
      ) : (
        <div className="lg:w-2/3">
          <EmptyState
            title={t("submissions.empty-state.title")}
            subtitle={t("submissions.empty-state.subtitle")}
          />
        </div>
      )}
    </>
  );
}
