import { configureStore } from "@reduxjs/toolkit";
import { combinedReducers } from "./slices/reducers";

export const store = configureStore({
  devTools: process.env.NODE_ENV === "development",
  reducer: combinedReducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: [],
        // Ignore these field paths in all actions
        ignoredActionPaths: ["createToken.formData.file.file"],
        // Ignore these paths in the state
        ignoredPaths: ["wallet.nft.tokens", "createToken.formData.file", "createToken.preview.file"],
      },
    }),
});
