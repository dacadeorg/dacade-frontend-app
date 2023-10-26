import { ReactElement, useState, useMemo } from "react";
import Loader from "@/components/ui/button/Loader";
import EmptyState from "@/components/ui/EmptyState";
import { useTranslation } from "next-i18next";
import { useMultiSelector } from "@/hooks/useTypedSelector";
import SubmissionCard from "@/components/cards/Submission";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch } from "@/hooks/useTypedDispatch";
import { useRouter } from "next/router";
import { fetchAllSubmission } from "@/store/services/communities/challenges";
import { IRootState } from "@/store";
import { Submission } from "@/types/bounty";

interface SubmissionListMultiSelector {
  submissions: Submission[];
  hasMore: boolean;
}
/**
 * Submissions list component
 * @date 4/25/2023 - 2:21:17 PM
 *
 * @export
 * @returns {ReactElement}
 */
export default function List(): ReactElement {
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  const { submissions, hasMore } = useMultiSelector<unknown, SubmissionListMultiSelector>({
    submissions: (state: IRootState) => state.submissions.list,
    hasMore: (state: IRootState) => state.submissions.hasMore,
  });
  const router = useRouter();
  const showLoadMore = useMemo(() => hasMore && submissions.length >= 30, [hasMore, submissions.length]);
  const submissionId = submissions[submissions.length - 1]?.id || null;
  const dispatch = useDispatch();

  const nextPage = async () => {
    if (loading || !hasMore) {
      return;
    }
    try {
      setLoading(true);
      await dispatch(
        fetchAllSubmission({
          startAfter: submissionId as string,
          challengeId: router.query.challenge_id as string,
        })
      );
      setPage(page + 1);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {submissions && submissions.length ? (
        <div className="text-xl md:text-.5xl px-0 py-5 md:py-10 md:pb-5 relative">
          <InfiniteScroll
            dataLength={submissions.length}
            next={nextPage}
            hasMore={showLoadMore}
            // loader is required for InfiniteScroll to work
            loader={<></>}
            className="flex flex-col w-full overflow-hidden border border-gray-200 border-solid divide-y divide-gray-200 rounded-3xl divide-solid"
          >
            {submissions.map((submission, i) => (
              <SubmissionCard key={`submission-${i}`} submission={submission} />
            ))}
          </InfiniteScroll>
          {loading && <Loader loading={loading} className="sm:absolute sm:left-6 sm:-bottom-7.5" onClick={() => nextPage()} />}
        </div>
      ) : (
        <div className="lg:w-2/3">{!loading && <EmptyState title={t("submissions.empty-state.title")} subtitle={t("submissions.empty-state.subtitle")} />}</div>
      )}
    </>
  );
}
