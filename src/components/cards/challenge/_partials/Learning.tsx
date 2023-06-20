import React from "react";
import ArrowButton from "@/components/ui/button/Arrow";
import Link from "next/link";

interface LearningProps {
  title: string;
  description: string;
}

export default function Learning({ title, description }: LearningProps) {
  const path = `/communities/`; // This is link is not the actual link; we will replace it after it's done in the backend

  return (
    <div className="flex flex-col relative md:w-1/2 p-6 divide-y sm:divide-y-0 sm:divide-x divide-gray-200 rounded-3xl group text-gray-700 sm:p-7 mb-4 border-solid border border-gray-200">
      <div className="flex flex-col justify-between w-full sm:pb-0">
        <div className="flex flex-col">
          <div className="text-lg font-medium leading-normal text-gray-900">
            {title} {/* Title */}
          </div>
          <div className="text-sm font-normal text-gray-700 mt-3 max-w-xxs pb-6">
            {description} {/* Description */}
          </div>
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
}
