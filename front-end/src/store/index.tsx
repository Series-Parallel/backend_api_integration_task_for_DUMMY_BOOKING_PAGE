import { configureStore } from "@reduxjs/toolkit";

import submitButtonReducer from "./submitButton-slice";
import stepReducer from "./step-slice";
import bookingReducer from "./newFinal-slice";

const store = configureStore({
  reducer: {
    submitButton: submitButtonReducer,
    step: stepReducer,

    booking: bookingReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
