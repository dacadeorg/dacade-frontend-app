import { ReactElement, useState } from "react";
import { useTranslation } from "next-i18next";
// import user from "@/components/popups/user";
import Popup from "@/components/ui/Popup";
// import ProfileSettingsSection from '~/components/sections/profile/overview/Section'
import ProfileSettingsSection from '@/components/sections/profile/overview/Section'
import { User } from "@/types/bounty";
import { useSelector } from "@/hooks/useTypedSelector";


interface UserBounties {
  user?: User;
}

  export default function ProfileOverview(): ReactElement {

    const { t } = useTranslation();
    const { notifications, user } = useSelector((state) => ({
      notifications: state.notifications.notifications,
      user: state.user,
    }));

    return (
        <ProfileSettingsSection title="Profile Information" see-more see-all>
        <div className="grid grid-cols-3 gap-4 p-4">
          <div className="text-gray text-sm">{t("profile.settings.name")}</div>
          <div className="text-gray text-sm"> {user.data?.displayName}</div>
        </div>
    
        <div className="grid grid-cols-3 gap-4 p-4">
          <div className="text-gray text-sm">{t("profile.settings.email")}</div>
          <div className="text-gray text-sm">{user.data?.email}</div>
          <button
            className="bg-transparent hover:bg-transparent flex justify-end text-primary text-xs"
            // onClick={togglePopupEmail}
          >
            { user.data?.email.length ? t('profile.edit.change') : t('profile.edit.set') }
          </button>
        </div>
    
        <div className="grid grid-cols-3 gap-4 p-4">
           <div className="text-gray text-sm">{t("profile.settings.fullname")}</div>
          <div className="text-gray text-sm">{user.data?.username}</div>
          <button
            className="bg-transparent hover:bg-transparent flex justify-end text-primary text-xs"
            // onClick={togglePopupNames}
          >
            { user.data?.username.length ? t('profile.edit.change') : t('profile.edit.set') }
          </button>
        </div>
    
        <Popup
          v-show="showPopup"
          className="w-3/5"
          // onClose={togglePopUp}
        />
      </ProfileSettingsSection>
    );
  }