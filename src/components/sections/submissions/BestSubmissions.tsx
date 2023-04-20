import SubmissionCard from "./_partials/SubmissionCard";
import Section from "@/components/sections/communities/_partials/Section";
import ArrowButton from "@/components/ui/button/Arrow";
import { useSelector } from "@/hooks/useTypedSelector";
import CommunityNavigation from "@/utilities/CommunityNavigation";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import { useRouter } from "next/router";
import { CSSProperties } from "react";

const BestSubmissions = () => {
  const { t } = useTranslation();
  // TODO: Will be uncommented when the challenge slice is migrated
  //   const { bestSubmissions } = useSelector(
  //     (state) => state.challenges.current
  //   );
  const { community, colors } = useSelector((state) => ({
    community: state.communities.current,
    colors: state.ui.colors,
  }));
  const router = useRouter();

  const communityNavigation = new CommunityNavigation(router);

  return (
    <Section
      title="$t('communities.challenge.best-submissions.title')"
      //   show={bestSubmissions && bestSubmissions.length}
    >
      <p className="leading-normal text-sm capitalize w-64 pt-3">
        {t("communities.challenge.best-submissions.description")}
      </p>
      <div className="text-xl md:text-.5xl px-0">
        <div className="md:grid grid-cols-2 gap-5 pt-7 flex-wrap">
          {/* TODO: Will be uncommented when the challenge slice is migrated */}
          {/* {bestSubmissions.map((submission) => (
            <SubmissionCard
              key={submission.id}
              submission={submission}
            />
          ))} */}
        </div>
        <div className="text-right ml-auto xl:m-0 pt-6">
          <Link href={communityNavigation.submissionsPath("")}>
            <ArrowButton
              variant="outline-primary"
              communityStyles={true}
            >
              {t("challenge.best-submissions.button")}
            </ArrowButton>
          </Link>
        </div>
      </div>
    </Section>
  );
};

export default BestSubmissions;
