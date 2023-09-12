import Section from "@/components/sections/communities/_partials/Section";
import Header from "@/components/sections/communities/_partials/Header";
import ObjectiveList from "@/components/list/Objectives";
import { useMultiSelector } from "@/hooks/useTypedSelector";
import { useTranslation } from "next-i18next";
import { ReactElement } from "react";
import { Course, LearningModule } from "@/types/course";
import { IRootState } from "@/store";

interface LearningModuleHeaderMultiSelector {
  course: Course | null;
  learningModule: LearningModule | null;
}

/**
 * Learning module header component
 * @date 4/18/2023 - 5:05:14 PM
 *
 * @returns {ReactElement}
 */
export default function LearningModuleHeader(): ReactElement {
  const { t } = useTranslation();
  // const { course, learningModule } = useSelector((state) => ({
  //   course: state.courses.current,
  //   learningModule: state.learningModules.current,
  // }));
  const { course, learningModule } = useMultiSelector<unknown, LearningModuleHeaderMultiSelector>({
    course: (state: IRootState) => state.courses.current,
    learningModule: (state: IRootState) => state.learningModules.current,
  });

  return (
    <div>
      <Header hideTitleOnMobile title={course?.name} subtitle={learningModule?.title} description={learningModule?.description} />
      <Section title={`${t("communities.overview.objective.title")}`} subtitle={`${t("communities.chapter.objective.subtitle")}`} hideSubtitleOnMobile>
        <ObjectiveList objectives={learningModule?.objectives} />
      </Section>
    </div>
  );
}
