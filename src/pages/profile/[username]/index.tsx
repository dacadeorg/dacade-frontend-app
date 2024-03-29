import { useEffect, ReactElement, useMemo, useCallback } from "react";
import { useSelector } from "@/hooks/useTypedSelector";
import { useDispatch } from "@/hooks/useTypedDispatch";
import { fetchAllCertificates } from "@/store/services/profile/certificate.service";
import { fetchProfileReputation } from "@/store/services/profile/reputation.service";
import { getMetadataTitle } from "@/utilities/Metadata";
import NotificationList from "@/components/list/NotificationList";
import ProfileOverviewCommunities from "@/components/sections/profile/overview/Communities";
import ProfileOverviewAchievements from "@/components/sections/profile/overview/Achievements";
import ProfileOverviewReferrals from "@/components/sections/profile/overview/Referrals";
import ProfileOverviewSection from "@/components/sections/profile/overview/Section";
import Head from "next/head";
import ProfileLayout from "@/layouts/ProfileLayout";
import { GetServerSideProps } from "next";
import i18Translate from "@/utilities/I18Translate";
import { useRouter } from "next/router";
import { fetchUserProfile } from "@/store/services/profile/users.service";
import { wrapper } from "@/store";

export default function ProfileOverview() {
  const authUser = useSelector((state) => state.user.data);
  const router = useRouter();
  const dispatch = useDispatch();

  const fethUserReputation = useCallback(
    async (username: string) => {
      await Promise.all([dispatch(fetchProfileReputation({ username }))]);
    },
    [dispatch]
  );

  useEffect(() => {
    const username = router.query.username;
    if (username) fethUserReputation(username as string);
  }, [fethUserReputation, router.query.username]);

  const username: string = useMemo(() => router.query.username || authUser?.displayName, [authUser?.displayName, router.query.username]) as string;
  const isCurrentUser = () => username.toLocaleLowerCase() === authUser?.displayName.toLocaleLowerCase();

  return (
    <>
      <Head>
        <title>{getMetadataTitle((router.query.username as string) || "")}</title>
      </Head>
      <div className="flex flex-col divide-y divide-solid divide-gray-200 space-y-8 text-gray-700">
        <ProfileOverviewAchievements />
        <ProfileOverviewCommunities />
        {isCurrentUser() && (
          <>
            <ProfileOverviewReferrals />
            <ProfileOverviewSection title="Notifications">
              <NotificationList extended />
            </ProfileOverviewSection>
          </>
        )}
      </div>
    </>
  );
}

ProfileOverview.getLayout = function (page: ReactElement) {
  return <ProfileLayout>{page}</ProfileLayout>;
};

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps((store) => async ({ locale, params }) => {
  const { username } = params as any;

  const [profile, , translations] = await Promise.all([
    store.dispatch(fetchUserProfile((username as string) || "")),
    store.dispatch(fetchAllCertificates({ username: (username as string) || "", locale })),
    i18Translate(locale as string),
  ]);

  if (profile.isError) return { notFound: true };
  return {
    props: {
      ...translations,
    },
  };
});
