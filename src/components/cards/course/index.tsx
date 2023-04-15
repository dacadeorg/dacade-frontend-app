import Reward from "@/components/cards/course/_partials/Reward";
import Avatar from "@/components/ui/Avatar";
import ArrowButton from "@/components/ui/button/Arrow";
// TODO: Should be uncommented when redux is implemented
// import { useSelector } from "react-redux";
// import { RootState } from "@/store";
import { Community } from "@/types/community";
import { Course } from "@/types/course";
import Link from "next/link";
import { ReactElement } from "react";
import { useTranslation } from "next-i18next";

/**
 * Course card component props
 * @date 3/30/2023 - 1:19:07 PM
 *
 * @interface CourseCardProps
 * @typedef {CourseCardProps}
 */

interface CourseCardProps {
  course: Course;
  community: Community;
}

/**
 * Course card component
 * @date 3/30/2023 - 1:18:16 PM
 *
 * @export
 * @param {CourseCardProps} {
  course,
  community,
}
 * @returns {ReactElement}
 */

export default function CourseCard({
  course,
  community,
}: CourseCardProps): ReactElement {
  // TODO: Should be uncommented when redux is implemented
  //   const colors = useSelector((state: RootState) => state.ui.colors);
  const { t } = useTranslation();
  const path = `/communities/${community.slug}/courses/${course.slug}`;

  const reward = course?.challenge?.rewards?.find(
    // TODO: Should be refactored when we have the exact type of the course
    (entity) => entity.type === "SUBMISSION"
  );

  return (
    <div className="flex flex-col sm:flex-row p-6 divide-y sm:divide-y-0 sm:divide-x divide-gray-200 bg-gray-50 rounded-3xl group text-gray-700 sm:p-7 mb-4 w-full border-solid border border-gray-200">
      <div className="flex flex-col sm:pr-20 justify-between w-full sm:w-3/5 lg:w-2/3 pb-6 sm:pb-0">
        <div className="flex flex-col">
          <div className="text-lg font-medium leading-normal">
            {course.name}
          </div>
          {course.level && (
            <div className="mt-2 text-xxs px-2.5 py-0.5 bg-gray-200 text-gray-500 rounded-3xl max-w-max tracking-wider uppercase font-medium">
              {t(`course.challenge.level-${course.level}`)}
            </div>
          )}
          <div className="text-sm mt-3 pb-2 max-w-xxs">
            {course.description}
          </div>
        </div>
        <div className="hidden sm:block">
          <Link href={path}>
            <ArrowButton
              community-styles={true}
              variant="outline-primary"
            >
              {t("course.challenge.button")}
            </ArrowButton>
          </Link>
        </div>
      </div>

      {reward ? (
        <div className="text-base text-left sm:flex flex-start flex flex-col pt-6 sm:pt-0 space-y-4 pb-5 sm:pl-7 sm:pb-10 w-full sm:w-2/5 lg:w-1/3 tracking-wider">
          <Reward reward={reward} />
          <div className="font-light text-sm max-w-xs pb-2 text-gray-700">
            {t(
              reward.stable
                ? "course.challenge.reward.stable.description"
                : "course.challenge.reward.description",
              {
                currency: `$`,
                amount: reward.amount,
                token: reward.token,
              }
            )}
          </div>
        </div>
      ) : (
        <div className="text-base text-left sm:flex flex-start flex flex-col pt-6 sm:pt-0 space-y-4 pb-5 sm:pl-7 sm:pb-10 w-full sm:w-2/5 lg:w-1/3 tracking-wider">
          <span className="text-xxs tracking-wider px-1 font-semibold uppercase text-gray-500">
            {t(`course.challenge.certificate`)}
          </span>
          <Avatar
            icon={community.icon}
            color={community.colors.primary}
            size="large"
            shape="rounded-3xl"
            user={null}
          />
          <div className="font-light text-sm max-w-xs pb-2 text-gray-700">
            <p>{t("course.challenge.certificate.description")}</p>
          </div>
        </div>
      )}

      <div className="block sm:hidden pt-6">
        <Link href={path}>
          <ArrowButton
            community-styles={true}
            variant="outline-primary"
          >
            {t("course.challenge.button")}
          </ArrowButton>
        </Link>
      </div>
    </div>
  );
}
