import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import notesReducer from "./notesReducer";

const store = configureStore({
    reducer: notesReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export type State = ReturnType<typeof store.getState>;
export type Dispatch = typeof store.dispatch;
export default store;
