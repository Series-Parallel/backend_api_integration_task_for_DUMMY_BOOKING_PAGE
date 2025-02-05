import { configureStore } from "@reduxjs/toolkit";

import participantsReducer from "./participants-slice";
import submitButtonReducer from "./submitButton-slice";
import stepReducer from "./step-slice";

const store = configureStore({
  reducer: {
    participants: participantsReducer,
    submitButton: submitButtonReducer,
    step: stepReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
