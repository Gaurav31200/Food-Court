import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  modal: false,
  form: false,
  isBtnHighlighted: false,
};
const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    openForm(state) {
      state.form = true;
    },
    closeForm(state) {
      state.form = false;
    },
    openModal(state) {
      state.modal = true;
    },
    closeModal(state) {
      state.modal = false;
    },
    setBtnToHighlight(state) {
      state.isBtnHighlighted = true;
    },
    setBtnToNormal(state) {
      state.isBtnHighlighted = false;
    },
    resetUi(state) {
      state.modal = false;
      state.form = false;
      state.isBtnHighlighted = false;
    },
  },
});

export default uiSlice.reducer;
export const uiActions = uiSlice.actions;
