import { useEffect, ReactElement, useMemo } from "react";
import { useSelector } from "@/hooks/useTypedSelector";
import { useDispatch } from "@/hooks/useTypedDispatch";
import { fetchProfileReputation } from "@/store/services/profile/reputation.service";
import { getMetadataTitle } from "@/utilities/Metadata";

import NotificationList from "@/components/list/Notification";
import ProfileOverviewCommunities from "@/components/sections/profile/overview/Communities";
import ProfileOverviewAchievements from "@/components/sections/profile/overview/Achievements";
import ProfileOverviewReferrals from "@/components/sections/profile/overview/Referrals";
import ProfileOverviewSection from "@/components/sections/profile/overview/Section";
import DiscordConnect from "@/components/popups/DiscordConnect";
import Head from "next/head";
import ProfileLayout from "@/layouts/ProfileLayout";
import AuthCheckProvider from "@/contexts/AuthCheckProvider";
import { GetServerSideProps, GetStaticProps } from "next";
import i18Translate from "@/utilities/I18Translate";
import { fetchAllCertificates } from "@/store/services/profile/certificate.service";

export default function ProfileOverview() {
  const user = useSelector((state) => state.user.data);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await Promise.all([dispatch(fetchAllCertificates({ username: user?.username || "" })), dispatch(fetchProfileReputation({ username: user?.username || "" }))]);
    })();
  }, [dispatch, user?.username]);

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

export const getServerSideProps: GetServerSideProps = async ({ locale }) => i18Translate(locale as string);
