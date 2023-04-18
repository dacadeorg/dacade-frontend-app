import React from "react";
import { useTranslation } from "next-i18next";
import { useSelector } from "@/hooks/useTypedSelector";
import LearningModuleCard from "@/components/cards/Learning";
import Section from "../../communities/_partials/Section";

export default function LearningModules() {
  const { t } = useTranslation();
  const course = useSelector((state) => state.courses.current);

  return course ? (
    <Section>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 flex-wrap">
        <div className="mt-0 md:pt-4 mr-4 flex w-full flex-col">
          <h4 className="font-medium inline-block text-.5xl">
            {t("communities.overview.learning-modules")}
          </h4>
          <span className="text-sm mt-4 mb-2 rounded-3xl max-w-xs">
            {t("communities.overview.learning-modules-description")}
          </span>
        </div>
        {course.learningModules.map((learningModule, i) => {
          return (
            <LearningModuleCard
              key={i}
              learningModule={learningModule}
            />
          );
        })}
      </div>
    </Section>
  ) : null;
}
