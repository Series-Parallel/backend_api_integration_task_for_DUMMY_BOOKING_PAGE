import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ProgressState {
  progress: number;
}

const initialState: ProgressState = {
  progress: 1,
};

const progressSlice = createSlice({
  name: "progress",
  initialState,
  reducers: {
    setProgress(state, action: PayloadAction<number>) {
      state.progress = Math.max(1, Math.min(3, action.payload)); // Keep within bounds
    },
  },
});

export const { setProgress } = progressSlice.actions;
export default progressSlice.reducer;
