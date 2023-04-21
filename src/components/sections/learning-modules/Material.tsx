import Slugger from "github-slugger";
//  TODO this line will be uncommented once learning module Markdown component has been merged and fragment could be removed during.
// import Markdown from './_partials/Markdown';
import Section from "@/components/sections/communities/_partials/Section";
//  TODO this line will be uncommented once Duration component
// import Duration from '@/components/sections/courses/_partials/Duration';
import ArrowButton from "@/components/ui/button/Arrow";
import Video from "@/components/ui/Video";
import Link from "next/link";
import { useTranslation } from "next-i18next";

/**
 * Material interface
 * @date 4/20/2023 - 10:36:35 AM
 *
 * @interface Material
 * @typedef {Material}
 */
interface Material {
  type: string;
  title: string;
  subtitle?: string;
  duration?: number;
  link: string;
  list: { link: string }[];
  description?: string;
}

/**
 * Material component
 * @date 4/20/2023 - 10:36:51 AM
 *
 * @interface MaterialProps
 * @typedef {MaterialProps}
 */
interface MaterialProps {
  material?: Material;
}

export function Material({ material }: MaterialProps) {
  const sluggify = (text: string) => {
    const slugger = new Slugger();
    return slugger.slug(text);
  };

  const isAdditional = material?.type === "ADDITIONAL";
  const materialId = !(!material?.title || isAdditional)
    ? sluggify(material?.title)
    : "";
  const { t } = useTranslation();

  return (
    <Section
      id={materialId}
      title={isAdditional ? "Additional Material" : material?.title}
    >
      {!isAdditional && (
        //  TODO this line will be uncommented once Duration component has been merged and fragment could be removed during.
        // <Duration
        //   text={material?.subtitle}
        //   value={material?.duration}
        // />
        <></>
      )}
      {!isAdditional && (
        <span className="block text-lg mb-6 mt-2 md:w-99">
          {material?.description}
        </span>
      )}
      {material?.type === "EMBEDDED-VIDEO" && (
        <Video url={material.link} />
      )}
      {material?.type === "MARKDOWN" && (
        // TODO this line will be uncommented once markdown component has been merged and fragment could be removed during.
        // <Markdown url={material?.link} />
        <></>
      )}
      {isAdditional && (
        <div>
          {material?.list.map((item, i) => (
            <Link
              key={`material-${i}`}
              href={item.link}
              target="__blank"
              className="mt-3 flex flex-wrap items-center"
            >
              <p
                id={sluggify(material?.title)}
                className="text-lg font-normal leading-normal"
              >
                {material?.title}
              </p>
              <span className="ml-2 leading-normal">
                {/* TODO this line will be uncommented once Duration component  */}
                {/* <Duration value={material?.duration} /> */}
              </span>
            </Link>
          ))}
        </div>
      )}
      {(material?.type === "TEXT" || material?.type === "ARTICLE") &&
        material?.link && (
          <ArrowButton
            link={material?.link}
            target="__blank"
            className="mt-4 block"
            community-styles={true}
            variant="outline-primary"
          >
            {material?.type === "TEXT"
              ? t("learning-module.material?.open.lesson")
              : t("learning-module.material?.open.article")}
          </ArrowButton>
        )}
    </Section>
  );
}
