import React from "react";
import RewardsSection from "./Rewards";
import ObjectivesSection from "./Objectives";
import PrerequisiteSection from "./Prerequisite";
import DisclaimerSection from "./Disclaimer";
import TrailerSection from "./Trailer";
import LearningModulesSection from "./LearningModules";
import ChallengeSection from "./Challenge";
import Header from "@/components/sections/communities/_partials/Header";
import PageNavigation from "../PageNavigation";
import { useSelector } from "@/hooks/useTypedSelector";

/**
 * Overview component
 * @date 4/18/2023 - 12:24:38 PM
 *
 * @export
 * @returns {*}
 */
export default function Overview() {
  const course = useSelector((state) => state.courses.current);

  return course ? (
    <div className="flex flex-col divide-y divide-solid divide-gray-200 lg:py-5 space-y-8 text-gray-700">
      <Header title={course.name} description={course.description} />
      <RewardsSection />
      <ObjectivesSection />
      <PrerequisiteSection />
      <DisclaimerSection />
      <TrailerSection />
      <LearningModulesSection />
      <ChallengeSection />
      <PageNavigation />
    </div>
  ) : null;
}
