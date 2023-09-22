import { ReactElement, useState } from "react";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/button";
import { useTranslation } from "next-i18next";
import { disconnectDiscord } from "@/store/feature/auth.slice";
import { useDispatch } from "@/hooks/useTypedDispatch";
import Loader from "@/components/ui/Loader";
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

export default function DiscordDisconnect({ show, onClose }: DiscordDisconnectProps): ReactElement {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const router = useRouter();
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
      router.reload();
    } catch (e) {
      console.error(e);
      setDiscordDisconnectError(true);
    } finally {
      setDisconnectLoading(false);
    }
  };

  return (
    <Modal show={show} size="medium" onClose={onClose}>
      <div className="px-6 pt-6">
        <div className="pb-7">
          <p className="text-.5xl font-medium leading-snug">{t("profile.header.discord.disconnect")}</p>
        </div>

        {!disconnectLoading && !discordDisconnectSuccess && (
          <div className="flex flex-col space-x-3 pb-2">
            <p> {t("profile.settings.discord.disconnect.confirm")}</p>
            <Button className="font-semibold w-1/4 mt-8 my-4 justify-self-center" onClick={onDisconnect} variant="outline-primary" type="button">
              {t("profile.settings.discord.disconnect")}
            </Button>
          </div>
        )}

        <div className="flex space-x-3 pb-7">
          {disconnectLoading && <Loader className="w-6 h-6 pt-6 text-green-400" />}
          <p
            className={`p-3 rounded text-.2xl font-medium leading-snug flex-1 ${
              discordDisconnectError ? "bg-red-50 text-red-700" : discordDisconnectSuccess ? "bg-green-50 text-green-700" : "bg-white"
            }`}
          >
            {getDiscordMessage()}
          </p>
        </div>

        <div className="pb-7">
          <Button disabled={disconnectLoading} className="-ml-4 font-semibold border-none!" variant="outline-primary" onClick={onClose} type="button">
            {t("profile.header.discord.close")}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
