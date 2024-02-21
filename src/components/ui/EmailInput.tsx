import Input from "./Input";
import { useSelector } from "@/hooks/useTypedSelector";
import { useTranslation } from "next-i18next";
import { ReactElement } from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { FormValues } from "@/pages/signup";

interface EmailInputProps {
  register: UseFormRegister<FormValues>;
  errors: FieldErrors<FormValues>;
  emailValue?: string;
}

/**
 * Email input component used in:
 * - singup pages
 * - login pages
 * @date 4/27/2023 - 2:47:56 PM
 *
 * @export
 * @param {{
 * errors: FieldErrors<FormValues>;
 * register: UseFormRegister<FormValues>;
 * emailValue: string | undefined }} {errors, register}
 * @returns {ReactElement}
 */

export default function EmailInput({ errors, register, emailValue }: EmailInputProps): ReactElement {
  const { t } = useTranslation();
  const error = useSelector((state) => state.store.error);

  return (
    <Input
      data-testid="emailInput"
      id="email"
      type="email"
      placeholder={`${t("login-page.email.placeholder")}`}
      label={`${t("login-page.email.label")}`}
      value={emailValue}
      error={errors?.email?.message || error?.error?.data.details.email}
      {...register("email", {
        required: "This field is required",
        pattern: {
          value: /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/i,
          message: "This must be a valid email address",
        },
      })}
    />
  );
}
