import { useForm } from "react-hook-form";
import { useTranslation } from "next-i18next";
import ArrowButton from "@/components/ui/button/Arrow";
import Input from "@/components/ui/Input";
import { getMetadataTitle } from "@/utilities/Metadata";
import { ReactElement, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import { GetStaticProps } from "next";
import i18Translate from "@/utilities/I18Translate";
import LayoutWithoutFooter from "@/layouts/WithoutFooter";
import { authCheck, login } from "@/store/feature/auth.slice";
import { useDispatch } from "@/hooks/useTypedDispatch";
import EmailInput from "@/components/ui/EmailInput";
import { useSelector } from "@/hooks/useTypedSelector";
import { FormValues } from "./signup";
import Loader from "@/components/ui/Loader";

/**
 * Login form values
 * @date 4/6/2023 - 4:15:39 PM
 *
 * @interface FormValues
 * @typedef {FormValues}
 */

/**
 * Login page
 * @date 4/6/2023 - 4:15:13 PM
 *
 * @export
 * @returns {ReactElement}
 */
export default function Login(): ReactElement {
  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const emailValue = watch("email");
  const passwordValue = watch("password");
  const { authUser, isFetchingUser, isChecked } = useSelector((state) => ({
    authUser: state.user.data,
    isFetchingUser: state.user.fetchingUserLoading,
    isChecked: authCheck(state),
  }));

  const onSubmit = async (form: FormValues) => {
    const loginData = {
      email: form.email,
      password: form.password,
    };

    try {
      setLoading(true);
      await dispatch(login(loginData));
      // router.replace("/bounties");
      if (isChecked) router.replace("/bounties");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isFetchingUser || authUser) router.push("/");
  }, [isFetchingUser, authUser]);

  if (isFetchingUser || authUser) {
    return (
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 h-full w-full -translate-y-1/2 z-999 flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{getMetadataTitle(t("login-page.signin.title"))}</title>
      </Head>
      <div className="absolute top-0 flex items-center w-full h-full -justify-center">
        <form className="content-wrapper" onSubmit={handleSubmit(onSubmit)}>
          <div className="mx-auto lg:w-98 xl:w-98">
            <div>
              <h1 className="my-5 text-5xl">{t("login-page.signin.title")}</h1>
            </div>
            <div className="relative mb-5">
              <div>
                <EmailInput errors={errors} register={register} emailValue={emailValue} />
              </div>
            </div>
            <div>
              <div>
                <Input
                  /* In backticks `` because placeholder requires a string.
                   * Same for label
                   */
                  placeholder={`${t("login-page.password.placeholder")}`}
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
            </div>
            <div className="flex flex-col justify-between mt-4">
              <div>
                <span className="text-sm text-primary">
                  <Link href="/password-reset" className="fs-1 dark-white">
                    {t("login-page.forget-password")}
                  </Link>
                </span>
              </div>
              <div className="self-end text-right">
                <ArrowButton type="submit" minWidthClass="min-w-40" arrowClasses="text-white" loading={loading} disabled={loading}>
                  {t("login-page.signin.button")}
                </ArrowButton>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

Login.getLayout = function (page: ReactElement) {
  return <LayoutWithoutFooter>{page}</LayoutWithoutFooter>;
};

export const getStaticProps: GetStaticProps = async ({ locale }) => i18Translate(locale as string);
