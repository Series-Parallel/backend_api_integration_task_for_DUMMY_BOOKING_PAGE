import { configureStore } from "@reduxjs/toolkit";
import progressReducer from "./progress-slice";
import participantsReducer from "./participants-slice";
import submitButtonReducer from "./submitButton-slice";

const store = configureStore({
  reducer: {
    progress: progressReducer,
    participants: participantsReducer,
    submitButton: submitButtonReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
