import baseQuery from "@/config/baseQuery";
import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { login, setAuthData } from "../feature/auth.slice";
import { clearError, setBusy, setError } from "../feature/index.slice";

/**
 * Auth service
 * @date 4/18/2023 - 12:49:20 PM
 *
 * @type {*}
 */
export const authService = createApi({
  reducerPath: "authService",
  baseQuery: baseQuery(),
  endpoints: (builder) => ({
    /**
     * Signup endpoint
     * @method POST
     * @enpoint notifications/read
     */
    signUp: builder.mutation({
      query: ({ payload, locale }) => ({
        url: `auth/signup`,
        headers: {
          "accept-language": locale,
        },
        body: payload,
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(setBusy(true));
          dispatch(clearError());
          dispatch(
            login({
              email: data.payload.email,
              password: data.payload.password,
            })
          );
        } catch (error) {
          dispatch(setAuthData(null));
          dispatch(setBusy(false));
          dispatch(setError(error));
        }
      },
    }),
    /**
     * Resend verification endpoint
     * @method POST
     * @enpoint notifications/read
     */
    resendEmailVerification: builder.query({
      query: (locale) => ({
        url: `auth/send-verification-email`,
        headers: {
          "accept-language": locale,
        },
      }),
    }),
    /**
     * Verify Email endpoint
     * @method POST
     * @enpoint notifications/read
     */
    verifyEmail: builder.mutation({
      query: ({ payload, locale }) => ({
        url: "auth/verify-email",
        headers: {
          "accept-language": locale,
        },
        method: "POST",
        body: payload,
      }),
    }),
  }),
});

/**
 * Signup function
 * @date 4/18/2023 - 12:44:30 PM
 *
 * @param {{locale?: string, payload: {}}} {locale, payload}
 * @returns {*}
 */
export const signUp = ({ locale, payload }: { locale?: string; payload: {} }) => authService.endpoints.signUp.initiate({ locale, payload });

/**
 * Resend email verification function
 * @date 4/18/2023 - 12:45:36 PM
 *
 * @param {?string} [locale]
 * @returns {*}
 */
export const resendEmailVerification = (locale?: string) => authService.endpoints.resendEmailVerification.initiate(locale);

/**
 * Verify email function
 * @date 4/18/2023 - 12:46:07 PM
 *
 * @param {?string} [locale]
 */
export const verifyEmail = async ({ payload, locale }: { payload: { code: string }; locale?: string }) =>
  await authService.endpoints.verifyEmail.initiate({
    locale,
    payload,
  });
