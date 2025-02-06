import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface StepState {
  step: number;
}

const initialState: StepState = {
  step: 1,
};

const stepSlice = createSlice({
  name: "step",
  initialState,
  reducers: {
    setStep: (state, action: PayloadAction<number>) => {
      state.step = action.payload;
    },
    decreseStep: (state) => {
      if (state.step > 0) {
        state.step -= 1;
      }
    },
  },
});

export const { setStep, decreseStep } = stepSlice.actions;
export default stepSlice.reducer;
