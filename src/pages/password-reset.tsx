import { ReactElement, useState } from "react";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import Input from "@/components/ui/Input";
import ArrowButton from "@/components/ui/button/Arrow";
import { getMetadataTitle } from "@/utilities/Metadata";
import Head from "next/head";
import LayoutWithoutFooter from "@/layouts/WithoutFooter";
import i18Translate from "@/utilities/I18Translate";
import { GetStaticProps } from "next";
import { useForm } from "react-hook-form";
import { passwordResetRequest } from "@/store/feature/auth.slice";
import { useDispatch } from "@/hooks/useTypedDispatch";
import { useSelector } from "@/hooks/useTypedSelector";

/**
 * Password reset form values
 * @date 4/27/2023 - 11:45:55 AM
 *
 * @interface FormValues
 * @typedef {FormValues}
 */
interface FormValues {
  email: string;
}

/**
 * Password reset page
 * @date 4/27/2023 - 11:45:07 AM
 *
 * @returns {ReactElement}
 */
export default function PasswordReset(): ReactElement {
  const { t } = useTranslation();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const jobDone = useSelector((state) => state.store.jobDone);

  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const emailValue = watch("email");
  const onPasswordResetRequest = async ({ email }: FormValues) => {
    setLoading(true);
    try {
      await dispatch(passwordResetRequest({ email }));
      if (jobDone) router.push("/login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="absolute w-full top-0 min-h-screen flex items-center justify-center">
      <Head>
        <title>{getMetadataTitle(t("password-reset.title"))}</title>
      </Head>
      <form className="content-wrapper" onSubmit={handleSubmit(onPasswordResetRequest)}>
        <div className="lg:w-98 xl:w-98 mx-auto">
          <h3 className="text-5xl my-5">{t("password-reset.title")}</h3>
          <div>
            <label htmlFor="email" className="text-sm">
              {t("password-reset.description")}
            </label>
            <Input
              id="email"
              type="email"
              value={emailValue}
              className="mb-5"
              placeholder={`${t("login-page.email.placeholder")}`}
              label={`${t("login-page.email.label")}`}
              error={errors?.email?.message}
              {...register("email", {
                required: "This field is required",
                pattern: {
                  value: /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/i,
                  message: "This must be a valid email address",
                },
              })}
            />
          </div>
          <div className="text-right mt-4">
            <ArrowButton loading={loading} type="submit" disabled={loading} minWidthClass="min-w-40">
              {t("submit")}
            </ArrowButton>
          </div>
        </div>
      </form>
    </div>
  );
}

PasswordReset.getLayout = function getLayout(page: ReactElement) {
  return <LayoutWithoutFooter>{page}</LayoutWithoutFooter>;
};

export const getStaticProps: GetStaticProps = async ({ locale }) => ({ props: { ...(await i18Translate(locale as string)) } });
