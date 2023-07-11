import React from 'react'
import ArrowButton from "@/components/ui/button/Arrow";
import Link from "next/link";

/**
 * Props for the FormTeam component.
 */
interface FormTeamCardProps {
    title: string;
    description: string;
    index: number;
  }
  
  /**
   * FormTeam component.
   *
   * @param {FormTeamProps} props - The props for the FormTeam component.
   * @returns {JSX.Element} The FormTeam component JSX element.
   */

export default function FormTeamCard ({ index = 1, title, description }: FormTeamCardProps): JSX.Element {
    const path = `/communities/`; // This is link is not the actual link; we will replace it after it's done in the backend
  return (
    <div className="flex flex-col relative md:w-1/2 p-6 divide-y sm:divide-y-0 sm:divide-x divide-gray-200 rounded-3xl group text-gray-700 sm:p-7 mb-4 border-solid border border-gray-200">
      <div className="flex flex-col justify-between w-full sm:pb-0">
        <div className="flex flex-col">
          <div className="text-lg font-medium leading-normal text-gray-900">
           <span>{index}.</span> <span className='ml-2'>{title} </span>
          </div>
          <div className="text-sm font-normal text-gray-700 mt-3 max-w-xxs pb-6">
            {description} 
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
  )
}
