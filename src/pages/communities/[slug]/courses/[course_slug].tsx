import HomeLayout from "@/layouts/Home";
import { ReactElement } from "react";
import OverviewSection from "@/components/sections/courses/overview";

export default function CommunityCourseViewPage() {
  return (
    <div className="lg:py-0 lg:pb-8 py-8 flex flex-col divide-y divide-solid divide-gray-200 space-y-8 text-gray-700">
      <OverviewSection />
    </div>
  );
}

CommunityCourseViewPage.getLayout = function (page: ReactElement) {
  return <HomeLayout>{page}</HomeLayout>;
};
