import { Community } from "@/types/community";
import { Challenge, Course } from "@/types/course";
import Slugger from "github-slugger";

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

export type List = {
  id: string;
  title: string;
  hideTitle?: boolean;
  items: ListItem[];
};

type BountyLink = Omit<LearningModuleLink, "subitems">;

export default class CommunityNavigation {
  private router: any;

  /**
   * @date 3/21/2023 - 12:20:30 PM
   *
   * @constructor
   * @param {NextRouter} router
   */

  constructor(router: any) {
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
   * cleans up the url by removing the trailing slash
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
   * Get the community path for the specified community slug
   * @date 3/21/2023 - 12:30:50 PM
   *
   * @param {string} [link=""]
   * @param {string} [communitySlug=this.params().slug]
   * @returns {string}
   */

  communityPath(link: string = "", communitySlug: string | undefined = this.params().slug): string {
    return this.cleanupUrl(`/communities/${communitySlug}/${link}`);
  }

  /**
   * Get the course path for the specified course slug and community slug
   * @date 3/21/2023 - 12:30:50 PM
   *
   * @param {string} [link=""]
   * @param {string} [courseSlug=this.params().course_slug]
   * @param {string} [communitySlug=this.params().slug]
   * @returns {string}
   */

  coursePath(link: string = "", courseSlug: string | undefined = this.params().course_slug, communitySlug: string | undefined = this.params().slug): string {
    return this.cleanupUrl(this.communityPath(`courses/${courseSlug}/${link}`, communitySlug));
  }

  /**
   * Get the learning module path for the specified community and course slug
   * @date 3/21/2023 - 12:33:43 PM
   *
   * @param {string} path
   * @param {(string | undefined)} [courseSlug=this.params().course_slug]
   * @param {(string | undefined)} [communitySlug=this.params().slug]
   * @returns {string}
   */

  learningModulePath(path: string, courseSlug: string | undefined = this.params().course_slug, communitySlug: string | undefined = this.params().slug): string {
    return this.cleanupUrl(this.coursePath(`learning-modules/${path}`, courseSlug, communitySlug));
  }

  /**
   * Get the path for the learning module that if from the challenge
   * @date 8/8/2023 - 12:09:57 PM
   *
   * @param {string} path
   * @param {(string | undefined)} [courseSlug=this.params().course_slug]
   * @param {(string | undefined)} [communitySlug=this.params().slug]
   * @returns {string}
   */
  challengeLearningModulePath(challenge_id: string, path: string, communitySlug: string | undefined = this.params().slug): string {
    return this.cleanupUrl(this.challengePath(`${challenge_id}/learning-modules/${path}`, communitySlug));
  }

  /**
   * Get the challenge path for the specified community and course slug
   * @date 3/21/2023 - 12:34:49 PM
   *
   * @param {string} path
   * @param {(string | undefined)} [courseSlug=this.params().course_slug]
   * @param {(string | undefined)} [communitySlug=this.params().slug]
   * @returns {string}
   */

  challengePath(path: string, communitySlug: string | undefined = this.params().slug): string {
    return this.cleanupUrl(this.communityPath(`challenges/${path}`, communitySlug));
  }

  /**
   * Get the submission path for the specified community and course slug
   * @date 3/21/2023 - 12:35:40 PM
   *
   * @param {string} path
   * @param {(string | undefined)} [challengeId=this.params().challenge_id]
   * @param {(string | undefined)} [courseSlug=this.params().course_slug]
   * @param {(string | undefined)} [communitySlug=this.params().slug]
   * @returns {string}
   */

  submissionPath(path: string, challengeId: string | undefined = this.params().challenge_id, communitySlug: string | undefined = this.params().slug): string {
    return this.cleanupUrl(this.challengePath(`${challengeId}/submissions/${path}`, communitySlug));
  }

  /**
   * Get the submissions path for the specified community and course slug
   * @date 3/21/2023 - 12:36:20 PM
   *
   * @param {(string | undefined)} [challengeId=this.params().challenge_id]
   * @param {(string | undefined)} [courseSlug=this.params().course_slug]
   * @param {(string | undefined)} [communitySlug=this.params().slug]
   * @returns {string}
   */

  submissionsPath(challengeId: string | undefined = this.params().challenge_id, communitySlug: string | undefined = this.params().slug): string {
    return this.cleanupUrl(this.challengePath(`${challengeId}/submissions`, communitySlug));
  }

  /**
   * Get the learning module links for the specified community slug
   * @date 3/21/2023 - 1:12:53 PM
   *
   * @param {Course} course
   * @param {(string | undefined)} [communitySlug=this.params().slug]
   * @returns {LearningModuleLink[]}
   */

  learningModuleLinks(course: Course, communitySlug: string | undefined = this.params().slug): LearningModuleLink[] {
    if (!course?.learningModules) return [];

    const slugger = new Slugger();

    return course.learningModules?.map((learningModule, i) => ({
      id: learningModule.id,
      label: learningModule.title,
      link: this.learningModulePath(learningModule.id, course.slug, communitySlug),
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
   * TODO: description should be updated after understanding what this method does.
   * @date 3/21/2023 - 1:36:42 PM
   *
   * @param {{ course: Course; community: Community }} { course, community }
   * @returns {List}
   */

  initForChallenge({ challenge, community }: { challenge: Challenge; community: Community }): List[] {
    const menuList: List[] = [
      {
        id: "bounties",
        title: "communities.navigation.challenge",
        items: [
          {
            label: "communities.navigation.challenge.overview",
            exact: true,
            link: this.challengePath(challenge?.id, community?.slug),
          },
          {
            label: "communities.navigation.submissions",
            link: this.submissionPath("", challenge?.id, community?.slug),
            exact: false,
          },
        ],
      },
    ];

    const courses =
      challenge?.courses?.map((course, i) => {
        return {
          id: course.id,
          label: course.name,
          link: this.coursePath("", course.slug, community?.slug),
          exact: false,
        };
      }) || [];

    const learningModules =
      challenge?.learningModules?.map((learningModule, i) => {
        return {
          id: learningModule.id,
          label: learningModule.title,
          link: this.challengeLearningModulePath(challenge?.id, learningModule.id, community?.slug),
          exact: false,
        };
      }) || [];

    if (courses.length || learningModules.length) {
      menuList.push({
        id: "related-content",
        title: "communities.navigation.related-content",
        items: [...courses, ...learningModules],
      });
    }

    return menuList;
  }

  /**
   * TODO: description should be updated after understanding what this method does.
   * @date 3/21/2023 - 1:36:42 PM
   *
   * @param {{ course: Course; community: Community }} { course, community }
   * @returns {List}
   */

  init({ course, community }: { course: Course; community: Community }): List[] {
    const learningModules = this.learningModuleLinks(course, community?.slug);

    const communityNavigationMenuList: List[] = [
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

    const challenges =
      course?.challenges?.map((challenge, i) => {
        return {
          id: challenge?.id,
          label: challenge.name,
          link: this.challengePath(challenge?.id, community.slug),
          exact: false,
        };
      }) || [];

    if (learningModules.length) {
      communityNavigationMenuList.push({
        id: "learning-modules",
        title: "communities.navigation.learning-modules",
        items: learningModules,
      });
    }

    if (challenges.length) {
      communityNavigationMenuList.push({
        id: "bounties",
        title: "communities.navigation.challenge",
        items: challenges,
      });
    }
    return communityNavigationMenuList;
  }
}
