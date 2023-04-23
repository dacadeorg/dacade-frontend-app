import Slugger from "github-slugger";
import Section from "@/components/sections/communities/_partials/Section";
import Duration from "@/components/sections/courses/_partials/Duration";
import ArrowButton from "@/components/ui/button/Arrow";
import Video from "@/components/ui/Video";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import Markdown from "./_partials/MarkDown";
import { Material, MaterialType } from "@/types/material";
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


export default function MaterialSection({ material }: MaterialProps) {
  const sluggify = (text: string) => {
    const slugger = new Slugger();
    return slugger.slug(text);
  };

  
  const isAdditional = material?.type === MaterialType.ADDITIONAL;
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
        <Duration
          text={material?.subtitle!}
          value={material?.duration!}
        />
      )}
      {!isAdditional && (
        <span className="block text-lg mb-6 mt-2 md:w-99">
          {material?.description}
        </span>
      )}
      {material?.type === MaterialType["EMBEDDED-VIDEO"] && (
        <Video url={material.link} />
      )}
      {material?.type === MaterialType.MARKDOWN && (
        <Markdown url={material?.link} />
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
                <Duration value={material?.duration!} text={""} />
              </span>
            </Link>
          ))}
        </div>
      )}
      {(material?.type === MaterialType.TEXT ||
        material?.type === MaterialType.ARTICLE) &&
        material?.link && (
          <ArrowButton
            link={material?.link}
            target="__blank"
            className="mt-4 block"
            community-styles={true}
            variant="outline-primary"
          >
            {material?.type === MaterialType.TEXT
              ? t("learning-module.material.open.lesson")
              : t("learning-module.material.open.article")}
          </ArrowButton>
        )}
    </Section>
  );
}
