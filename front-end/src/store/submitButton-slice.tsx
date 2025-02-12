import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SubmitButtonState {
  isSubmitButtonClicked: boolean;
  bookingConfirm: boolean;
}

const initialState: SubmitButtonState = {
  isSubmitButtonClicked: false,
  bookingConfirm: false,
};

const submitButtonSlice = createSlice({
  name: "submitButton",
  initialState,
  reducers: {
    setSubmitButtonClicked(state, action: PayloadAction<boolean>) {
      state.isSubmitButtonClicked = action.payload;
    },
    setBookingConfirm(state, action: PayloadAction<boolean>) {
      state.bookingConfirm = action.payload;
    },
  },
});

export const { setSubmitButtonClicked, setBookingConfirm } =
  submitButtonSlice.actions;
export default submitButtonSlice.reducer;
