import { UserRecord } from "@/api/services/loginApi";
import { createSlice } from "@reduxjs/toolkit";

export interface AuthSlice {
  user: UserRecord;
  token: string;
}

export const initialStateAuthSlice: AuthSlice = {
  user: {
    avatar: "",
    collectionId: "",
    collectionName: "",
    created: "",
    email: "",
    emailVisibility: false,
    id: "",
    name: "",
    rol: "",
    updated: "",
    verified: false,
  },
  token: "",
};

export const authSlice = createSlice({
  name: "counter",
  initialState: initialStateAuthSlice,
  reducers: {
    resetAuthSlice: () => initialStateAuthSlice,
    setUserSlice: (state, { payload }: { payload: UserRecord }) => {
      state.user = payload;
    },
    setTokenSlice: (state, { payload }: { payload: string }) => {
      state.token = payload;
    },
  },
});

export const { resetAuthSlice, setUserSlice, setTokenSlice } =
authSlice.actions;

export default authSlice.reducer;
