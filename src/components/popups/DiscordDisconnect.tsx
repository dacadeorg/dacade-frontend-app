import { ReactElement, useState } from "react";
import Modal from "@/components/ui/Modal";
import { useTranslation } from "next-i18next";
import { disconnectDiscord } from "@/store/feature/auth.slice";
import { useDispatch } from "@/hooks/useTypedDispatch";
import Loader from "@/components/ui/Loader";
import { useRouter } from "next/router";
import ArrowButton from "@/components/ui/button/Arrow";
import { fetchUser } from "@/store/services/user.service";

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

export default function DiscordDisconnect({ show, onClose }: DiscordDisconnectProps): ReactElement {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [discordDisconnectError, setDiscordDisconnectError] = useState<string | boolean>(false);
  const [discordDisconnectSuccess, setDiscordDisconnectSuccess] = useState(false);
  const [disconnectLoading, setDisconnectLoading] = useState(false);

  const getDiscordMessage = () => {
    if (discordDisconnectError) return t("profile.header.discord.disconnect.error");
    if (discordDisconnectSuccess) return t("profile.header.discord.disconnect.success");
  };

  const onDisconnect = async () => {
    try {
      setDisconnectLoading(true);
      await dispatch(disconnectDiscord());
      setDiscordDisconnectSuccess(true);
      await dispatch(fetchUser());
      onClose();
    } catch (e) {
      console.error(e);
      setDiscordDisconnectError(true);
    } finally {
      setDisconnectLoading(false);
    }
  };

  return (
    <Modal show={show} size="medium" onClose={onClose}>
      <div className="px-6 py-6">
        <div className="flex flex-col text-left">
          <h1 className="text-.5xl leading-snug font-medium">{t("profile.header.discord.disconnect")}</h1>
          {!disconnectLoading && !discordDisconnectSuccess && <p className="pt-8">{t("profile.settings.discord.disconnect.confirm")}</p>}
        </div>
        <div id="sumsub-websdk-container" className="pb-5"></div>
      </div>
      <div className="flex flex-col items-center">
        {disconnectLoading && <Loader className="w-6 h-6 pt-6 pb-6 text-green-400" />}
        <p
          className={`p-3 pt-4 rounded text-.2xl font-medium leading-snug flex-1 ${
            discordDisconnectError ? "bg-red-50 text-red-700" : discordDisconnectSuccess ? "bg-green-50 text-green-700" : "bg-white"
          }`}
        >
          {getDiscordMessage()}
        </p>
      </div>
      <div className="flex items-center justify-between pt-4 pb-2 pl-6 pr-6">
        <span className="text-sm font-medium cursor-pointer text-primary self-end mb-4" onClick={onClose}>
          {t("profile.header.discord.close")}
        </span>
        {!disconnectLoading && !discordDisconnectSuccess && (
          <ArrowButton className="font-semibold w-1/4 mt-8 my-4 justify-self-center" onClick={onDisconnect} variant="outline-primary" type="button">
            {t("profile.settings.discord.disconnect")}
          </ArrowButton>
        )}
      </div>
    </Modal>
  );
}
