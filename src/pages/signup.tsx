import { useForm } from "react-hook-form";
import { useTranslation } from "next-i18next";
import ArrowButton from "@/components/ui/button/Arrow";
import Input from "@/components/ui/Input";
import { getMetadataTitle } from "@/utilities/Metadata";
import { ReactElement, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import { GetStaticProps } from "next";
import i18Translate from "@/utilities/I18Translate";
import { useSelector } from "@/hooks/useTypedSelector";
import { useDispatch } from "@/hooks/useTypedDispatch";
import classNames from "classnames";
import Checkbox from "@/components/ui/Checkbox";
import { singUp } from "@/store/feature/auth.slice";
import ReferralsList from "@/components/popups/referral/List";

/**
 * Signup form values
 * @date 4/6/2023 - 4:15:39 PM
 *
 * @interface FormValues
 * @typedef {FormValues}
 */

interface FormValues {
  email: string;
  username: string;
  password: string;
  referralCode: string;
  checkTerms: boolean;
}

/**
 * signup page
 * @date 4/6/2023 - 4:15:13 PM
 *
 * @export
 * @returns {ReactElement}
 */
export default function Signup(): ReactElement {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const { query } = useRouter();
  const referrer = query.invite;
  const referrals = useSelector((state) => state.referrals.list);
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const onSubmit = (form: FormValues) => {
    setLoading(true);
    const { email, username, password, referralCode, checkTerms } = form;
    const signupData = {
      email,
      username,
      password,
      referralCode,
      referrer,
    };

    try {
      if (!checkTerms) return;
      setLoading(false);
      dispatch(singUp(signupData));
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>
          {getMetadataTitle(t("login-page.signup.title"))}
        </title>
      </Head>
      <div className="absolute w-full top-0 min-h-screen flex items-center">
        <form
          className="content-wrapper pt-24"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="lg:w-98 xl:w-98 mx-auto">
            {referrer && (
              <div className="p-px">
                <h1 className="text-.5xl mb-2.5 font-medium leading-6 text-gray-900">
                  <span className="capitalize">{referrer}</span>
                  {t("signup-page.referrer.title")}
                  {t("app.name")}
                </h1>
                <p
                  className={classNames("my-px text-gray-700", {
                    invisible: !(referrals && referrals.length),
                  })}
                >
                  {t("signup-page.referrer.subtitle")}
                </p>

                {referrals && referrals.length && (
                  <div className="my-8">
                    <ReferralsList bounty />
                  </div>
                )}
              </div>
            )}

            {!referrer && (
              <h1 className="text-5xl my-5">
                {t("login-page.signup.title")}
              </h1>
            )}

            <div className="mb-5 relative">
              <div>
                <Input
                  id="email"
                  type="email"
                  placeholder={`${t("login-page.email.placeholder")}`}
                  label={`${t("login-page.email.label")}`}
                  error={errors.email?.message}
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
            </div>
            <div className="mb-5 relative">
              <Input
                id="username"
                placeholder={`${t("login-page.username.placeholde")}`}
                label={`${t("login-page.username.label")}`}
                error={errors.username?.message}
                {...register("username", {
                  required: "This field is required",
                  minLength: {
                    value: 3,
                    message: "The username is too short",
                  },
                })}
              />
            </div>
            <div className="mb-5 relative">
              <Input
                id="password"
                type="password"
                placeholder={`${t("login-page.password.placeholde")}`}
                label={`${t("login-page.password.label")}`}
                error={errors.password?.message}
                {...register("password", {
                  required: "This field is required",
                  minLength: {
                    value: 3,
                    message: "The password is too short",
                  },
                })}
              />
            </div>
            {!referrer && (
              <div className="mb-5 relative">
                <Input
                  id="referralCode"
                  placeholder={`${t(
                    "login-page.refcode.placeholder"
                  )}`}
                  label={`${t("login-page.refcode.label")}`}
                  error={errors.referralCode?.message}
                  {...register("referralCode", {
                    minLength: {
                      value: 3,
                      message: "The referral code is too short",
                    },
                  })}
                />
              </div>
            )}

            <div className="flex justify-between mt-4">
              <div className="flex flex-col self-start">
                <div className="max-w-xm">
                  <div className="flex space-x-3">
                    <div>
                      <Checkbox
                        id="terms-checkbox"
                        {...register("checkTerms", {
                          required: `${t("signup-page.terms.warning")}`,
                        })}
                      />
                    </div>
                    <div className="max-w-none test">
                      <p>I agree to {t("app.name")}s</p>
                      <Link
                        className="underline"
                        href="/terms-conditions"
                      >
                        {t("signup-page.terms")}
                      </Link>
                    </div>
                  </div>
                  <span className="text-red-600">
                    {errors.checkTerms?.message}
                  </span>
                </div>
              </div>

              <div className="flex text-right self-start">
                <ArrowButton
                  loading={loading}
                  type="submit"
                  minWidthClass="min-w-40"
                  arrowClasses="text-white"
                  disabled={loading}
                >
                  {t("login-page.signup.button")}
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
