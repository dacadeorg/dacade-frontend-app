import React from "react";
import Duration from "../_partials/Duration";
import { useTranslation } from "next-i18next";
import Video from "@/components/ui/Video";
import ObjectiveList from "@/components/list/Objectives";
import Section from "../../communities/_partials/Section";
import { useSelector } from "@/hooks/useTypedSelector";

/**
 * Trailer component
 * @date 4/18/2023 - 12:25:12 PM
 *
 * @export
 * @returns {*}
 */
export default function Trailer() {
  const { t } = useTranslation();

  const course = useSelector((state) => state.courses.current);

  return course && course.trailer && course.trailer.video ? (
    <Section title={t("communities.overview.trailer")}>
      <Duration
        className="-mt-1"
        text={t("communities.overview.trailer.video")}
        duration={course.trailer.duration}
      />
      <div className="block text-lg mt-3 mb-4.5">
        {course.trailer.summary}
      </div>
      <Video
        className="-mx-0 md:w-full md:mx-auto"
        url={course.trailer.video}
      />

      {course.trailer.description && (
        <div
          dangerouslySetInnerHTML={{
            __html: course.trailer.description,
          }}
          className="block text-lg mt-4 prose max-w-full"
        />
      )}

      <div
        v-if="course.trailer.info"
        className="prose pt-6 w-full max-w-full"
      >
        <span className="block text-lg mt-2 prose">
          {course.trailer?.info?.title}
        </span>
        <ObjectiveList objectives={course.trailer?.info?.items} />
      </div>
    </Section>
  ) : null;
}
