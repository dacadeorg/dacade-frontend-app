import Section from "@/components/ui/Section";
import Stories from "./_partials/testimonials/Stories";
import { ReactElement } from "react";
import CommunityStats from "./_partials/testimonials/CommunityStats";

/**
 * Interface for the testimonial
 * @date 4/3/2023 - 6:29:54 PM
 *
 * @interface Testimonial
 * @typedef {Testimonial}
 */
interface Testimonial {
  title: string;
  content: string;
  author: string;
}

/**
 * Props interface for the testimonalial section
 * @date 4/3/2023 - 6:30:19 PM
 *
 * @interface TestimonialsSectionProps
 * @typedef {TestimonialsSectionProps}
 */
interface TestimonialsSectionProps {
  stories: Testimonial[];
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
export default function TestimonialsSection({
  stories,
}: TestimonialsSectionProps): ReactElement {
  return (
    <Section
      padding="py-6 xl:py-10 md:py-8 mt-5"
      type="secondary-light"
    >
      <CommunityStats />
      <Stories list={stories} />
    </Section>
  );
}
