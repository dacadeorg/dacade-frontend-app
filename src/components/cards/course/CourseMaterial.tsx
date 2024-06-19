import React from "react";
import ArrowButton from "@/components/ui/button/Arrow";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { useSelector } from "react-redux";
import { IRootState } from "@/store";
import Badges from "@/components/badges";
import DurationBadge from "@/components/badges/DurationBadge";

interface CourseMaterialProps {
  title: string;
  description: string;
  link: string;
  level: number;
  learningModulesCount: number;
  duration: number;
}

/**
 * CourseMaterial component.
 *
 * @param {CourseMaterial} { title, description, link, level, learningModulesCount, duration }.
 * @returns {JSX.Element}
 */
export default function CourseMaterial({ title, description, link, level, learningModulesCount, duration }: CourseMaterialProps): JSX.Element {
  const { t } = useTranslation();
  const colors = useSelector((state: IRootState) => state.ui.colors);

  return (
    <div className="flex flex-col gap-3 relative p-6 divide-y sm:divide-y-0 sm:divide-x divide-gray-200 rounded-3xl group text-gray-700 sm:p-8 border-solid border border-gray-200">
      <div className="flex flex-col w-full">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-2">
          <div className="flex gap-2 items-center">
            <div className="h-5.5 w-5.5 rounded-sm clip-polygon" style={{ backgroundColor: colors?.primary }} />
            <span className="capitalize font-semibold text-[#4B5563] text-sm">COURSE</span>
          </div>
          <div className="flex items-center gap-2">
            <Badges courseLevel={level} className="!mb-0" />
            <DurationBadge value={duration} type="bordered" />
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <div className="text-lg font-medium leading-normal text-gray-900">{title}</div>
          <div className="text-sm font-normal text-gray-700 max-w-xxs">{description}</div>
          {learningModulesCount && (
            <p className="text-sm pb-6 font-medium text-gray-400 border-b-2 border-gray-200 border-dotted">
              {t(learningModulesCount === 1 ? "communities.overview.challenge.course.learningModule" : "communities.overview.challenge.course.learningModules", {
                count: learningModulesCount,
              })}
            </p>
          )}
        </div>
        <div className="bottom-0 mt-6">
          <Link href={link}>
            <ArrowButton communityStyles={true} variant="outline-primary">
              {t("communities.overview.challenge.learning.start")}
            </ArrowButton>
          </Link>
        </div>
      </div>
    </div>
  );
}
