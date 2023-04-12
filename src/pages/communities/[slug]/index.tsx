import { CoursesOverview } from "@/components/sections/communities/overview/Courses";
import { useRouter } from "next/router";

/**
 * This page is here to mock the redirect that happens when you click on one of the community list
 * @date 4/6/2023 - 12:22:05 PM
 *
 * @export
 */
export default function Slug() {
  const router = useRouter();
  const { slug } = router.query;

  return (
    <div className="flex items-center justify-center h-screen font-bold text-6xl">
      {slug}
      <CoursesOverview />
    </div>
  );
}
