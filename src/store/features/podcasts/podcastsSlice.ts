import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { Entry, ICurrentPodcast } from 'types/podcast.types';
import axios from 'axios';
import {
  FETCHED_PODCASTS,
  FETCHED_PODCASTS_DATE,
  ITUNES_BASE_URL_PATH,
} from 'constants/constants';
import { convertTimeOrDataFromLocalStorage } from 'utils/convertStorageDate';
import { dayInterval } from 'utils/helpers';

type TPodcastsSliceStatus = 'idle' | 'loading' | 'succeeded' | 'failed';

interface IPodcastsSliceState {
  podcasts: Entry[];
  status: TPodcastsSliceStatus;
  error: null | string;
  currentPodcast: ICurrentPodcast;
}

const initialState: IPodcastsSliceState = {
  podcasts: [],
  status: 'idle',
  error: null,
  currentPodcast: {
    id: 0,
    title: '',
    heightImg: 40,
    srcImg: '',
    author: '',
    description: '',
  },
};

export const fetchPodcasts = createAsyncThunk<Entry[]>(
  'podcasts/fetchPodcasts',
  async () => {
    const lastFetchedDate = convertTimeOrDataFromLocalStorage<number>(
      FETCHED_PODCASTS_DATE
    );
    const lastFetchedPodcasts =
      convertTimeOrDataFromLocalStorage<Entry[]>(FETCHED_PODCASTS);

    if (
      dayInterval(new Date(lastFetchedDate)) === false &&
      lastFetchedPodcasts
    ) {
      return lastFetchedPodcasts;
    }

    const response = await axios.get(
      `${ITUNES_BASE_URL_PATH}us/rss/toppodcasts/limit=100/genre=1310/json`
    );

    return response.data.feed.entry;
  }
);

export const podcastsSlice = createSlice({
  name: 'podcasts',
  initialState: initialState,
  reducers: {
    setCurrentPodcast: (state, action: PayloadAction<ICurrentPodcast>) => {
      state.currentPodcast = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPodcasts.pending, (state, _) => {
      state.status = 'loading';
    });
    builder.addCase(fetchPodcasts.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.podcasts = action.payload;

      // save timestamp/data to localStorage for persistense
      localStorage.setItem(
        FETCHED_PODCASTS_DATE,
        new Date().getTime().toString()
      );
      localStorage.setItem(FETCHED_PODCASTS, JSON.stringify(action.payload));
    });
    builder.addCase(fetchPodcasts.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error?.message || 'A problem has occured.';
    });
  },
});

export const { setCurrentPodcast } = podcastsSlice.actions;

// Selectors
export const selectAllPodcasts = (state: RootState) => state.podcasts.podcasts;
export const getPodcastsStatus = (state: RootState) => state.podcasts.status;
export const getPodcastsError = (state: RootState) => state.podcasts.error;

export default podcastsSlice.reducer;
