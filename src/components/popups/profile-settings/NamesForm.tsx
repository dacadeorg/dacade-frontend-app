import { ReactElement, useState } from "react";
import Modal from "@/components/ui/Modal";
import Input from "@/components/ui/Input";
import ArrowButton from "@/components/ui/button/Arrow";
import { useTranslation } from "next-i18next";
import { useDispatch } from "@/hooks/useTypedDispatch";
import { useForm } from "react-hook-form";
import { updateUser } from "@/store/services/user.service";

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
}

/**
 * Edit profile component
 * @date 5/3/2023 - 12:15:30 PM
 *
 * @export
 * @param {EditProfileProps} { show, onClose }
 * @returns {ReactElement}
 */
export default function EditProfile({ show, onClose }: EditProfileProps): ReactElement {
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const dispatch = useDispatch();

  const onSave = async (form: FormValues) => {
    setLoading(true);
    try {
      const { firstName, lastName } = form;
      await dispatch(updateUser({ firstName, lastName }));
      onClose();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onClose={onClose}>
      <div className="px-6 pt-6 relative">
        <h1 className="text-.5xl leading-none font-medium mb-12">{t("profile.settings.edit.name.update")}</h1>
        <form onSubmit={handleSubmit(onSave)}>
          <div className="mb-2.5">
            <Input
              label={`${t("profile.edit.label.fist-name")}`}
              error={errors.firstName?.message}
              type="firstName"
              {...register("firstName", {
                required: "This field is required",

                minLength: {
                  value: 3,
                  message: "The firstname is too short",
                },
              })}
            />
          </div>
          <div className="mb-8">
            <Input
              label={`${t("profile.edit.label.last-name")}`}
              error={errors.lastName?.message}
              type="lastName"
              {...register("lastName", {
                required: "This field is required",
                minLength: {
                  value: 3,
                  message: "The lastname is too short",
                },
              })}
            />
          </div>
          <div className="flex pb-2 items-center justify-between">
            <span className="cursor-pointer text-sm font-medium text-primary" onClick={onClose}>
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
