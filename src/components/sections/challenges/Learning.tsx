import React from "react";
import Accordion from "@/components/ui/accordion/Accordion";
import Section from "@/components/sections/communities/_partials/Section";
import LearningCard from "@/components/cards/challenge/_partials/Learning";
import RelatedLearningCard from "@/components/cards/challenge/_partials/RelatedLearning";
import { Course, LearningModule } from "@/types/course";
import { Community } from "@/types/community";
import { useSelector } from "@/hooks/useTypedSelector";
import { useTranslation } from "next-i18next";

/**
 * Learning component.
 *
 * @returns {JSX.Element} The Learning component JSX element.
 */
export default function Learning({ courses, learningModules, community, testId }: { courses: Course[]; learningModules: LearningModule[]; community: Community, testId?: string }): JSX.Element {
  const challenge = useSelector((state) => state.challenges.current);
  const { t } = useTranslation();
  return (
    <Section>
      <Accordion
        title="Learn"
        subtitle=""
        isExpanded
        content={
          <>
            <div data-testid={testId} className="text-base font-normal text-slate-700 pt-8 pb-7 md:w-182.5">{t("communities.overview.challenge.learning.title")}</div>
            <div className="md:grid grid-cols-2 gap-3">
              {courses?.map((course) => (
                <LearningCard
                  key={`learning-card-data-${course.id}`}
                  title={course.name}
                  description={course.description}
                  link={`/communities/${community.slug}/courses/${course.slug}`}
                />
              ))}
            </div>
            <div className="md:grid grid-cols-3 gap-3">
              {learningModules?.map((learning) => (
                <RelatedLearningCard
                  key={`related-learning-card-${learning.id}`}
                  title={learning.title}
                  description={learning.description}
                  path={`/communities/${community.slug}/challenges/${challenge?.id}/learning-modules/${learning.id}`}
                />
              ))}
            </div>
          </>
        }
      />
    </Section>
  );
}
