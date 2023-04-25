import React, { useMemo, useState } from "react";
import Section from "../ui/Section";
import SubmissionCard from "./_partials/SubmissionCard";
import Loader from "../ui/button/Loader";
import EmptyState from "../ui/EmptyState";
import { useTranslation } from "next-i18next";
import CommunityNavigation from "@/utilities/CommunityNavigation";
import { useRouter } from "next/router";

/**
 * List View Page
 * @date 4/25/2023 - 2:21:17 PM
 *
 * @export
 * @returns {*}
 */
export default function List() {
  const router = useRouter();
  const navigation = new CommunityNavigation(router);
  const { t } = useTranslation();
  const submissions: any = [];

  const showLoadMore = useMemo(
    () => showButton && submissions.length >= 30,
    []
  );

  const [page, setpage] = useState();
  const [loading, setloading] = useState(false);
  const [showButton, setshowButton] = useState(true);

  const nextPage = () => {};
  return (
    <Section key={page}>
      {submissions && submissions.length ? (
        <div>
          <div className="sm:border sm:border-gray-200 sm:border-solid rounded-3.5xl relative">
            <div className="flex flex-col divide-y">
              {submissions.map((submission: any, i: number) => {
                return (
                  <SubmissionCard
                    key={submission.id}
                    preview={true}
                    link={navigation.submissionPath(submission.id)}
                    submission={submission}
                    last={
                      i === submissions.length - 1 && !showLoadMore
                    }
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
        <div v-else className="lg:w-2/3">
          <EmptyState
            title={t("submissions.empty-state.title")}
            subtitle={t("submissions.empty-state.subtitle")}
          />
        </div>
      )}
    </Section>
  );
}
