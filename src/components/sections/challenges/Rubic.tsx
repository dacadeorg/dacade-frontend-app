import Section from "@/components/sections/communities/_partials/Section";
import { useSelector } from "@/hooks/useTypedSelector";
import Checkmark from "@/icons/checkmark.svg";
import { Rubic } from "@/types/course";
import { RatingCriteria } from "@/types/course";
import { useTranslation } from "next-i18next";
import { ReactElement } from "react";

/**
 * Rubic header component props interface
 * @date 4/18/2023 - 4:00:52 PM
 *
 * @interface RubricHeaderProps
 * @typedef {RubricHeaderProps}
 */
interface RubricHeaderProps {
  ratingCriteria: RatingCriteria[];
  selected: Rubic[];
  hideTitle?: boolean;
}

/**
 * Rubic Header components
 * @date 4/18/2023 - 4:00:38 PM
 *
 * @export
 * @param {RubricHeaderProps} {
  ratingCriteria,
  selected,
  hideTitle = false,
}
 * @returns {ReactElement}
 */
export default function RubricHeader({ ratingCriteria, selected, hideTitle = false }: RubricHeaderProps): ReactElement {
  const { t } = useTranslation();
  const colors = useSelector((state) => state.ui.colors);

  const selectedRubric = (id: string) => {
    return selected.find((rubric) => rubric.id === id);
  };

  return (
    <Section title={!hideTitle ? (t("communities.challenge.criteria.title") as string) : ""}>
      {ratingCriteria.map((criteria, i) => (
        <div key={`rating-criteria-item-${i}`} className="mt-8">
          <span className="block text-sm capitalize font-medium">{criteria.name}</span>
          <div className="grid grid-cols-1 space-y-4 md:space-y-0 md:grid-cols-2 lg:grid-cols-4 mt-3 gap-y-5 gap-x-5">
            {criteria.rubric.map((rubric, k) => (
              <div key={`criteria-rubic-item-${k}`} className={`text-sm ${selected.length && !selectedRubric(rubric.id) ? "opacity-40" : "relative"}`}>
                {selectedRubric(rubric.id) && (
                  <span className="absolute -left-6 top-1 w-3" style={{ color: colors.textAccent }}>
                    <Checkmark />
                  </span>
                )}
                <span className="block font-bold leading-normal" style={{ color: colors.textAccent }}>
                  {selectedRubric(rubric.id) ? selectedRubric(rubric.id)?.points : rubric.points}
                  {t("communities.challenge.criteria.points")}
                </span>
                <span className="block leading-normal">{rubric.text}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </Section>
  );
}
