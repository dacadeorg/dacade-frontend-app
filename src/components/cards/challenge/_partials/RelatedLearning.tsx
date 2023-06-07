import React from "react";
import ArrowButton from "@/components/ui/button/Arrow";
import Link from "next/link";
import { useSelector } from "@/hooks/useTypedSelector";

interface RelatedLearningProps {}

const RelatedLearning: React.FC<RelatedLearningProps> = ({}) => {
  const path = `/communities/`;
  const { colors, community } = useSelector((state) => ({
    colors: state.ui.colors,
    community: state.communities.current,
  }));
  const arrowButtonStyles = {
    "--button-color--hover": colors?.text,
    "--button-background-color--hover": colors?.textAccent,
    "--button-border-color--hover": colors?.textAccent,
  };
  return (
    <div>
      <div className="flex flex-col relative p-6 divide-y sm:divide-y-0 sm:divide-x divide-gray-200 rounded-3xl group text-gray-700 sm:p-7 mb-4 border-solid border border-gray-200">
        <div className="flex flex-col justify-between w-full sm:pb-0">
          <div className="flex flex-col">
            <div className="text-base font-medium leading-normal text-gray-900">Related learning material</div>
            <div className="text-sm font-normal text-gray-700 mt-3 max-w-xxs pb-6">
              In this course, you will learn the most important blockchain concepts that you will need to navigate the Celo ecosystem.
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
    </div>
  );
};

export default RelatedLearning;
