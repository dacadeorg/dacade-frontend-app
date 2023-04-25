import React from "react";
import Link from "next/link";
import ArrowButton from "../ui/button/Arrow";
import { useTranslation } from "next-i18next";
import SubmissionCard from "./_partials/SubmissionCard";
import Section from "../sections/communities/_partials/Section";
import { useRouter } from "next/router";
import CommunityNavigation from "@/utilities/CommunityNavigation";

/**
 * BestSubmissions Component
 * @date 4/25/2023 - 2:21:45 PM
 *
 * @export
 * @returns {*}
 */
export default function BestSubmissions() {
  const { t } = useTranslation();
  const router = useRouter();
  const navigation = new CommunityNavigation(router);
  const challenge: any = {};
  return challenge.bestSubmissions &&
    challenge.bestSubmissions.length ? (
    <Section
      title={t("communities.challenge.best-submissions.title")}
    >
      <p className="leading-normal text-sm capitalize w-64 pt-3">
        {t("communities.challenge.best-submissions.description")}
      </p>
      <div className="text-xl md:text-.5xl px-0">
        <div className="md:grid grid-cols-2 gap-5 pt-7 flex-wrap">
          {challenge.bestSubmissions.map((submission: any) => {
            return (
              <SubmissionCard
                key={submission.id}
                submission={submission}
              />
            );
          })}
        </div>
        <div className="text-right ml-auto xl:m-0 pt-6">
          <Link href={navigation.submissionsPath()}>
            <ArrowButton
              communityStyles={true}
              variant="outline-primary"
            >
              {t("challenge.best-submissions.button")}
            </ArrowButton>
          </Link>
        </div>
      </div>
    </Section>
  ) : (
    <></>
  );
}
