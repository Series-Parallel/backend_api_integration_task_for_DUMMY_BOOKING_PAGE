// import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// interface ParticipantsState {
//   participants: string[]; // Change numDivs to participants array
// }

// const initialState: ParticipantsState = {
//   participants: [],
// };

// const participantsSlice = createSlice({
//   name: "participants",
//   initialState,
//   reducers: {
//     addParticipant(state, action: PayloadAction<string>) {
//       state.participants.push(action.payload);
//     },
//     removeParticipant(state, action: PayloadAction<number>) {
//       console.log("index", action);
//       state.participants = state.participants.filter(
//         (_, i) => i !== action.payload
//       );
//     },
//   },
// });

// export const { addParticipant, removeParticipant } = participantsSlice.actions;
// export default participantsSlice.reducer;
