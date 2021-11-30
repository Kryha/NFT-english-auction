import { combinedReducers } from "./slices";

export type CompleteStore = ReturnType<typeof combinedReducers>;
