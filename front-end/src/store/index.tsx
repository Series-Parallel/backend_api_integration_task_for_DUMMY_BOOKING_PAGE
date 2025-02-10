import { configureStore } from "@reduxjs/toolkit";

import participantsReducer from "./participants-slice";
import submitButtonReducer from "./submitButton-slice";
import stepReducer from "./step-slice";
import formReducer from "./form-slice";
import bookingReducer from "./newFinal-slice";

const store = configureStore({
  reducer: {
    participants: participantsReducer,
    submitButton: submitButtonReducer,
    step: stepReducer,
    form: formReducer,
    booking: bookingReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
