import { ReactElement, useState } from "react";
import { useTranslation } from "next-i18next";
import ProfileSettingsSection from '@/components/sections/profile/overview/Section'



export default function ProfileLinking(): ReactElement {
    const { t } = useTranslation();

    return (
        <ProfileSettingsSection title="Profile Information" see-more see-all>
              <div className="grid grid-cols-2 gap-4">
        <div
          className="flex text-gray-500 text-base font-normal"
        >
            {/* <div className="pr-2 text-sm flex items-center"><DiscordIcon /></div>
            <div class="text-sm self-center">{{ $t('profile.edit.discord') }}</div>       */}
            <div className="pr-2 text-sm flex items-center">Discord Icon</div>
            <div className="text-sm self-center">Profile edit discord</div>      
        </div>
        <div className="flex justify-end text-primary text-sm">
          <button className="bg-transparent hover:bg-transparent flex justify-end text-gray-400 text-xs">connected</button>
        </div>
        {/* <div v-if="!isDiscordConnected" className="flex justify-end text-primary text-sm"> <button
          className="bg-transparent hover:bg-transparent flex justify-end text-gray-400 text-xs"></button>connect </div> */}
         
        

      </div>
      </ProfileSettingsSection>
    );
  }