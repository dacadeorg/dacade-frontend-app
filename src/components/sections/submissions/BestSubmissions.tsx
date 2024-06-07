import { ReactElement } from "react";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import SubmissionCard from "./_partials/SubmissionCard";
import { useRouter } from "next/router";
import CommunityNavigation from "@/utilities/CommunityNavigation";
import Section from "../communities/_partials/Section";
import ArrowButton from "@/components/ui/button/Arrow";
import { useSelector } from "@/hooks/useTypedSelector";
import Accordion from "@/components/ui/accordion/Accordion";

interface BestSubmissionsProps{
  testId?:string
}
/**
 * BestSubmissions Component
 * @date 4/25/2023 - 2:21:45 PM
 *
 * @export
 * @returns {ReactElement}
 */
export default function BestSubmissions({ testId }: BestSubmissionsProps): ReactElement {
  const { t } = useTranslation();
  const router = useRouter();
  const navigation = new CommunityNavigation(router);
  const challenge = useSelector((state) => state.challenges.current);

  return challenge?.bestSubmissions && challenge.bestSubmissions.length ? (
    <Section>
      <Accordion
        title={t("communities.challenge.best-submissions.title")}
        subtitle=""
        isExpanded
        content={
          <div data-testid={testId}>
            <p className="leading-normal text-sm capitalize md:w-full w-64 pt-6">{t("communities.challenge.best-submissions.description")}</p>
            <div className="text-xl md:text-.5xl px-0">
              <div className="md:grid grid-cols-2 gap-5 pt-6 flex-wrap">
                {challenge?.bestSubmissions.map((submission, index) => {
                  return <SubmissionCard key={`submission-${index}`} submission={submission} />;
                })}
              </div>
              <div className="text-right ml-auto xl:m-0 pt-6">
                <Link href={navigation.submissionsPath()}>
                  <ArrowButton communityStyles variant="outline-primary">
                    {t("challenge.best-submissions.button")}
                  </ArrowButton>
                </Link>
              </div>
            </div>
          </div>
        }
      />
    </Section>
  ) : (
    <></>
  );
}
