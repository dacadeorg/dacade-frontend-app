import { useForm } from "react-hook-form";
import { useTranslation } from "next-i18next";
import ArrowButton from "@/components/ui/button/Arrow";
import Input from "@/components/ui/Input";
import { getMetadataTitle } from "@/utilities/Metadata";
import { ReactElement, useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import { GetStaticProps } from "next";
import i18Translate from "@/utilities/I18Translate";

/**
 * Login form values
 * @date 4/6/2023 - 4:15:39 PM
 *
 * @interface FormValues
 * @typedef {FormValues}
 */

interface FormValues {
  email: string;
  password: string;
}

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
  const [passwordValue, setPasswordValue] = useState("");
  const emailValue = watch("email");

  const onSubmit = (form: FormValues) => {
    console.log(errors.password);
    const loginData = {
      email: form.email,
      password: form.password,
    };

    // setLoading(true);
    // replace 'auth/login' with your actual login action
    // dispatch(login(loginData))
    try {
      // TODO: Should be uncommented after the homepage being merged
      //   await dispatch(login(loginData));
      router.replace("/bounties");
    } catch (err) {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>
          {getMetadataTitle(t("login-page.signin.title"))}
        </title>
      </Head>
      <div className="absolute w-full top-0 min-h-screen flex items-center">
        <form
          className="content-wrapper"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="lg:w-98 xl:w-98 mx-auto">
            <div>
              <h1 className="text-5xl my-5">
                {t("login-page.signin.title")}
              </h1>
            </div>
            <div className="mb-5 relative">
              <div>
                <Input
                  // In backticks `` because placeholder requires a string.
                  // Same for label
                  placeholder={`${t("login-page.email.placeholder")}`}
                  label={`${t("login-page.email.label")}`}
                  error={errors.email?.message}
                  id="input-1"
                  type="email"
                  value={emailValue}
                  {...register("email", {
                    required: "Please enter your email",
                    pattern: {
                      value:
                        /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/i,
                      message: "The email is not valid",
                    },
                  })}
                />
              </div>
            </div>
            <div>
              <div>
                <Input
                  // In backticks `` because placeholder requires a string.
                  // Same for label
                  placeholder={`${t(
                    "login-page.password.placeholder"
                  )}`}
                  label={`${t("login-page.password.label")}`}
                  error={errors.password?.message}
                  id="text-password"
                  type="password"
                  value={passwordValue}
                  onInput={(value) => setPasswordValue(value)}
                  {...register("password", {
                    required: "Please enter your password",
                    minLength: {
                      value: 6,
                      message:
                        "The password must be at least 6 characters",
                    },
                  })}
                />
              </div>
            </div>
            <div className="flex flex-col justify-between mt-4">
              <div>
                <span className="text-primary text-sm">
                  <Link
                    href="/password-reset"
                    className="fs-1 dark-white"
                  >
                    {t("login-page.forget-password")}
                  </Link>
                </span>
              </div>
              <div className="text-right self-end">
                <ArrowButton
                  type="submit"
                  minWidthClass="min-w-40"
                  arrowClasses="text-white"
                  loading={loading}
                  disabled={loading}
                >
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

export const getStaticProps: GetStaticProps = async ({ locale }) =>
  i18Translate(locale as string);
