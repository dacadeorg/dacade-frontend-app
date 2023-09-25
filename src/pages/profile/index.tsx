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
import Head from "next/head";
import ProfileLayout from "@/layouts/ProfileLayout";
import { fetchUserProfile } from "@/store/services/profile/users.service";
import { fetchAllCertificates } from "@/store/services/profile/certificate.service";
import { fetchProfileReputation } from "@/store/services/reputation.service";
import { useDispatch } from "@/hooks/useTypedDispatch";
import { userFetchReferrals } from "@/store/services/referrals.service";
import { useRouter } from "next/router";
import DiscordConnect from "@/components/popups/DiscordConnect";

export default function ProfileOverview(): ReactElement {
  const user = useSelector((state) => state.user.data);
  const dispatch = useDispatch();
  const router = useRouter();
  useEffect(() => {
    (async () => {
      const username = user?.username;
      if (username) {
        await Promise.all([
          dispatch(fetchUserProfile((username as string) || "")),
          dispatch(fetchAllCertificates({ username: (username as string) || "" })),
          dispatch(fetchProfileReputation({ username: (username as string) || "" })),
          dispatch(userFetchReferrals({})),
        ]);
      }
    })();
  }, [dispatch, router.locale, user?.username]);

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
  return <ProfileLayout>{page}</ProfileLayout>;
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale as string)),
  },
});
