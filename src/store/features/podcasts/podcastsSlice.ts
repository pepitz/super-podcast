import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../../app/store';
import { Entry, Feed } from './../../../types/podcast.types';
import axios from 'axios';

type TPodcastsSliceStatus = 'idle' | 'loading' | 'succeeded' | 'failed';

interface IPodcastsSliceState {
  podcasts: Entry[];
  status: TPodcastsSliceStatus;
  error: null | string;
}

const initialState: IPodcastsSliceState = {
  podcasts: [],
  status: 'idle',
  error: null,
};

export const fetchPodcasts = createAsyncThunk<Entry[]>(
  'podcasts/fetchPodcasts',
  async () => {
    const response = await axios.get(
      `https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json`
    );
    return response.data.feed.entry;
  }
);

export const podcastsSlice = createSlice({
  name: 'podcasts',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPodcasts.pending, (state, action) => {
      state.status = 'loading';
    });
    builder.addCase(fetchPodcasts.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.podcasts = action.payload;
      localStorage.setItem('_fetchDate', JSON.stringify(new Date().getTime()));
    });
    builder.addCase(fetchPodcasts.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error?.message || 'A problem has occured.';
    });
  },
});

// Selectors
export const selectAllPodcasts = (state: RootState) => state.podcasts.podcasts;
export const getPodcastsStatus = (state: RootState) => state.podcasts.status;
export const getPodcastsError = (state: RootState) => state.podcasts.error;

export default podcastsSlice.reducer;
