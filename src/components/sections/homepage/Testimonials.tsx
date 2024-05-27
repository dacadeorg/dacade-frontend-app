import Section from "@/components/ui/Section";
import Stories from "./_partials/testimonials/Stories";
import { ReactElement } from "react";
import CommunityStats from "./_partials/testimonials/CommunityStats";
import { useTranslation } from "next-i18next";
import { TFunction } from "i18next";
import OpenSource from "./OpenSource";

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

const stories = (t: TFunction<"translation", undefined, "translation">): Testimonial[] => {
  return [
    {
      icon: "/assets/img/testimonials/CED.jpg",
      content: `Dacade helped me to meet people on the same blockchain journey as me and gives access to cool mentors! I like that it rewards you for challenges and helping others.`,
    },
    {
      icon: "/assets/img/testimonials/alex.jpg",
      content: `${t("testimonials.text")}`,
    },
    {
      icon: "/assets/img/testimonials/user_jet.png",
      content: `Thanks for your support, love and care on Dacade(Telegram and Website) it has being an awesome experience. I have learnt a lot and am still learning a lot. Thanks a lot`,
    },
    {
      icon: "/assets/img/testimonials/user_tosin_edit.png",
      content: `I just made submission of my quote deapp on dacade.org I'm so excited i took the course really enjoyed and learnt more Please your feedback is welcome 😊`,
    },
    {
      icon: "/assets/img/testimonials/user_susen.png",
      content: `Dacade is really encouraging, I didn't realize the little that I know would matter. Thank you for making us learn more and to make research too.`,
    },
    {
      icon: "/assets/img/testimonials/anh.jpg",
      content: `Dacade has a nice community and I'm glad to have found an opportunity to move on to the Celo Camp program with a team that I found through Dacade.`,
    },
    {
      icon: "/assets/img/testimonials/Aditya.jpg",
      content: `Going through other people’s projects and giving feedback on them helped me to learn a lot more about Web3.`,
    },
    {
      icon: "/assets/img/testimonials/moritz-pic.png",
      content: `${t("testimonials.text")}`,
    },
    {
      icon: "/assets/img/testimonials/Emmanuel-Joseph.jpg",
      content: `The Dacade community was the perfect place for me to advance my skills during the beginning of my blockchain programming career. It’s still the best place to be for opportunities.`,
    },
    {
      icon: "/assets/img/testimonials/Tevin.jpg",
      content: `Dacade has been an absolute game-changer for my career and equipped me with the essential skills to become a proficient blockchain developer, fully prepared to conquer the web3 job market.`,
    },
  ];
};

export default function TestimonialsSection({testId}: {testId?: string}): ReactElement {
  const { t } = useTranslation();
  return (
    <div data-testid={testId}>
    <Section type="secondary-light" padding="py-6 xl:py-10 md:py-8 mt-5">
      <CommunityStats />
      <Stories list={stories(t)} />
      <OpenSource/>
    </Section>
    </div>
  );
}
