import { useState, useEffect, useCallback, ReactElement } from "react";
import Modal from "@/components/ui/Modal";
import Loader from "@/components/ui/Loader";
import Button from "@/components/ui/button";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { fetchUser } from "@/store/services/user.service";
import { useDispatch } from "@/hooks/useTypedDispatch";
import api from "@/config/api";

/**
 * DiscordConnect component
 * @date 4/4/2023 - 9:38:41 AM
 *
 * @export
 * @returns {ReactElement}
 */
export default function DiscordConnect(): ReactElement {
  const [discordError, setDiscordError] = useState<string | boolean>(false);
  const [discordSuccess, setDiscordSuccess] = useState(false);
  const [discordLoading, setDiscordLoading] = useState(false);
  const [showDiscordModal, setShowDiscordModal] = useState(false);
  const { t } = useTranslation();
  const router = useRouter();
  const dispatch = useDispatch();

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
  const getDiscordMessage = (): string => {
    if (discordError) return t("profile.header.discord.error");
    if (discordSuccess) return t("profile.header.discord.success");
    return t("profile.header.discord.connect");
  };

  /**
   * Connect or disconnect user from discord
   * @date 4/4/2023 - 9:39:06 AM
   *
   * @type {Function}
   */
  const discordCallback: Function = useCallback(() => {
    async () => {
      try {
        const { code } = router.query;
        if (!code) {
          return;
        }
        setDiscordLoading(true);
        setShowDiscordModal(true);

        const response = await api().server.post("auth/discord", {
          code,
        });

        if (!response) {
          setDiscordError(true);
          return;
        }
        setDiscordSuccess(true);
        dispatch(fetchUser());
      } catch (error) {
        setDiscordError(true);
      } finally {
        setDiscordLoading(false);
        router.replace({ query: {} });
      }
    };
  }, [dispatch, router]);

  useEffect(() => {
    discordCallback();
  }, [discordCallback]);

  return (
    <Modal show={showDiscordModal} size="medium" onClose={closeModal}>
      <div className="px-6 pt-6">
        <div className="pb-7">
          <p className="text-.5xl font-medium leading-snug">{t("profile.header.discord")}</p>
        </div>

        <div className="flex space-x-3 pb-7">
          {discordLoading && <Loader className="w-6 h-6 pt-6 text-green-400" />}
          <p
            className={`p-3 rounded text-.2xl font-medium leading-snug flex-1 ${
              discordError ? "bg-red-50 text-red-700" : discordSuccess ? "bg-green-50 text-green-700" : "bg-white"
            }`}
          >
            {getDiscordMessage()}
          </p>
        </div>

        <div className="pb-7">
          <Button disabled={discordLoading} className="-ml-4 font-semibold border-none!" variant="outline-primary" onClick={closeModal} type="button">
            {t("profile.header.discord.close")}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
