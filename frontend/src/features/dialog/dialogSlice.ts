import { createSlice } from "@reduxjs/toolkit";

const initialState: { isOpen: boolean } = {
  isOpen: false,
}

export const dialogSlice = createSlice({
  name: 'dialog',
  initialState,
  reducers: {
    openDialog: (state) => {
      state.isOpen = true;
    },
    closeDialog: (state) => {
      state.isOpen = false;
    }
  },
})

export default dialogSlice.reducer;
export const { openDialog, closeDialog } = dialogSlice.actions;
