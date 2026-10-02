import CourseCard from "@/components/cards/course"
import { useMultiSelector } from "@/hooks/useTypedSelector"
import { LearningModuleCard } from "@/components/cards/LearningModule";
import { Course, LearningModule } from "@/types/course";
import { Community } from "@/types/community";
import Loader from "@/components/ui/Loader";
import { IRootState } from "@/store";
import { useTranslation } from "next-i18next";
import CommunityNavItem from "./_partials/NavItem";

interface LearningMaterialsSectionProps {
    community: Community;
    learningModules: LearningModule[],
    courses: Course[],
    loading: boolean
}
export default function LearningMaterialsOverview() {
    const { t } = useTranslation()
    const { courses, learningModules, community, loading } = useMultiSelector<any, LearningMaterialsSectionProps>({
        courses: (state: IRootState) => state.learningMaterials.courses,
        learningModules: (state: IRootState) => state.learningMaterials.learningModules,
        community: (state: IRootState) => state.communities.current,
        loading: (state: IRootState) => state.learningMaterials.loading
    })

    if (loading) return <Loader className="py-32" />;

    return (
        <>
            <CommunityNavItem
                title={t("communities.overview.learning-materials.title")}
                description={t("communities.overview.learning-materials.description")}
                className="md:hidden my-8"
            />
            <div className="grid gap-6 mb-6">
                {courses?.map((course) => {
                    return <CourseCard
                        key={`learning-card-data-${course.id}`}
                        title={course.name}
                        description={course.description}
                        link={`/communities/${community.slug}/courses/${course.slug}`}
                        duration={course.duration}
                        level={course.level}
                        learningModulesCount={course.learningModules?.length}
                    />
                })}
            </div>
            <div className="grid lg:grid-cols-2 gap-3 w-full">
                {learningModules?.map((module) => {
                    return <LearningModuleCard
                        key={`related-learning-card-${module.id}`}
                        data={module}
                        url={`/communities/${community.slug}/learning-modules/${module.id}`}
                    />
                })}
            </div>
        </>
    )
}

