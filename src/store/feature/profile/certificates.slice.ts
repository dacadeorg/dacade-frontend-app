import api from "@/config/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
export const certificatesProfile = createSlice({
  name: "certificates",
  initialState: {
    list: [
      {
        id: "20a8ede9-ac67-4c96-9628-7c685291223a",
        ref: "certificates/20a8ede9-ac67-4c96-9628-7c685291223a",
        created_at: "2023-01-09T19:00:46.401Z",
        updated_at: "2023-01-09T19:00:46.401Z",
        metadata: {
          image:
            "https://dacade.org/img/communities/celo.svg%22,%22issuerName%22:%22Dacade%22,%22name%22:%22Celo Blockchain 101",
          description:
            "In this course, you will learn the most important blockchain concepts that you will need to navigate the Celo ecosystem.",
          recipientName: "jonathan_z",
          issuedOn: "2023-01-09T19:00:46.331Z",
        },
        answer:
          "interactive-modules-answers/13c7dd34-4efd-4882-97b1-c5cb3838e05a",
        user_id: "TEP4ulEfKXZv8gDKZJJ7AcYCAjW2",
        course: "courses/287074e4-d3fe-4f33-a9c8-c9e33781cd30",
        type: "INTERACTIVE_MODULE",
        community: {
          id: "b90cfc32-a3b2-4241-9f43-755b9cdc5e3f",
          ref: "communities/b90cfc32-a3b2-4241-9f43-755b9cdc5e3f",
          created_at: "2021-06-17T10:23:18.251Z",
          updated_at: "2023-05-03T10:32:17.329Z",
          icon: "/img/communities/celo.svg",
          active: true,
          colors: {
            textAccent: "#34b276",
            accent: "#2E3337",
            text: "#fff",
            primary: "#35C07D",
          },
          description:
            "Learn about key concepts and how to write smart contracts and Dapps on Celo.",
          summary:
            "In this community, you will learn important Celo concepts, write smart contracts in Solidity, and build dapps on the Celo blockchain.",
          name: "Celo Community",
          slug: "celo",
          metadata: { submissions: 432, feedbacks: 1300 },
          timestamp: 1623925398251,
        },
        entity:
          "interactive-modules/00d0e2ae-a3c5-424b-a3b1-9daf03064f1d",
        timestamp: 1673290846401,
      },
    ],
    // TODO: to be strongly typed later
    current: null as any,
    currentMinted: false,
  },
  reducers: {
    setCurrent(state, payload: any) {
      state.current = payload;
    },

    setCurrentMintingStatus(state, payload: any) {
      state.currentMinted = payload;
    },

    setList(state, payload: any) {
      state.list = payload;
    },

    clear(state) {
      state.list = [];
      state.current = null as any;
    },
  },
});

export const { setCurrent, setList, clear, setCurrentMintingStatus } =
  certificatesProfile.actions;

export const findCertificate = createAsyncThunk(
  "certificates/findCertificate",
  async (id: string, thunkAPI) => {
    const { data } = await api().server.get(`/certificates/${id}`);
    thunkAPI.dispatch(setCurrent(data));
    thunkAPI.dispatch(
      setCurrentMintingStatus(!!data?.minting?.tx as any)
    );
    return data;
  }
);

export const fetchAllCertificates = createAsyncThunk(
  "certificates/fetchAllCertificates",
  async (username: string, thunkAPI) => {
    thunkAPI.dispatch(clear());
    const { data } = await api().server.get(
      `/certificates/${username}`
    );
    thunkAPI.dispatch(setList(data));
    return data;
  }
);
