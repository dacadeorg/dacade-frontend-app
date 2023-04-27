import { ReactElement, useMemo, useState } from "react";
import Section from "@/components/ui/Section";
import Loader from "@/components/ui/button/Loader";
import EmptyState from "@/components/ui/EmptyState";
import { useTranslation } from "next-i18next";
import CommunityNavigation from "@/utilities/CommunityNavigation";
import { useRouter } from "next/router";
import { useSelector } from "@/hooks/useTypedSelector";
import SubmissionCard from "@/components/cards/Submission";

/**
 * List View Page
 * @date 4/25/2023 - 2:21:17 PM
 *
 * @export
 * @returns {ReactElement}
 */
export default function List(): ReactElement {
  const router = useRouter();
  const navigation = new CommunityNavigation(router);
  const [page, setpage] = useState();
  const [loading, setloading] = useState(false);
  const [showButton, setshowButton] = useState(true);
  const { t } = useTranslation();
  const submissions = useSelector((state) => state.submissions.list);

  const showLoadMore = useMemo(
    () => showButton && submissions.length >= 30,
    [showButton, submissions.length]
  );

  const nextPage = () => {};
  return (
    <>
      {submissions && submissions.length ? (
        <div className="text-xl md:text-.5xl px-0 py-5 md:py-10 md:pb-5">
          <div className="sm:border sm:border-gray-200 sm:border-solid rounded-3.5xl relative">
            <div className="flex flex-col divide-y">
              {submissions.map((submission: any, i: number) => {
                return (
                  <SubmissionCard
                    key={`submission-${i}`}
                    submission={submission}
                  />
                );
              })}
            </div>
            {loading && (
              <Loader
                loading={loading}
                className="sm:absolute sm:left-6 sm:-bottom-7.5"
                onClick={() => nextPage()}
              />
            )}
          </div>
          {/* <InfiniteLoading
            className="invisible"
            distance={1000}
            infinite={() => nextPage()}
          ></InfiniteLoading> */}
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
