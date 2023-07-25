import { useEffect, ReactElement } from "react";
import { useSelector } from "@/hooks/useTypedSelector";
import { useDispatch } from "@/hooks/useTypedDispatch";
import { fetchProfileReputation } from "@/store/services/profile/reputation.service";
import { getMetadataTitle } from "@/utilities/Metadata";
import { GetServerSideProps } from "next";
import { fetchAllCertificates } from "@/store/services/profile/certificate.service";
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
import i18Translate from "@/utilities/I18Translate";

export default function ProfileOverview(): ReactElement {
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
      <ProfileLayout>{page}</ProfileLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({ props: { ...(await i18Translate(locale as string)) } });
