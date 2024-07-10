import React from "react";
import ArrowButton from "@/components/ui/button/Arrow";
import Link from "next/link";
import { useTranslation } from "next-i18next";

/**
 * Props for the Learning component.
 */
export interface LearningProps {
  title: string;
  description: string;
  link: string;
}

/**
 * Learning component.
 *
 * @param {LearningProps} props - The props for the Learning component.
 * @returns {JSX.Element} The Learning component JSX element.
 */
export default function Learning({ title, description, link }: LearningProps): JSX.Element {
  // This is link is not the actual link; we will replace it after it's done in the backend
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-3 relative p-6 divide-y sm:divide-y-0 sm:divide-x divide-gray-200 rounded-3xl group text-gray-700 sm:p-7 border-solid border border-gray-200"
    data-testid="learning-component"
    >
      <div className="flex flex-col justify-between w-full sm:pb-0">
        <div className="flex flex-col">
          <div className="text-base font-medium leading-6 text-gray-900"  data-testid="learning-title">{title}</div>
          <div className="text-sm lg:text-base font-normal -tracking-1 leading-6 text-gray-700 mt-3 max-w-xxs pb-6 mb-5"  data-testid="learning-description">{description}</div>
        </div>
        <div className="absolute bottom-0 pb-4">
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
