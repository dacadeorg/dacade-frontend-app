import baseQuery from "@/config/baseQuery";
import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { login, setAuthData, setIsVerificationInProgress } from "../feature/auth.slice";
import { clearError, setBusy, setError } from "../feature/index.slice";
import { createAnalyticEvent } from "../feature/events.slice";

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
     * @enpoint auth/signup
     */
    signUp: builder.mutation({
      query: ({ payload, locale }) => ({
        url: "auth/signup",
        method: "POST",
        headers: {
          "accept-language": locale,
        },
        body: payload,
      }),
      onQueryStarted: async ({ payload }, { dispatch, queryFulfilled }) => {
        try {
          dispatch(setBusy(true));
          dispatch(clearError());
          const { data } = await queryFulfilled;
          // Send the event to firebase analytics
          createAnalyticEvent({ name: "user-signed-up", attributes: { userId: data.uid } });

          await dispatch(login({ email: payload.email, password: payload.password }));
        } catch (error) {
          dispatch(setAuthData(null));
          dispatch(setBusy(false));
          dispatch(setError(error));
          throw error;
        }
      },
    }),
    /**
     * Resend verification endpoint
     * @method POST
     * @enpoint auth/send-verification-email
     */
    resendEmailVerification: builder.query({
      query: (locale) => ({
        url: "auth/send-verification-email",
        headers: {
          "accept-language": locale,
        },
      }),
    }),
    /**
     * Verify Email endpoint
     * @method POST
     * @enpoint auth/verify-email
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

      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          if (data.success) dispatch(setIsVerificationInProgress(false));
        } catch (err) {
          console.warn("found the in verifying", err);
        }
      },
    }),
    /**
     * Verify Email Update endpoint
     * @method POST
     * @enpoint auth/verify-email-update
     */
    verifyEmailUpdate: builder.mutation({
      query: ({ payload, locale }) => ({
        url: "auth/verify-email-update",
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
export const signUp = ({ locale, payload }: { locale?: string; payload: object }) => authService.endpoints.signUp.initiate({ locale, payload });

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
export const verifyEmail = ({ payload, locale }: { payload: { code: string }; locale?: string }) => authService.endpoints.verifyEmail.initiate({ locale, payload });

/**
 * Verify email update function
 * @date 7/28/2023 - 12:46:07 PM
 *
 * @param {?string} [locale]
 */
export const verifyEmailUpdate = ({ payload, locale }: { payload: { code: string }; locale?: string }) => authService.endpoints.verifyEmailUpdate.initiate({ locale, payload });
