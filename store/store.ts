import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./categorySlice"; // Add your category slice
import counterReducer from "./counterSlice"; // Keep counter if needed
import userReducer from "./userSlice"; // Keep counter if needed

export const store = configureStore({
  reducer: {
    category: categoryReducer,
    counter: counterReducer,
    user: userReducer,
  },
});

// for typescript...
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
