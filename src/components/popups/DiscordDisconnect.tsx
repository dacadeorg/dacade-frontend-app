import { useState, useEffect, useCallback, ReactElement } from "react";
import Modal from "@/components/ui/Modal";
import Loader from "@/components/ui/Loader";
import Button from "@/components/ui/button";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
// import api from "@/config/api";
import { disconnectDiscord } from "@/store/feature/auth.slice";
import { useDispatch } from "@/hooks/useTypedDispatch";
import ArrowButton from "@/components/ui/button/Arrow";


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
    // const getDiscordMessage = (): string => {
    //   if (discordError) return t("profile.header.discord.error");
    //   if (discordSuccess) return t("profile.header.discord.success");
    //   return t("profile.header.discord.connect");
    // };
  
    /**
     * Connect or disconnect user from discord
     * @date 4/4/2023 - 9:39:06 AM
     *
     * @type {Function}
     */
    // const discordCallback = useCallback(async () => {
    //   try {
    //     const { code } = router.query;
    //     if (!code) {
    //       return;
    //     }
    //     setDiscordLoading(true);
    //     setShowDiscordModal(true);
  
    //     const response = await api().client.post("auth/discord/disconnect", {
    //       code,
    //     });
  
    //     if (!response) {
    //       setDiscordError(true);
    //       return;
    //     }
    //     setDiscordSuccess(true);
    //     router.replace({ query: username ? { username: username } : {} });
    //   } catch (error) {
    //     setDiscordError(true);
    //   } finally {
    //     setDiscordLoading(false);
    //   }
    // }, []);
  
    // useEffect(() => {
    //   discordCallback();
    // }, [discordCallback]);


    const onDisconnect = () => {
        dispatch(disconnectDiscord());
        router.reload()
      };
  
    return (
    //   <Modal show={show} size="medium" onClose={onClose}>
    //     <div className="px-6 pt-6">
    //       <div className="pb-7">
    //         <p className="text-.5xl font-medium leading-snug">{t("profile.header.discord.disconnect")}</p>
    //       </div>
  
    //    <div className="flex flex-col space-x-3 pb-2">
    //         <p> {t("profile.settings.discord.disconnect.confirm")}</p>
    //         <Button className="font-semibold w-1/4 mt-8 my-4 justify-self-center" onClick={onDisconnect} variant="outline-primary" type="button">
    //         {t("profile.settings.discord.disconnect")}
    //         </Button>
    //       </div>

    //       <div className="pb-7">
    //         <Button disabled={discordLoading} className="-ml-4 font-semibold border-none!" variant="outline-primary" onClick={onClose} type="button">
    //           {t("profile.header.discord.close")}
    //         </Button>
    //       </div>
    //     </div>
    //   </Modal>
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