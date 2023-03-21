import { Community } from "@/types/community";
import { Course } from "@/types/course";
import Slugger from "github-slugger";
import { NextRouter } from "next/router";

type QueryRoute = {
  course_slug?: string;
  slug?: string;
  challenge_id?: string;
};

type Subitem = {
  label: string;
  link: string;
  exact: boolean;
};

type LearningModuleLink = {
  id: string;
  label: string;
  link: string;
  exact: boolean;
  subitems: Subitem[];
};

type ListItem = {
  label: string;
  exact: boolean;
  link: string;
};

type List = {
  id: string;
  title: string;
  hideTitle?: boolean;
  items: ListItem[];
};

type BountyLink = Omit<LearningModuleLink, "subitems">;

export default class CommunityNavigation {
  private router: NextRouter;

  /**
   * @date 3/21/2023 - 12:20:30 PM
   *
   * @constructor
   * @param {NextRouter} router
   */

  constructor(router: NextRouter) {
    this.router = router;
  }

  /**
   * Get the route query parameters
   * @date 3/21/2023 - 12:20:47 PM
   *
   * @private
   * @returns {QueryRoutes}
   */

  private params(): QueryRoute {
    return this.router.query;
  }

  /**
   * @date 3/21/2023 - 12:30:20 PM
   *
   * @private
   * @param {string} url
   * @returns {string}
   */

  private cleanupUrl(url: string): string {
    return url.replace(/\/$/, "");
  }

  /**
   * @date 3/21/2023 - 12:30:50 PM
   *
   * @param {string} [link=""]
   * @param {string} [courseSlug=this.params().course_slug]
   * @param {string} [communitySlug=this.params().slug]
   * @returns {string}
   */

  coursePath(
    link: string = "",
    courseSlug: string | undefined = this.params().course_slug,
    communitySlug: string | undefined = this.params().slug
  ): string {
    return this.cleanupUrl(
      `/communities/${communitySlug}/courses/${courseSlug}/${link}`
    );
  }

  /**
   * Description placeholder
   * @date 3/21/2023 - 12:33:43 PM
   *
   * @param {string} path
   * @param {(string | undefined)} [courseSlug=this.params().course_slug]
   * @param {(string | undefined)} [communitySlug=this.params().slug]
   * @returns {string}
   */

  learningModulePath(
    path: string,
    courseSlug: string | undefined = this.params().course_slug,
    communitySlug: string | undefined = this.params().slug
  ): string {
    return this.cleanupUrl(
      this.coursePath(`learning-modules/${path}`, courseSlug, communitySlug)
    );
  }

  /**
   * @date 3/21/2023 - 12:34:49 PM
   *
   * @param {string} path
   * @param {(string | undefined)} [courseSlug=this.params().course_slug]
   * @param {(string | undefined)} [communitySlug=this.params().slug]
   * @returns {string}
   */

  challengePath(
    path: string,
    courseSlug: string | undefined = this.params().course_slug,
    communitySlug: string | undefined = this.params().slug
  ): string {
    return this.cleanupUrl(
      this.coursePath(`challenges/${path}`, courseSlug, communitySlug)
    );
  }

  /**
   * @date 3/21/2023 - 12:35:40 PM
   *
   * @param {string} path
   * @param {(string | undefined)} [challengeId=this.params().challenge_id]
   * @param {(string | undefined)} [courseSlug=this.params().course_slug]
   * @param {(string | undefined)} [communitySlug=this.params().slug]
   * @returns {string}
   */

  submissionPath(
    path: string,
    challengeId: string | undefined = this.params().challenge_id,
    courseSlug: string | undefined = this.params().course_slug,
    communitySlug: string | undefined = this.params().slug
  ): string {
    return this.cleanupUrl(
      this.challengePath(
        `${challengeId}/submissions/${path}`,
        courseSlug,
        communitySlug
      )
    );
  }

  /**
   * @date 3/21/2023 - 12:36:20 PM
   *
   * @param {(string | undefined)} [challengeId=this.params().challenge_id]
   * @param {(string | undefined)} [courseSlug=this.params().course_slug]
   * @param {(string | undefined)} [communitySlug=this.params().slug]
   * @returns {string}
   */

  submissionsPath(
    challengeId: string | undefined = this.params().challenge_id,
    courseSlug: string | undefined = this.params().course_slug,
    communitySlug: string | undefined = this.params().slug
  ): string {
    return this.cleanupUrl(
      this.challengePath(
        `${challengeId}/submissions`,
        courseSlug,
        communitySlug
      )
    );
  }

  /**
   * Description placeholder
   * @date 3/21/2023 - 1:12:53 PM
   *
   * @param {Course} course
   * @param {(string | undefined)} [communitySlug=this.params().slug]
   * @returns {LearningModuleLink[]}
   */

  learningModuleLinks(
    course: Course,
    communitySlug: string | undefined = this.params().slug
  ): LearningModuleLink[] {
    if (!course?.learningModules) return [];

    const slugger = new Slugger();

    return course.learningModules?.map((learningModule, i) => ({
      id: learningModule.id,
      label: learningModule.title,
      link: this.learningModulePath(
        learningModule.id,
        course.slug,
        communitySlug
      ),
      exact: false,
      subitems: learningModule.materials
        ? learningModule.materials.map((material) => {
            slugger.reset();
            return {
              label: material.title,
              link: slugger.slug(material.title),
              exact: false,
            };
          })
        : [],
    }));
  }

  /**
   * Description placeholder
   * @date 3/21/2023 - 1:17:50 PM
   *
   * @param {Course} course
   * @param {(string | undefined)} [communitySlug=this.params().slug]
   * @returns {BountyLink[]}
   */

  bountyLinks(
    course: Course,
    communitySlug: string | undefined = this.params().slug
  ): BountyLink[] {
    if (!course?.challenge) return [];

    return [
      {
        id: "challenge",
        label: "communities.navigation.challenge.overview",
        link: this.challengePath(
          course.challenge.id,
          course.slug,
          communitySlug
        ),
        exact: true,
      },
      {
        id: "submissions",
        label: "communities.navigation.submissions",
        link: this.submissionPath(
          "",
          course.challenge.id,
          course.slug,
          communitySlug
        ),
        exact: false,
      },
    ];
  }

  /**
   * Description placeholder
   * @date 3/21/2023 - 1:36:42 PM
   *
   * @param {{ course: Course; community: Community }} { course, community }
   * @returns {List}
   */

  init({
    course,
    community,
  }: {
    course: Course;
    community: Community;
  }): List[] {
    const challenges = this.bountyLinks(course, community?.slug);
    const learningModules = this.learningModuleLinks(course, community?.slug);

    const list: List[] = [
      {
        id: "introduction",
        title: "Introduction",
        hideTitle: true,
        items: [
          {
            label: "communities.navigation.overview",
            exact: true,
            link: this.coursePath("", course?.slug, community?.slug),
          },
        ],
      },
    ];

    if (learningModules.length) {
      list.push({
        id: "learning-modules",
        title: "communities.navigation.learning-modules",
        items: learningModules,
      });
    }

    if (challenges.length) {
      list.push({
        id: "bounties",
        title: "communities.navigation.challenge",
        items: challenges,
      });
    }
    return list;
  }
}
