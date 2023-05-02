import { ReactElement, useState } from "react";
import ArrowButton from "@/components/ui/button/Arrow";
import Input from "@/components/ui/Input";
import { getMetadataTitle } from "@/utilities/Metadata";
import { useTranslation } from "next-i18next";
import { useForm } from "react-hook-form";
import Head from "next/head";
import { GetStaticProps } from "next";
import i18Translate from "@/utilities/I18Translate";
import LayoutWithoutFooter from "@/layouts/WithoutFooter";

/**
 * Form interface for password reset
 * @date 4/27/2023 - 8:15:12 PM
 *
 * @interface Form
 * @typedef {Form}
 */
interface Form {
  email: string;
  password: string;
  newPassword: string;
}

/**
 * Reset password component
 * @date 4/27/2023 - 8:15:41 PM
 *
 * @export
 * @returns
 */
export default function PasswordReset(): ReactElement {
  const { t } = useTranslation();
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm<Form>();

  const passwordValue = watch("password");
  const newPassword = watch("newPassword");
  const [loading, setLoading] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(true);
  const emailValue = watch("email");
  const onPasswordResetRequest = (formData: Form) => {
    if (passwordValue !== newPassword) {
      setPasswordMatch(false);
      return;
    }
    const data = {
      email: formData.email,
      password: formData.password,
    };
    setLoading(true);
  };

  return (
    <>
      <Head>{getMetadataTitle(t("password-reset.title"))}</Head>
      <div>
        <form
          onSubmit={handleSubmit(onPasswordResetRequest)}
          className="content-wrapper"
        >
          <div className="lg:w-98 xl:w-98 mx-auto">
            <h3 className="text-5xl my-5">{t("password-reset.title")}</h3>
            <div>
              <Input
                /* In backticks `` because placeholder requires a string.
                 * Same for label
                 */
                placeholder={`${t("login-page.email.placeholder")}`}
                label={`${t("login-page.email.label")}`}
                error={errors.email?.message}
                type="email"
                value={emailValue}
                {...register("email", {
                  required: "This field is required",
                  pattern: {
                    value:
                      /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/i,
                    message: "This must be a valid email address",
                  },
                })}
              />
            </div>
            <div>
              <Input
                /* In backticks `` because placeholder requires a string.
                 * Same for label
                 */
                placeholder={`${t(
                  "login-page.password.placeholder"
                )}`}
                label={`${t("login-page.password.label")}`}
                error={errors.password?.message}
                type="password"
                value={passwordValue}
                {...register("password", {
                  required: "This field is required",
                  minLength: {
                    value: 6,
                    message: "The password is too short",
                  },
                })}
              />
            </div>
            <div>
              <Input
                /* In backticks `` because placeholder requires a string.
                 * Same for label
                 */
                placeholder={`${t(
                  "login-page.password.placeholder"
                )}`}
                label={`${t("login-page.password.label")}`}
                error={
                  errors.password?.message || !passwordMatch
                    ? "password mismatch"
                    : ""
                }
                type="password"
                value={newPassword}
                {...register("newPassword", {
                  required: "This field is required",
                  minLength: {
                    value: 6,
                    message: "The password is too short",
                  },
                })}
              />
            </div>
            <div className="text-right">
              <ArrowButton
                loading={loading}
                type="submit"
                disabled={loading}
                min-width-class="min-w-40"
              >
                {t("password-reset.submit")}
              </ArrowButton>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

PasswordReset.getLayout = (page: ReactElement) => {
  return <LayoutWithoutFooter>{page}</LayoutWithoutFooter>;
};

export const getStaticProps: GetStaticProps = async ({ locale }) =>
  i18Translate(locale as string);
