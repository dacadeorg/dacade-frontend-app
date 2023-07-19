import React from "react";
import ArrowButton from "@/components/ui/button/Arrow";
import Link from "next/link";
import { useSelector } from "@/hooks/useTypedSelector";

/**
 * Props for the RelatedLearning component.
 */
interface RelatedLearningProps {
  /**
   * The title of the related learning material.
   */
  title: string;
  /**
   * The description of the related learning material.
   */
  description: string;
}

/**
 * Component that displays related learning material with a title, description, and "Start now" button.
 */
const RelatedLearning: React.FC<RelatedLearningProps> = ({ title, description }) => {
  const path = `/communities/`;

  return (
    <div className="flex flex-col relative w-full p-6 divide-y sm:divide-y-0 sm:divide-x divide-gray-200 rounded-3xl group text-gray-700 sm:p-7 mb-4 border-solid border border-gray-200">
      <div className="flex flex-col justify-between w-full sm:pb-0">
        <div className="flex flex-col">
          <div className="text-base font-medium leading-normal text-gray-900">{title}</div>

          <div className="text-sm font-normal text-gray-700 mt-3 max-w-xxs pb-6">{description}</div>
        </div>

        <div className="">
          <Link href={path}>
            <ArrowButton communityStyles={true} variant="outline-primary">
              Start now
            </ArrowButton>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RelatedLearning;
