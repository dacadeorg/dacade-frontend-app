import Duration from "../_partials/Duration";
import { useTranslation } from "next-i18next";
import Video from "@/components/ui/Video";
import ObjectiveList from "@/components/list/Objectives";
import Section from "../../communities/_partials/Section";
import { useSelector } from "@/hooks/useTypedSelector";
import { ReactElement } from "react";

/**
 * Trailer component
 * @date 4/18/2023 - 12:25:12 PM
 *
 * @export
 * @returns {ReactElement}
 */
export default function Trailer(): ReactElement {
  const { t } = useTranslation();
  const course = useSelector((state) => state.courses.current);

  return (
    <>
      {course && course.trailer && course.trailer.video ? (
        <Section title={t("communities.overview.trailer")}>
          <Duration text={t("communities.overview.trailer.video")} value={course.trailer.duration} />
          <div className="block text-lg mt-3 mb-4.5">{course.trailer.summary}</div>
          <Video className="-mx-0 md:w-full md:mx-auto" url={course.trailer.video} />

          {course.trailer.description && (
            <div
              dangerouslySetInnerHTML={{
                __html: course.trailer.description,
              }}
              className="block max-w-full mt-4 text-lg prose"
            />
          )}

          <div v-if="course.trailer.info" className="w-full max-w-full pt-6 prose">
            <span className="block mt-2 text-lg prose">{course.trailer?.info?.title}</span>
            <ObjectiveList objectives={course.trailer?.info?.items} />
          </div>
        </Section>
      ) : (
        <></>
      )}
    </>
  );
}
