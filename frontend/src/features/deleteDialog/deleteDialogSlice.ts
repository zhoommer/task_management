import { createSlice } from "@reduxjs/toolkit";


const initialState: { show: boolean } = {
  show: false,
};

export const deleteDialogSlice = createSlice({
  name: "deleteDialog",
  initialState,
  reducers: {
    openDeleteDialog: (state) => {
      state.show = true;
    },
    closeDeleteDialog: (state) => {
      state.show = false;
    }
  }
})

export default deleteDialogSlice.reducer;
export const { openDeleteDialog, closeDeleteDialog } = deleteDialogSlice.actions;
