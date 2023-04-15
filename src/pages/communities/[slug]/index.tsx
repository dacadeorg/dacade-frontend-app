import { wrapper } from "@/store";
import { useRouter } from "next/router";
import Section from "@/components/ui/Section";
import { Community } from "@/types/community";
import { setColors } from "@/store/feature/ui.slice";
import ThemeWrapper from "@/components/wrappers/ThemeWrapper";
import { fetchCurrentCommunity } from "@/store/feature/community.slice";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import MainHeader from "@/components/sections/communities/overview/MainHeader";
import { CoursesOverview } from "@/components/sections/communities/overview/Courses";
import ScoreboardOverview from "@/components/sections/communities/overview/scoreboard";
import CommunityLayout from "@/layouts/Community";
import { ReactElement } from "react";

/**
 * This page is here to mock the redirect that happens when you click on one of the community list
 * @date 4/6/2023 - 12:22:05 PM
 *
 * @export
 */
export default function Slug(props: {
  pageProps: { community: Community };
}): ReactElement {
  const { community } = props.pageProps;
  return (
    <div className="">
      {community && (
        <ThemeWrapper colors={community.colors}>
          <MainHeader community={community} />
        </ThemeWrapper>
      )}
      <Section type= "default">
        <div className="w-full mx-auto divide-y divide-solid divide-gray-200">
          <CoursesOverview community={community} />
          {/* <ScoreboardOverview /> */}
        </div>
      </Section>
    </div>
  );
}
Slug.getLayout = function (page: ReactElement) {
  return <CommunityLayout>{page}</CommunityLayout>;
};


// export async function getStaticPaths() {
//   return {
//     paths: [],
//     fallback: "blocking",
//   };
// }

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (data) => {
    const { query } = data;
    const slug = query?.slug;
    const results = await store.dispatch(
      fetchCurrentCommunity({
        slug: slug as string,
        locale: data.locale as string,
      })
    );
    // if (
    //   results.type === "community/fetchCurrentCommunity/fulfilled"
    // ) {
    //   return {
    //     props: {
    //       community: [],
    //     },
    //   };
    // }
    const community = results.payload as Community;
    await store.dispatch(setColors(community?.colors));
    return {
      props: {
        ...(await serverSideTranslations(data.locale as string)),
        community,
      },
    };
  }
);
