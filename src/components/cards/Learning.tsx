import useNavigation from "@/hooks/useNavigation";
import { useRouter } from "next/router";
import { ReactElement } from "react";
import { DurationCard } from "../badges/Duration";

/**
 * LearningModule interface
 * @date 3/29/2023 - 6:37:46 PM
 *
 * @interface LearningModule
 * @typedef {LearningModule}
 */
interface LearningModule {
  id: string;
  title: string;
  duration: number;
  description: string;
}
/**
 *
 * Learning component props interface
 * @date 3/29/2023 - 6:35:38 PM
 *
 * @interface LearningProps
 * @typedef {LearningProps}
 */
interface LearningProps {
  learningModule: LearningModule;
}

/**
 * Learing card component
 * @date 3/29/2023 - 6:36:06 PM
 *
 * @export
 * @param {LearningProps} { learningModule }
 * @returns {ReactElement}
 */
export default function Learning({ learningModule }: LearningProps): ReactElement {
  const router = useRouter();
  const navigation = useNavigation();

  const navigate = () => {
    const courseLink = navigation.community.learningModulePath(learningModule.id);
    router.push(courseLink);
  };

  return (
    <div className="px-5 pt-5 pb-8 bg-gray-50 rounded-3xl min-h-2xs w-full border-solid border-2 border-gray-100 md:mt-0 cursor-pointer">
      <div onClick={navigate} className="flex flex-col">
        <div className="w-full">
          <h4 className="font-medium block text-xl mb-4">{learningModule.title}</h4>
          {learningModule.duration && <DurationCard type="bordered" value={learningModule.duration} />}
        </div>
        {learningModule.description && (
          <span className="text-sm mt-4 rounded-3xl">
            <p className="line-clamp-3">{learningModule.description}</p>
          </span>
        )}
      </div>
    </div>
  );
}
