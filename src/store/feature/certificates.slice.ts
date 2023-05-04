import api from "@/config/api";
import { Certificate } from "@/types/certificate";
import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
// import {
//   createApi,
//   fetchBaseQuery,
// } from "@reduxjs/toolkit/query/react";

interface ICertificateSlice {
  list: Certificate[];
  current: Certificate | null;
  currentMinted: boolean;
}

const initialState: ICertificateSlice = {
  list: [],
  current: null,
  currentMinted: false,
};

export const findCertificate = createAsyncThunk(
  "certificates/findCertificate",
  async (id: string) => {
    const { data } = await api().server.get(`/certificates/${id}`);
    return data as Certificate;
  }
);

export const fetchAllCertificates = createAsyncThunk(
  "certificates/fetchAllCertificates",
  async (username: string, thunkAPI) => {
    const { data } = await api().server.get(
      `/certificates/${username}`
    );
    return data as Certificate[];
  }
);

export const certificatesProfile = createSlice({
  name: "certificates",
  initialState,
  reducers: {
    setCurrent(state, action: PayloadAction<Certificate>) {
      state.current = action.payload;
    },

    setCurrentMintingStatus(state, action: PayloadAction<boolean>) {
      state.currentMinted = action.payload;
    },

    setList(state, action: PayloadAction<Certificate[]>) {
      state.list = action.payload;
    },

    clear(state) {
      state.list = [];
      state.current = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      findCertificate.fulfilled,
      (state, action: PayloadAction<Certificate>) => {
        state.current = action.payload;
        state.currentMinted = !!action.payload?.minting?.tx;
      }
    );

    builder.addCase(fetchAllCertificates.pending, (state) => {
      state.list = [];
      state.current = null;
    });

    builder.addCase(
      fetchAllCertificates.fulfilled,
      (state, action: PayloadAction<Certificate[]>) => {
        state.list = action.payload;
      }
    );
  },
});
// Transform the above code into createApi from RTK Query
// const slice = createApi({
//   reducerPath: "certificates",
//   baseQuery: fetchBaseQuery({
//     baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
//   }),
//   endpoints: (builder) => ({
//     fetchAllCertificates: builder.query<Certificate[], string>({
//       query: (username) => `/certificates/${username}`,
//     }),
//     findCertificate: builder.query<Certificate, string>({
//       query: (id) => `/certificates/${id}`,
//     }),
//   }),
// });

export const { setCurrent, setList, clear, setCurrentMintingStatus } =
  certificatesProfile.actions;
