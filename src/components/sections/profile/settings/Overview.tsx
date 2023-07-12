import { ReactElement, useState } from "react";
import { useTranslation } from "next-i18next";
// import user from "@/components/popups/user";
import Popup from "@/components/ui/Popup";
import Header from "../../../../components/popups/profile-settings/_partials/Header";
import Section from "../../../../components/ui/Section";
import ProfileSettingsSection from '@/components/sections/profile/overview/Section'
import { User } from "@/types/bounty";
import { useSelector } from "@/hooks/useTypedSelector";
import Modal from "@/components/ui/Modal";
import Input from "@/components/ui/Input";
import { useForm } from "react-hook-form";
import ArrowButton from "@/components/ui/button/Arrow";
import { updateUser } from "@/store/services/user.service";
import NamesForm from "@/components/popups/profile-settings/NamesForm";
import EmailForm from "@/components/popups/profile-settings/EmailForm";


  export default function ProfileOverview(): ReactElement {

    const { t } = useTranslation();


    const [togglePopupNames, setTogglePopupNames] = useState(false);
    const [togglePopupEmail, setTogglePopupEmail] = useState(false);
    const { user } = useSelector((state) => ({
      notifications: state.notifications.notifications,
      user: state.user,
    }));

    return (
        <ProfileSettingsSection title="Profile Information" see-more see-all>
          <NamesForm show={togglePopupNames} onClose={() => setTogglePopupNames(false)} />
          <EmailForm show={togglePopupEmail} onClose={() => setTogglePopupEmail(false)} />

        <div className="grid grid-cols-3 gap-4 p-4">
          <div className="text-gray text-sm">{t("profile.settings.name")}</div>
          <div className="text-gray text-sm"> {user.data?.displayName}</div>
        </div>
    
        <div className="grid grid-cols-3 gap-4 p-4">
          <div className="text-gray text-sm">{t("profile.settings.email")}</div>
          <div className="text-gray text-sm">{user.data?.email}</div>
          <button
            className="bg-transparent hover:bg-transparent flex justify-end text-primary text-xs"
            onClick={() => setTogglePopupEmail(true)}
          >
            { user.data?.email.length ? t('profile.edit.change') : t('profile.edit.set') }
          </button>
        </div>
    
        <div className="grid grid-cols-3 gap-4 p-4">
           <div className="text-gray text-sm">{t("profile.settings.fullname")}</div>
          <div className="text-gray text-sm">{user.data?.username}</div>
          <button
            className="bg-transparent hover:bg-transparent flex justify-end text-primary text-xs"
            onClick={() => setTogglePopupNames(true)}
          >
            { user.data?.username.length ? t('profile.edit.change') : t('profile.edit.set') }
          </button>
        </div>

      </ProfileSettingsSection>
    );
  }