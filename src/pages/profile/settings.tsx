import { useState, useEffect, ReactElement } from "react";
import { useSelector } from "@/hooks/useTypedSelector";
import { useTranslation } from "next-i18next";
import { GetServerSideProps, GetStaticProps } from "next";
import Button from "@/components/ui/button";

import ProfileLayout from "@/layouts/ProfileLayout";
import i18Translate from "@/utilities/I18Translate";
import ProfileSettingsInformation from "@/components/sections/profile/settings/Overview";
import ProfileSettingsLinking from "@/components/sections/profile/settings/Linking";
import { useRouter } from "next/router";
import api from "@/config/api";

/**
 * Profile Wallet component
 *
 * @returns {ReactElement}
 */

export default function ProfileSettings(): ReactElement {
  const { t } = useTranslation();
  const [loading, setloading] = useState(false);
  const [completed, setcompleted] = useState(false);

  const router = useRouter();

  //   const dispatch = useDispatch();
  const user = useSelector((state) => state.user.data);
  const [showEditProfile, setShowEditProfile] = useState(false);

  //   useEffect(() => {
  //     dispatch(fetchAllWallets());
  //   }, [dispatch]);

  const confirm = async () => {
    if (loading || completed) return;
    setloading(true);
    try {
      await api(router.locale).server.put(`notifications/email/unsubscribe/${router.query.id}`);
      setcompleted(true);
    } catch (e) {
      console.log(e);
    } finally {
      setloading(false);
    }
  };

  return (
    // <div className="w-full xl:w-2/">hello</div>
    <div className="flex flex-col divide-y divide-solid divide-gray-200 space-y-8 text-gray-700">
      <ProfileSettingsInformation />

      <ProfileSettingsLinking />

      <div className="w-full pt-4 flex justify-center mx-auto text-base">
        <Button disabled={loading} variant="outline-primary" onClick={confirm}>
          {/* class="hover:bg-red-700 hover:text-white bg-transparent border text-red-700 border-red-700 flex text-base mt-4" */}
          {t("profile.header.disconnect")}
        </Button>
      </div>
    </div>
  );
}

ProfileSettings.getLayout = function (page: ReactElement) {
  return <ProfileLayout>{page}</ProfileLayout>;
};

export const getStaticProps: GetStaticProps = async ({ locale }) => ({ props: { ...(await i18Translate(locale as string)) } });
