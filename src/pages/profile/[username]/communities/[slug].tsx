import CommunityStats from "@/components/sections/profile/communities/Stats";
import List from "@/components/sections/submissions/List";
import { fetchCurrentCommunity } from "@/store/feature/community.slice";
import { useRouter } from "next/router";
import React, { Fragment, useEffect } from "react";
import { useDispatch } from "@/hooks/useTypedDispatch";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import DefaultLayout from "@/components/layout/Default";
import { ReactElement } from "react-markdown/lib/react-markdown";
import ProfileLayout from "@/layouts/Profile";

export default function ProfileCommunities() {
  const dispatch = useDispatch();

  const router = useRouter();

  useEffect(() => {
    if (router.query.slug) {
      dispatch(fetchCurrentCommunity({ slug: router?.query?.slug as string, locale: router.locale }));
    }
  }, [router.locale, router.query.slug]);

  return (
    <Fragment>
      <CommunityStats />
      <List />
    </Fragment>
  );
}

ProfileCommunities.getLayout = function (page: ReactElement) {
  return <ProfileLayout footerBackgroundColor={"default"}>{page}</ProfileLayout>;
};

export const getServerSideProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale as string)),
  },
});
