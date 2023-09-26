const removeCourseFromLink = (routerObject: any, finalPage?: string): string => {
  let redirectLink = "";
  const paths = Object.keys(routerObject);
  if (paths.length === 0) return "";

  console.log("Tis is the router objecct", routerObject);
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
