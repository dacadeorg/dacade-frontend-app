import Section from "@/components/ui/Section";
import Stories from "./_partials/testimonials/Stories";
import { ReactElement } from "react";
import CommunityStats from "./_partials/testimonials/CommunityStats";
import { useTranslation } from "next-i18next";
import { TFunction } from "i18next";

/**
 * Interface for the testimonial
 * @date 4/3/2023 - 6:29:54 PM
 *
 * @interface Testimonial
 * @typedef {Testimonial}
 */
interface Testimonial {
  title?: string;
  content?: string;
  icon: string;
}

/**
 * A function that returns the testimonial component
 * @date 4/3/2023 - 6:32:11 PM
 *
 * @export
 * @param {TestimonialsSectionProps} {
  stories,
}
 * @returns {ReactElement}
 */

const stories = (
  t: TFunction<"translation", undefined, "translation">
): Testimonial[] => {
  return [
    {
      icon: "/assets/img/moritz-pic.png",
      content: `${t("testimonials.text")}`,
    },
    {
      icon: "/assets/img/alex.jpg",
      content: `${t("testimonials.text")}`,
    },
    {
      icon: "/assets/img/user_jet.png",
      content: `${t("testimonials.text")}`,
    },
    {
      icon: "/assets/img/user_tosin_edit.png",
      content: `${t("testimonials.text")}`,
    },
    {
      icon: "/assets/img/user_susen.png",
      content: `${t("testimonials.text")}`,
    },
    {
      icon: "/assets/img/gabriela.png",
      content: `${t("testimonials.text")}`,
    },
    {
      icon: "/assets/img/testimonial-sample-7.png",
      content: `${t("testimonials.text")}`,
    },
    {
      icon: "/assets/img/yannick.png",
      content: `${t("testimonials.text")}`,
    },
    {
      icon: "/assets/img/testimonial-sample-9.png",
      content: `${t("testimonials.text")}`,
    },
  ];
};
export default function TestimonialsSection(): ReactElement {
  const { t } = useTranslation();
  return (
    <Section padding="py-6 xl:py-10 md:py-8 mt-5" type="secondary">
      <CommunityStats />
      <Stories list={stories(t)} />
    </Section>
  );
}
