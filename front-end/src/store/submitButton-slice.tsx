import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SubmitButtonState {
  isSubmitButtonClicked: boolean;
}

const initialState: SubmitButtonState = {
  isSubmitButtonClicked: false,
};

const submitButtonSlice = createSlice({
  name: "submitButton",
  initialState,
  reducers: {
    setSubmitButtonClicked(state, action: PayloadAction<boolean>) {
      state.isSubmitButtonClicked = action.payload;
    },
  },
});

export const { setSubmitButtonClicked } = submitButtonSlice.actions;
export default submitButtonSlice.reducer;
