import React, { ReactElement } from "react";
import Section from "@/components/sections/communities/_partials/Section";
// TODO this will be uncommented after duration commponent has been merged 
// import Duration from "@/components/sections/courses/_partials/Duration";
import Slugger from "github-slugger";
import Link from "next/link";

/**
 * Material interface
 * @date 4/18/2023 - 8:16:26 PM
 *
 * @interface Material
 * @typedef {Material}
 */
interface Material {
  link: string;
  title: string;
  duration: string;
}


/**
 * AdditionalMaterialSection component props
 * @date 4/18/2023 - 8:16:34 PM
 *
 * @interface AdditionalMaterialSectionProps
 * @typedef {AdditionalMaterialSectionProps}
 */
interface AdditionalMaterialSectionProps {
  materials: Material[];
}

/**
 * AdditionalMaterialSection component 
 * @date 4/18/2023 - 8:16:41 PM
 *
 * @export
 * @param {AdditionalMaterialSectionProps} {
  materials,
}
 * @returns {ReactElement}
 */
export default function AdditionalMaterialSection({
  materials,
}: AdditionalMaterialSectionProps): ReactElement {
  const sluggify = (text: string) => {
    const slugger = new Slugger();
    return slugger.slug(text);
  };

  return materials.length ? (
    <Section title="Additional Material">
      {materials.map((material, index) => (
        <Link
          key={`material-${index}`}
          href={material.link}
          target="__blank"
          className="mt-3 flex flex-wrap items-center"
        >
          <p
            id={sluggify(material.title)}
            className="text-lg font-normal leading-normal"
          >
            {material.title}
          </p>
          <span className="ml-2 leading-normal">
            {/* TODO this will be uncommented after duration commponent has been merged */}
            {/* <Duration value={material.duration} /> */}
          </span>
        </Link>
      ))}
    </Section>
  ) : (
    <></>
  );
}
