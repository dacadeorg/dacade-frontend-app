import { createApi } from "@reduxjs/toolkit/dist/query/react";
import baseQuery from "@/config/baseQuery";
import { setCurrent, setCurrentMintingStatus, setList } from "../feature/profile/certificate.slice";

const certificateService = createApi({
  reducerPath: "certificates",
  baseQuery: baseQuery(),
  endpoints: (builder) => ({
    fetchAllCertificates: builder.query({
      query: ({ username, locale }: { username: string; locale?: string }) => ({
        url: `/certificates/${username}`,
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
export const { useFetchAllCertificatesQuery, useFindCertificateQuery } = certificateService;

export default certificateService;
