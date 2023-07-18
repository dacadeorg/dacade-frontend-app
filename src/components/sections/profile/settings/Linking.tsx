import { ReactElement, useState } from "react";
import { useTranslation } from "next-i18next";
import ProfileSettingsSection from '@/components/sections/profile/overview/Section'
import DiscordIcon from "@/icons/discord.svg";
import { useSelector } from "@/hooks/useTypedSelector";
import { useMemo } from "react";
import { useRouter } from "next/router";
import { useDiscordConnect } from "@/hooks/useDiscordConnect"
import DiscordConnect from "@/components/popups/DiscordConnect";


const { NEXT_PUBLIC_DISCORD_OAUTH_BASE_URL, NEXT_PUBLIC_DISCORD_CLIENT_ID, NEXT_PUBLIC_DISCORD_SCOPE, NEXT_PUBLIC_DISCORD_CALLBACK_URL } = process.env;

export default function ProfileLinking(): ReactElement {
    const { t } = useTranslation();
    const [discordConnected, setDiscordConnected] = useState(false);

    const { canConnectDiscord, triggerDiscordOauth } = useDiscordConnect();

  
    return (
        <ProfileSettingsSection title="Account Linking" see-more see-all>
              <div className="grid grid-cols-2 gap-4">
        <div
          className="flex text-gray-500 text-base font-normal"
        >            
            <div className="pr-2 text-sm flex items-center"><DiscordIcon className="ml-3 align-middle h-6 inline-block" /></div>
            <div className="text-sm self-center">{t('profile.settings.edit.discord')}</div>      
        </div>
        <div className="flex justify-end text-primary text-sm">
          {!canConnectDiscord ?   
          <button className="bg-transparent hover:bg-transparent flex justify-end text-gray-400 text-xs" >{t('profile.settings.edit.discord.connected')}</button> : 
          <button className="bg-transparent hover:bg-transparent flex justify-end text-gray-400 text-xs" onClick={triggerDiscordOauth}>{t('profile.settings.edit.discord.connect')}</button>}
          
        </div>
        <DiscordConnect/>
        hello
         
      </div>
      </ProfileSettingsSection>
    );
  }



