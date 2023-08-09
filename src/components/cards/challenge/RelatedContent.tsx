import { Course, LearningModule } from "@/types/course";

/**
 * this component holds the related content basing on the course
 * @date 8/9/2023 - 6:09:31 PM
 *
 * @export
 * @param {({ content: Course | LearningModule | any })} { content }
 * @returns {*}
 */
export default function RelatedContent({ content }: { content: Course | LearningModule | any }) {
  return (
    <div className="lg:w-10/12 pb-6.5 text-gray-500 font-normal text-sm">
      <div className="mb-1.5 font-medium leading-normal">{content?.name || content?.title}</div>
      <div>{content.description}</div>
    </div>
  );
}
