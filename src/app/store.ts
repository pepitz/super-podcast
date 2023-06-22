import { configureStore } from '@reduxjs/toolkit';
import podcastReducer from 'store/features/podcasts/podcastsSlice';
import episodesReducer from 'store/features/episodes/episodesSlice';

export const store = configureStore({
  reducer: {
    podcasts: podcastReducer,
    episodes: episodesReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppStore = ReturnType<typeof configureStore>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
