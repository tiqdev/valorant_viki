import { configureStore } from "@reduxjs/toolkit";
import agentsSlice from "../stores/agents/index";

const store = configureStore({
  reducer: {
    agent: agentsSlice,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
