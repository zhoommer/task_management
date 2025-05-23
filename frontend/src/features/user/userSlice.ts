import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { User } from "./types";

type InitialState = {
  loading: boolean;
  users: User[];
};

const initialState: InitialState = {
  loading: false,
  users: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    },
  },
});

export default userSlice.reducer;
export const { setLoading, setUsers } = userSlice.actions;
