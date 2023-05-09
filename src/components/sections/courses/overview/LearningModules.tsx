import { useTranslation } from "next-i18next";
import { useSelector } from "@/hooks/useTypedSelector";
import LearningModuleCard from "@/components/cards/Learning";
import Section from "../../communities/_partials/Section";
import { ReactElement } from "react";

/**
 * LearningModules component
 * @date 4/18/2023 - 12:24:45 PM
 *
 * @export
 * @returns {ReactElement}
 */
export default function LearningModules(): ReactElement {
  const { t } = useTranslation();
  const course = useSelector((state) => state.courses.current);

  // console.log(course);
  return (
    <>
      {course ? (
        <Section>
          <div className="grid flex-wrap grid-cols-1 gap-5 sm:grid-cols-2">
            <div className="flex flex-col w-full mt-0 mr-4 md:pt-4">
              <h4 className="font-medium inline-block text-.5xl">
                {t("communities.overview.learning-modules")}
              </h4>
              <span className="max-w-xs mt-4 mb-2 text-sm rounded-3xl">
                {t(
                  "communities.overview.learning-modules-description"
                )}
              </span>
            </div>
            {course.learningModules &&
              course.learningModules.map((learningModule, index) => {
                return (
                  <LearningModuleCard
                    key={`module-${index}`}
                    learningModule={learningModule}
                  />
                );
              })}
          </div>
        </Section>
      ) : (
        <></>
      )}
    </>
  );
}
