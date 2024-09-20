import DefaultLayout from "@/components/layout/Default";
import PageNavigation from "@/components/sections/courses/PageNavigation";
import Wrapper from "@/components/sections/courses/Wrapper";
import LearningModuleSection from "@/components/sections/learning-modules";
import Header from "@/components/sections/learning-modules/Header";
import useNavigation from "@/hooks/useNavigation";
import { useDispatch } from "@/hooks/useTypedDispatch";
import { useMultiSelector } from "@/hooks/useTypedSelector";
import { IRootState, wrapper } from "@/store";
import { initLearningModuleNavigationMenu } from "@/store/feature/communities/navigation.slice";
import { fetchCurrentCommunity } from "@/store/services/community.service";
import { findLearningModule } from "@/store/services/learningModules.service";
import { LearningModule } from "@/types/course";
import { NotFoundError } from "@/utilities/errors/NotFoundError";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { ReactElement, useEffect, useMemo } from "react";

interface LearningModuleMultiselector {
    learningModule: LearningModule,
    loading: boolean
}

export default function LearningModulePage(): ReactElement {
    const dispatch = useDispatch();
    const navigation = useNavigation()
    const { learningModule } = useMultiSelector<unknown, LearningModuleMultiselector>({
        learningModule: (state: IRootState) => state.learningModules.current,
        loading: (state: IRootState) => state.learningModules.loading
    })

    const router = useRouter()
    const { query, locale } = router
    const paths = useMemo(() => [learningModule?.title], [learningModule?.title]);

    useEffect(() => {
        dispatch(initLearningModuleNavigationMenu(navigation.community));
        dispatch(findLearningModule({ id: query?.id as string, locale }))
    }, [dispatch, locale]);

    return (
        <Wrapper paths={paths}>
            <div className="py-8 flex flex-col space-y-8 text-gray-700">
                <Header />
                <div className="w-full">
                    <LearningModuleSection learningModule={learningModule} />
                    <PageNavigation />
                </div>
            </div>
        </Wrapper>
    )
}

LearningModulePage.getLayout = function (page: ReactElement) {
    return <DefaultLayout footerBackgroundColor={false}>{page}</DefaultLayout>;
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ params, locale }) => {

    const learningModuleId = params?.id as string
    try {
        const communitySlug = params?.slug as string;
        const [{ data: community }, { data: learningModule }, translations] = await Promise.all([
            store.dispatch(fetchCurrentCommunity({ slug: communitySlug, locale })),
            store.dispatch(findLearningModule({ id: learningModuleId, locale })),
            serverSideTranslations(locale as string),
        ]);
        if (!community || !learningModule) throw new NotFoundError();
        return {
            props: {
                community,
                learningModule,
                ...translations,
            },
        };
    } catch (error) {
        return {
            notFound: true,
        };
    }
});