import CommunityLayout from "@/layouts/Community";
import { wrapper } from "@/store";
import { fetchCurrentCommunity, fetchLearningMaterials } from "@/store/services/community.service";
import i18Translate from "@/utilities/I18Translate";
import { GetServerSideProps } from "next";
import { ReactElement } from "react";
import { useTranslation } from "next-i18next";
import Head from "next/head";
import { getMetadataDescription, getMetadataTitle } from "@/utilities/Metadata";
import { Community } from "@/types/community";
import CommunityWrapper from "@/components/sections/communities/overview/Wrapper";
import { Course, LearningModule } from "@/types/course";
import LearningMaterialsOverview from "@/components/sections/communities/overview/LearningMaterials";



export default function LearningMaterials(props: {
    pageProps: {
        community: Community;
        learningMaterials: { courses: Course[], learningModules: LearningModule[] };
    };
}) {
    const { t } = useTranslation()
    const { community } = props.pageProps
    return <div>
        <Head>
            <title>{getMetadataTitle(t("communities.navigation.learning-materials"), community?.name as string)}</title>
            {getMetadataDescription(community?.description as string).map((attributes, i) => (
                <meta key={`scoreboard-meta-${i}`} {...attributes} />
            ))}
        </Head>
        <CommunityWrapper >
            <LearningMaterialsOverview />
        </CommunityWrapper>
    </div>

}

LearningMaterials.getLayout = function (page: ReactElement) {
    return <CommunityLayout>{page}</CommunityLayout>;
};

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps((store) => async ({ locale, params }) => {
    const slug = params?.slug as string;
    try {
        const [{ data: community }] = await Promise.all([
            store.dispatch(fetchCurrentCommunity({ slug, locale })),
            store.dispatch(fetchLearningMaterials({ slug, locale })),
        ])
        return { props: { community, ...(await i18Translate(locale as string)) } };
    }
    catch (err) {
        return {
            notFound: true,
        };
    }
})