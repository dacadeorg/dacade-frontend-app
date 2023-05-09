import { ReactElement } from "react";
import Input from "./Input";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { FormValues } from "@/pages/signup";
import { useTranslation } from "next-i18next";
import { useSelector } from "@/hooks/useTypedSelector";

interface UsernameInputProps {
  register: UseFormRegister<FormValues>;
  errors: FieldErrors<FormValues>;
}

/**
 * Username input component user in: 
 * - singup pages
 * @date 4/27/2023 - 2:57:58 PM
 *
 * @export
 * @param {UsernameInputProps} {
  register,
  errors,
}
 * @returns {ReactElement}
 */

export default function UsernameInput({
  register,
  errors,
}: UsernameInputProps): ReactElement {
  const { t } = useTranslation();
  const error = useSelector((state) => state.store.error);

  return (
    <Input
      id="username"
      placeholder={`${t("login-page.username.placeholde")}`}
      label={`${t("login-page.username.label")}`}
      error={
        errors.username?.message ||
        (error?.response?.data.details.username as string)
      }
      {...register("username", {
        required: "This field is required",
        minLength: {
          value: 3,
          message: "The username is too short",
        },
      })}
    />
  );
}
