import { createApi } from "@reduxjs/toolkit/dist/query/react";
import baseQuery from "@/config/baseQuery";
import { setCurrent, setCurrentMintingStatus, setList } from "../feature/profile/certificate.slice";

const certificateService = createApi({
  reducerPath: "certificates",
  baseQuery: baseQuery(),
  endpoints: (builder) => ({
    fetchAllCertificates: builder.query({
      query: ({ username, locale }: { username: string; locale?: string }) => ({
        url: `certificates?username=${username}`,
        headers: {
          "accept-language": locale,
        },
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(setList(data));
        } catch (error) {
          console.log("error", error);
        }
      },
    }),
    mint: builder.mutation({
      query: ({ id, address, signature }) => ({}),

      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {},
    }),
    findCertificate: builder.query({
      query: ({ id, locale }: { id: string; locale?: string }) => ({
        url: `/certificates/${id}`,
        headers: {
          "accept-language": locale,
        },
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(setCurrent(data));
          dispatch(setCurrentMintingStatus(!!data?.minting?.tx));
        } catch (error) {
          console.log("error", error);
        }
      },
    }),
  }),
});

export default certificateService;

export const fetchAllCertificates = ({ locale, username }: { locale?: string; username: string }) =>
  certificateService.endpoints.fetchAllCertificates.initiate({
    locale,
    username,
  });

export const findCertificate = ({ id, locale }: { id: string; locale?: string }) =>
  certificateService.endpoints.findCertificate.initiate({
    id,
    locale,
  });

interface MintCertificateArgs {
  id: string;
  address: string;
  signature: string;
}
export const mintCertificate =
  async ({ id, address, signature }: MintCertificateArgs) =>
  (dispatch: any) =>
    dispatch(
      certificateService.endpoints.mint.initiate({
        id,
        address,
        signature,
      })
    );

export const { useFetchAllCertificatesQuery, useFindCertificateQuery } = certificateService;

export default certificateService;
