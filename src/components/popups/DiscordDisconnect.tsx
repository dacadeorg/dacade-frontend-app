import { ReactElement, useState } from "react";
import Modal from "@/components/ui/Modal";
import { useTranslation } from "next-i18next";
import { disconnectDiscord } from "@/store/feature/auth.slice";
import { useDispatch } from "@/hooks/useTypedDispatch";
import ArrowButton from "@/components/ui/button/Arrow";
import { useRouter } from "next/router";



/**
 * Discord Disconnect Props
 * @date 9/21/2023
 *
 * @interface DiscordDisconnect
 * @typedef {DiscordDisconnectProps}
 */
interface DiscordDisconnectProps {
  show: boolean;
  username?: string;
  onClose: () => void;
}

export default function DiscordDisconnect({ username, show, onClose }: DiscordDisconnectProps): ReactElement {
    const [discordError, setDiscordError] = useState<string | boolean>(false);
    const [discordSuccess, setDiscordSuccess] = useState(false);
    const [discordLoading, setDiscordLoading] = useState(false);
    const [showDiscordModal, setShowDiscordModal] = useState(false);
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const router = useRouter();
    // const dispatch = useDispatch();
  
    const closeModal = () => {
      setShowDiscordModal(false);
      setDiscordError(false);
      setDiscordSuccess(false);
      setDiscordLoading(false);
    };
  
    /**
     * Get transilated discord status messages related to discord connection
     * @date 4/4/2023 - 10:05:46 AM
     *
     * @returns {string}
     */
  
    /**
     * Connect or disconnect user from discord
     * @date 4/4/2023 - 9:39:06 AM
     *
     * @type {Function}
     */

    const onDisconnect = () => {
        dispatch(disconnectDiscord());
        router.reload()
      };
  
    return (
          <Modal show={show} onClose={onClose}>
          <div className="px-6 py-6">
           
              <div className="flex flex-col text-left">
                <h1 className="text-.5xl leading-snug font-medium">{t("profile.header.discord.disconnect")}</h1>
                <p className="pt-8">{t("profile.settings.discord.disconnect.confirm")}</p>
              </div>
    
            <div id="sumsub-websdk-container" className="pb-5"></div>
          </div>
          <div className="flex items-center justify-between pt-4 pb-2 pl-6 pr-2">
            <span className="text-sm font-medium cursor-pointer text-primary" onClick={onClose}>
            {t("profile.header.discord.close")}
            </span>
              <ArrowButton disabled={discordLoading} onClick={onDisconnect}>
              {t("profile.settings.discord.disconnect")}
              </ArrowButton>
          </div>
        </Modal>
    );
  }
