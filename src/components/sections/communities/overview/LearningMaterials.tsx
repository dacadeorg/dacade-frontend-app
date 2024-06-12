import CourseCard from "@/components/cards/course"
import { useMultiSelector } from "@/hooks/useTypedSelector"
import RelatedLearningCard from "@/components/cards/challenge/_partials/RelatedLearning";
import { Course, LearningModule } from "@/types/course";
import { Community } from "@/types/community";
import Loader from "@/components/ui/Loader";
import { IRootState } from "@/store";
import { useTranslation } from "next-i18next";

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
            <div className="md:hidden">
                <div className="font-medium text-.5xl leading-snug">{t("communities.overview.learning-materials.title")}</div>
                <div className="text-sm font-light lg:w-full lg:pr-7 pt-2 mb-6 md:mb-0">{t("communities.overview.learning-materials.description")} </div>
            </div>
            <div className="grid gap-6">
                {courses?.map((course) => {
                    return <CourseCard key={`learning-material-course-${course.id}`} course={course} community={community} />
                })}
            </div>
            <div className="grid md:grid-cols-2 gap-3 w-full">
                {learningModules?.map((module) => {
                    return <RelatedLearningCard
                        key={`learning-material-material-${module.id}`}
                        title={module.title}
                        description={module.description}
                        path={`/communities/${community.slug}`} />
                })}
            </div>
        </>
    )
}

