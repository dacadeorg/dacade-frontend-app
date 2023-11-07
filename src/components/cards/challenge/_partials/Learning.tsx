import React from "react";
import ArrowButton from "@/components/ui/button/Arrow";
import Link from "next/link";
import { useTranslation } from "next-i18next";

/**
 * Props for the Learning component.
 */
interface LearningProps {
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
    <div className="flex flex-col relative md:w-1/2s p-6 divide-y sm:divide-y-0 sm:divide-x divide-gray-200 rounded-3xl group text-gray-700 sm:p-7 mb-4 border-solid border border-gray-200">
      <div className="flex flex-col justify-between w-full sm:pb-0">
        <div className="flex flex-col">
          <div className="text-lg font-medium leading-normal text-gray-900">{title}</div>
          <div className="text-sm font-normal text-gray-700 mt-3 max-w-xxs pb-6">{description}</div>
        </div>
        <div className="absolute bottom-0 pb-2">
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
