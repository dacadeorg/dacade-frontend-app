import Input from "./Input";
import { useSelector } from "@/hooks/useTypedSelector";
import { useTranslation } from "next-i18next";
import { ReactElement } from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { FormValues } from "@/pages/signup";
import * as EmailValidator from "email-validator";

interface EmailInputProps {
  register: UseFormRegister<FormValues>;
  errors: FieldErrors<FormValues>;
  emailValue?: string;
  testId?: string;
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

export default function EmailInput({ errors, register, emailValue, testId = "emailInput" }: EmailInputProps): ReactElement {
  const { t } = useTranslation();
  const error = useSelector((state) => state.store.error);

  return (
    <Input
      data-testid={testId}
      id="email"
      type="email"
      placeholder={`${t("login-page.email.placeholder")}`}
      label={`${t("login-page.email.label")}`}
      value={emailValue}
      error={errors?.email?.message || error?.error?.data?.details?.email}
      {...register("email", {
        required: "This field is required",
        validate: (value) => EmailValidator.validate(value) || "This must be a valid email address",
      })}
    />
  );
}
