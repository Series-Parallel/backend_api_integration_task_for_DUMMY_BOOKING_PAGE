import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ParticipantsState {
  numDivs: number;
}

const initialState: ParticipantsState = {
  numDivs: 0,
};

const participantsSlice = createSlice({
  name: "participants",
  initialState,
  reducers: {
    incrementDivs(state) {
      state.numDivs += 1;
    },

    decrementDivs(state) {
      state.numDivs -= 1;
    },
  },
});

export const { incrementDivs, decrementDivs } = participantsSlice.actions;
export default participantsSlice.reducer;
