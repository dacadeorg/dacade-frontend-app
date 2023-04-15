import { useRouter } from "next/router";
import { wrapper } from "@/store";
import { fetchCurrentCommunity } from "@/store/feature/community.slice";
import { setColors } from "@/store/feature/ui.slice";
import { Community } from "@/types/community";
import MainHeader from "@/components/sections/communities/overview/MainHeader";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import ThemeWrapper from "@/components/wrappers/ThemeWrapper";

/**
 * This page is here to mock the redirect that happens when you click on one of the community list
 * @date 4/6/2023 - 12:22:05 PM
 *
 * @export
 */
export default function Slug(props: {
  pageProps: { community: Community };
}) {
  const { community } = props.pageProps;
  return (
    <div className="">
      {community && (
        <ThemeWrapper colors={community.colors}>
          <MainHeader community={community} />
        </ThemeWrapper>
      )}
    </div>
  );
}

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
