import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ParticipantsState {
  participants: string[]; // Change numDivs to participants array
}

const initialState: ParticipantsState = {
  participants: [],
};

const participantsSlice = createSlice({
  name: "participants",
  initialState,
  reducers: {
    addParticipant(state, action: PayloadAction<string>) {
      state.participants.push(action.payload); // Add participant to the array
    },
    removeParticipant(state, action: PayloadAction<number>) {
      state.participants.splice(action.payload, 1); // Remove participant at a specific index
    },
  },
});

export const { addParticipant, removeParticipant } = participantsSlice.actions;
export default participantsSlice.reducer;
