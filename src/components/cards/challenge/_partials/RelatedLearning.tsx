import React from "react";
import ArrowButton from "@/components/ui/button/Arrow";
import Link from "next/link";
import { useSelector } from "@/hooks/useTypedSelector";

interface RelatedLearningProps {
  title: string;
  description: string;
}

const RelatedLearning: React.FC<RelatedLearningProps> = ({ title, description }) => {
  const path = `/communities/`;

  return (
    <div>
      {/* Container for the related learning material */}
      <div className="flex flex-col relative p-6 divide-y sm:divide-y-0 sm:divide-x divide-gray-200 rounded-3xl group text-gray-700 sm:p-7 mb-4 border-solid border border-gray-200">
        <div className="flex flex-col justify-between w-full sm:pb-0">
          {/* Container for the title and description */}
          <div className="flex flex-col">
            {/* Title */}
            <div className="text-base font-medium leading-normal text-gray-900">{title}</div>
            {/* Description */}
            <div className="text-sm font-normal text-gray-700 mt-3 max-w-xxs pb-6">
             {description}
            </div>
          </div>
          {/* Container for the "Start now" button */}
          <div className="">
            {/* Link to the specified path */}
            <Link href={path}>
              {/* Custom ArrowButton component */}
              <ArrowButton communityStyles={true} variant="outline-primary">
                Start now
              </ArrowButton>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RelatedLearning;
