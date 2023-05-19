import useNavigation from "@/hooks/useNavigation";
import DateManager from "@/utilities/DateManager";
import { useRouter } from "next/router";
import { ReactElement, useMemo } from "react";

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

  const duration = useMemo(() => {
    return (value: number) => {
      if (!value) {
        return 0;
      }
      return DateManager.humanize(value, router.locale as string);
    };
  }, [router.locale]);

  const navigate = () => {
    const courseLink = navigation.community.learningModulePath(learningModule.id);
    router.push(courseLink);
  };

  return (
    <div className="px-5 pt-5 pb-8 bg-gray-50 rounded-3xl min-h-2xs w-full border-solid border-2 border-gray-100 md:mt-0">
      <div onClick={navigate} className="flex flex-col">
        <div className="w-full">
          <h4 className="font-medium block text-xl">{learningModule.title}</h4>
          {learningModule.duration && (
            <span className="text-xxs mt-4 uppercase font-semibold px-2 mb-2 bg-gray-200 rounded-3xl inline-block text-gray-500">{duration(learningModule.duration)}</span>
          )}
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
