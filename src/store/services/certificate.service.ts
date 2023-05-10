import { createApi } from "@reduxjs/toolkit/dist/query/react";
import baseQuery from "@/config/baseQuery";
import {
  setCurrentCertificate,
  setCurrentMintingStatus,
  setCertificateList,
} from "../feature/profile/certificate.slice";
import { store } from "..";
import { Dispatch } from "@reduxjs/toolkit";

const certificateService = createApi({
  reducerPath: "certificates",
  baseQuery: baseQuery(),
  endpoints: (builder) => ({
    fetchAllCertificates: builder.query({
      query: ({
        username,
        locale,
      }: {
        username: string;
        locale?: string;
      }) => ({
        url: `/certificates/${username}`,
        headers: {
          "accept-language": locale,
        },
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(setCertificateList(data));
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
          dispatch(setCurrentCertificate(data));
          dispatch(setCurrentMintingStatus(!!data?.minting?.tx));
        } catch (error) {
          console.log("error", error);
        }
      },
    }),

    mint: builder.mutation({
      query: ({ id, address, signature }) => ({
        url: "certificates/mint",
        method: "POST",
        body: {
          certificateId: id,
          receiver: address,
          signature,
        },
      }),

      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        const { data } = await queryFulfilled;
        if (data.certificate) {
          const currentCertificate =
            store.getState().profile.certificate.current;
          dispatch(
            setCurrentCertificate({
              ...(currentCertificate || data.certificate),
              minting: data.certificate.minting,
            })
          );
        }
      },
    }),
  }),
});

interface FetchAllCertificatesArgs {
  locale?: string;
  username: string;
}
export const fetchAllCertificates = ({
  locale,
  username,
}: FetchAllCertificatesArgs) =>
  certificateService.endpoints.fetchAllCertificates.initiate({
    locale,
    username,
  });

interface FindCertificateArgs {
  id: string;
  locale?: string;
}
export const findCertificate = ({
  id,
  locale,
}: FindCertificateArgs) =>
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

export const {
  useFetchAllCertificatesQuery,
  useFindCertificateQuery,
} = certificateService;
