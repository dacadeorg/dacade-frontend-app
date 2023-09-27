/**
 * Function to determine which router object is passed and then redirect to the correct
 *  links which does not include the `/course/[course_slug]/`
 * @date 9/27/2023 - 11:06:19 AM
 *
 * @param {*} routerObject
 * @param {?string} [finalPage]
 * @returns {string}
 */

const removeCourseFromLink = (routerObject: any, finalPage?: string): string => {
  let redirectLink = "";
  const paths = Object.keys(routerObject);
  if (paths.length === 0) return "";

  if (paths.includes("submission_id")) {
    const { slug: community_slug, challenge_id, submission_id } = routerObject;
    redirectLink = `/communities/${community_slug}/challenges/${challenge_id}/submissions/${submission_id}`;
  } else if (paths.includes("challenge_id")) {
    const { slug: community_slug, challenge_id } = routerObject;
    redirectLink = `/communities/${community_slug}/challenges/${challenge_id}`;
  } else redirectLink = `/communities/${routerObject.slug}`;

  return finalPage ? `${redirectLink}/${finalPage}` : redirectLink;
};

export default removeCourseFromLink;
