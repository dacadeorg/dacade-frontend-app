import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { auth as firebaseAuth } from "@/config/firebase";
import { IRootState } from "@/store";
import { sleep } from "@/utilities";
import api from "@/config/api";
import { fetchUser } from "../services/user.service";
import snsWebSdk from "@sumsub/websdk";

interface SumsubVerificationState {
  sumsubToken: string | null;
  showModal: boolean;
  loading: boolean;
  verifying: boolean;
  completed: boolean;
  description: string | null;
  title: string | null;
  completedText: string | null;
  actionText: string | null;
  completedActionText: string | null;
  completedAction: (() => Promise<void>) | null;
}

const defaultState: SumsubVerificationState = {
  sumsubToken: null,
  showModal: false,
  loading: false,
  verifying: false,
  completed: false,
  description: null,
  title: null,
  completedText: null,
  actionText: null,
  completedActionText: null,
  completedAction: null,
};

let snsWebSdkInstance: any = null;

export const getSumsubToken = () => async (dispatch: any) => {
  const user = firebaseAuth?.currentUser;
  if (user) {
    try {
      const { data } = await api().client.post("users/sumsub/get-access-token");
      const token = data.token;
      dispatch(setSumsubToken(token));
      return token;
    } catch (e) {
      console.log(e);
      return null;
    }
  }
};

/**
 * Function that opens the verification modal
 * @date 5/22/2023 - 10:39:29 AM
 *
 * @param {*} payload
 * @returns {(dispatch: any) => any}
 */
export const openVerificationModal = createAsyncThunk("Verificationmodal/open", async (payload: any, { dispatch, getState }) => {
  const state = getState() as IRootState;
  const isKycVerified = state.user.data?.kycStatus === "VERIFIED";
  if (isKycVerified) {
    dispatch(closeVerificationModal());
    triggerCompleteAction();
    return;
  }
  dispatch(setShowModal(true));
  dispatch(setModelContent(payload || {}));
});

/**
 * Close the modal
 * @date 5/22/2023 - 10:39:57 AM
 *
 * @returns {(dispatch: any) => void}
 */

export const closeVerificationModal = createAsyncThunk("verificationModal/close", (_, { dispatch }) => {
  dispatch(setShowModal(false));
  dispatch(setLoading(false));
  dispatch(setVerifying(false));
  if (snsWebSdkInstance) {
    snsWebSdkInstance?.destroy();
  }
});

export const triggerCompleteAction = createAsyncThunk("completeAction/trigger", async (_, { getState }) => {
  const state = getState() as IRootState;
  const completedAction = state.sumsubVerification.completedAction;
  if (!completedAction) return;
  try {
    await completedAction();
  } catch (e) {
    console.log(e);
  }
});

/**
 * Tiggered when all the verifications are done
 * @date 5/22/2023 - 9:58:50 AM
 *
 */
export const completeSumSubVerification = createAsyncThunk("sumsub/completeSumSubVerification", async (_, { dispatch }) => {
  await sleep(2000);
  dispatch(setLoading(true));
  await dispatch(fetchUser());
  dispatch(setCompleted(true));
  dispatch(setVerifying(false));
  dispatch(setLoading(false));
});

/**
 * An async action that launch the  webSKd that verifies if user is auth modal
 * @date 5/22/2023 - 9:24:24 AM
 *
 */
export const launchWebSdk = createAsyncThunk("sumsub/launchWebSdk", async (_, { dispatch, getState }) => {
  dispatch(setLoading(true));

  const accessToken = await dispatch(getSumsubToken());

  if (!accessToken) return;
  const state = getState() as IRootState;
  const user = state.user.data;

  snsWebSdkInstance = snsWebSdk
    .init(accessToken, async () => {
      const vv = await dispatch(getSumsubToken());
      return vv;
    })
    .withConf({
      lang: "en",
      email: user?.email,
    })
    .withOptions({ addViewportTag: false, adaptIframeHeight: true })
    .on("idCheck.applicantStatus", () => {
      dispatch(completeSumSubVerification());
    })
    .build();

  await sleep(2000);
  snsWebSdkInstance.launch("#sumsub-websdk-container");

  await sleep(1000);
  dispatch(setLoading(false));
  dispatch(setVerifying(true));
});

const sumsubVerificationSlice = createSlice({
  name: "sumsubVerification",
  initialState: defaultState,
  reducers: {
    setSumsubToken: (state, action) => {
      state.sumsubToken = action.payload;
    },
    setShowModal: (state, action) => {
      state.showModal = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setVerifying: (state, action) => {
      state.verifying = action.payload;
    },
    setCompleted: (state, action) => {
      state.completed = action.payload;
    },
    setModelContent: (state, action) => {
      state.description = action.payload.description;
      state.title = action.payload.title;
      state.completedText = action.payload.completedText;
      state.actionText = action.payload.actionText;
      state.completedActionText = action.payload.completedActionText;
      state.completedAction = action.payload.completedAction;
    },
  },
});

export const { setSumsubToken, setShowModal, setLoading, setVerifying, setCompleted, setModelContent } = sumsubVerificationSlice.actions;

export const selectSumsubToken = (state: IRootState) => state.sumsubVerification.sumsubToken;
export const selectShowModal = (state: IRootState) => state.sumsubVerification.showModal;
export const selectLoading = (state: IRootState) => state.sumsubVerification.loading;
export const selectVerifying = (state: IRootState) => state.sumsubVerification.verifying;
export const selectCompleted = (state: IRootState) => state.sumsubVerification.completed;
export const selectDescription = (state: IRootState) => state.sumsubVerification.description;

export const selectTitle = (state: IRootState) => state.sumsubVerification.title;
export const selectCompletedText = (state: IRootState) => state.sumsubVerification.completedText;
export const selectActionText = (state: IRootState) => state.sumsubVerification.actionText;
export const selectCompletedActionText = (state: IRootState) => state.sumsubVerification.completedActionText;

export default sumsubVerificationSlice;
