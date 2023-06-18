import { configureStore } from '@reduxjs/toolkit';
import podcastReducer from '../store/features/podcasts/podcastsSlice';

export const store = configureStore({
  reducer: {
    podcasts: podcastReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
