import { ReactElement, useEffect } from "react";
import { useSelector } from "@/hooks/useTypedSelector";
import { getMetadataTitle } from "@/utilities/Metadata";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import NotificationList from "@/components/list/NotificationList";
import ProfileOverviewCommunities from "@/components/sections/profile/overview/Communities";
import ProfileOverviewAchievements from "@/components/sections/profile/overview/Achievements";
import ProfileOverviewReferrals from "@/components/sections/profile/overview/Referrals";
import ProfileOverviewSection from "@/components/sections/profile/overview/Section";
import DiscordConnect from "@/components/popups/DiscordConnect";
import Head from "next/head";
import ProfileLayout from "@/layouts/ProfileLayout";
import AuthCheckProvider from "@/contexts/AuthCheckProvider";
import { useRouter } from "next/router";
import Loader from "@/components/ui/Loader";

export default function ProfileOverview(): ReactElement {

  const { user, isFetchingUser } = useSelector((state) => ({
    user: state.user.data,
    isFetchingUser: state.user.fetchingUserLoading,
  }));
  const router = useRouter()
  useEffect(() => {
    if (!user && !isFetchingUser) {
      router.replace("/login");
    }
  }, [isFetchingUser, router, user])

  return (
    <>
      <Head>
        <title>{getMetadataTitle(user?.displayName || "")}</title>
      </Head>
      <div className="flex flex-col divide-y divide-solid divide-gray-200 space-y-8 text-gray-700">
        <ProfileOverviewAchievements />
        <ProfileOverviewCommunities />
        <ProfileOverviewReferrals />
        <ProfileOverviewSection title="Notifications">
          <NotificationList extended />
        </ProfileOverviewSection>
        <DiscordConnect />
      </div>
    </>
  );
}

ProfileOverview.getLayout = function (page: ReactElement) {
  return (
    <AuthCheckProvider>
      <ProfileLayout>{page}</ProfileLayout>
    </AuthCheckProvider>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale as string)),
  },
});
