import CommunityStats from "@/components/sections/profile/communities/Stats";
import List from "@/components/sections/submissions/List";
import { useRouter } from "next/router";
import React, { Fragment } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { ReactElement } from "react-markdown/lib/react-markdown";
import ProfileLayout from "@/layouts/Profile";
import { useGetProfileCommunityQuery } from "@/store/services/profile.service";

export default function ProfileCommunities() {
  const router = useRouter();

  useGetProfileCommunityQuery({
    slug: router?.query?.slug as string,
    locale: router.locale,
    username: router?.query?.username as string,
  });

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
