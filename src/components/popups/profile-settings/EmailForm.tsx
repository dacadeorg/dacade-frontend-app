import { ReactElement, useState } from "react";
import Modal from "@/components/ui/Modal";
import Input from "@/components/ui/Input";
import ArrowButton from "@/components/ui/button/Arrow";
import { useTranslation } from "next-i18next";
import { useDispatch } from "@/hooks/useTypedDispatch";
import { useForm } from "react-hook-form";
import { updateUserEmail } from "@/store/services/user.service";
import { logout } from "@/store/feature/auth.slice";

/**
 * Edit profile component props
 * @date 5/3/2023 - 12:15:08 PM
 *
 * @interface EditProfileProps
 * @typedef {EditProfileProps}
 */
interface EditProfileProps {
  show: boolean;
  onClose: () => void;
}

/**
 * Form values interface
 * @date 5/3/2023 - 12:14:52 PM
 *
 * @interface FormValues
 * @typedef {FormValues}
 */
interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  emailConfirm: string;
}

/**
 * Edit profile component
 * @date 5/3/2023 - 12:15:30 PM
 *
 * @export
 * @param {EditProfileProps} { show, onClose }
 * @returns {ReactElement}
 */
export default function EditEmail({ show, onClose }: EditProfileProps): ReactElement {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSave = async (form: FormValues) => {
    setLoading(true);
    try {
      const { email } = form;
      await dispatch(updateUserEmail({ email }));
      await dispatch(logout());
      onClose();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onClose={onClose}>
      <div className="px-6 pt-6 relative" data-testid="profileModal">
        <h1 className="text-.5xl leading-none font-medium mb-12">{t("profile.settings.edit.email.update")}</h1>
        <form onSubmit={handleSubmit(onSave)} data-testid="edit-email-form">
          <div className="mb-2.5">
            <Input
              id="email"
              label={`${t("profile.settings.edit.email")}`}
              error={errors.email?.message}
              type="email"
              placeholder={`${t("login-page.email.placeholder")}`}
              {...register("email", {
                required: "This field is required",
                pattern: {
                  value: /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/i,
                  message: "This must be a valid email address",
                },
                minLength: {
                  value: 2,
                  message: "This must be a valid email address",
                },
              })}
            />
          </div>

          <div className="mb-8">
            <Input
              label={`${t("profile.settings.edit.email.confirm")}`}
              placeholder={`${t("profile.settings.edit.email.confirm")}`}
              error={errors.emailConfirm?.message}
              type="emailConfirm"
              {...register("emailConfirm", {
                required: "This field is required",
                pattern: {
                  value: /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/i,
                  message: "This must be a valid email address",
                },
                minLength: {
                  value: 2,
                  message: "This must be a valid email address",
                },
                validate: (val: string) => {
                  if (watch('email') !== val) return "Emails should match."
                },
              })}
            />
          </div>
          <div className="flex pb-2 items-center justify-between">
            <span className="cursor-pointer text-sm font-medium text-primary" onClick={onClose} data-testid="close-button">
              {t("profile.edit.close")}
            </span>
            <ArrowButton loading={loading} disabled={loading} variant="outline-primary">
              {t("profile.edit.save")}
            </ArrowButton>
          </div>
        </form>
      </div>
    </Modal>
  );
}
