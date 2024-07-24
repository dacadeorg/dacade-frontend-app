import Accordion from "@/components/ui/accordion/Accordion";
import Section from "@/components/sections/communities/_partials/Section";
import { LearningModuleCard } from "@/components/cards/LearningModule";
import CourseMaterial from "@/components/cards/course/CourseMaterial";
import { Course, LearningModule } from "@/types/course";
import { Community } from "@/types/community";
import { useTranslation } from "next-i18next";

/**
 * Learning component.
 *
 * @returns {JSX.Element} The Learning component JSX element.
 */
export default function Learning({ courses, learningModules, community }: { courses: Course[]; learningModules: LearningModule[]; community: Community }): JSX.Element {
  const { t } = useTranslation();
  return (
    <Section>
      <Accordion
        title="Learn"
        subtitle=""
        isExpanded
        content={
          <>
            <div className="text-base font-normal text-primary py-6">{t("communities.overview.challenge.learning.title")}</div>
            <div className={`grid grid-cols-1 gap-3 mb-3 ${courses?.length > 1 && "md:grid-cols-2"}`}>
              {courses?.map((course) => (
                <CourseMaterial
                  key={`learning-card-data-${course.id}`}
                  title={course.name}
                  description={course.description}
                  link={`/communities/${community.slug}/courses/${course.slug}`}
                  duration={course.duration}
                  level={course.level}
                  learningModulesCount={course.learningModules?.length}
                />
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {learningModules?.map((learning) => (
                <LearningModuleCard
                  key={`related-learning-card-${learning.id}`}
                  data={learning}
                />
              ))}
            </div>
          </>
        }
      />
    </Section>
  );
}
