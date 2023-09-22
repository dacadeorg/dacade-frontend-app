import { useState, ReactElement } from "react";
import { useTranslation } from "next-i18next";
import { GetStaticProps } from "next";
import Button from "@/components/ui/button";
import DiscordDisconnect from "@/components/popups/DiscordDisconnect";
import ProfileLayout from "@/layouts/ProfileLayout";
import i18Translate from "@/utilities/I18Translate";
import ProfileSettingsInformation from "@/components/sections/profile/settings/Overview";
import ProfileSettingsLinking from "@/components/sections/profile/settings/Linking";
import AuthObserver from "@/contexts/AuthObserver";

/**
 * Profile Settings component
 *
 * @returns {ReactElement}
 */
export default function ProfileSettings(): ReactElement {
  const { t } = useTranslation();
  const [togglePopupDiscordDisconnect, setTogglePopupDiscordDisconnect] = useState(false);

  return (
    <div className="flex flex-col divide-y divide-solid divide-gray-200 space-y-8 text-gray-700">
      <ProfileSettingsInformation />
      <ProfileSettingsLinking />
      <DiscordDisconnect show={togglePopupDiscordDisconnect} onClose={() => setTogglePopupDiscordDisconnect(false)} />
      <div className="w-full pt-4 flex justify-center mx-auto text-base">
        <Button variant="outline-primary" onClick={() => setTogglePopupDiscordDisconnect(true)}>
          {t("profile.header.disconnect")}
        </Button>
      </div>
    </div>
  );
}

ProfileSettings.getLayout = function (page: ReactElement) {
  return (
    <AuthObserver>
      <ProfileLayout>{page}</ProfileLayout>
    </AuthObserver>
  );
};

export const getServerSideProps: GetStaticProps = async ({ locale }) => ({ props: { ...(await i18Translate(locale as string)) } });
