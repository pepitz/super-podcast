import { createSlice } from '@reduxjs/toolkit';
import { IEpisodeInitial, IEpisodeProps } from '../../../types/podcast.types';
import axios from 'axios';

export interface EpisodesState {
  selectedEpisode: IEpisodeProps;
}

const initialState: EpisodesState = {
  selectedEpisode: {
    id: '',
    collectionId: '',
    title: '',
    url: '',
    description: '',
    releaseDate: '',
    durationTime: 0,
  },
};

export const fetchEpisodes = async (id: number) => {
  try {
    const response = await axios.get(
      `https://itunes.apple.com/lookup?id=${id}&media=podcast&entity=podcastEpisode&limit=20/json`
    );

    const episodes = response.data.results
      .slice(1)
      .map((episode: IEpisodeInitial) => {
        const episodeId = episode.trackId.toString();
        const collectionId = episode.collectionId.toString();
        const episodeTitle = episode.trackName;
        const episodeDescription = episode.description;
        const episodeUrl = episode.episodeUrl;
        const episodeReleaseDate = episode.releaseDate;
        const episodeTimeMillis = episode.trackTimeMillis;

        return {
          id: episodeId,
          collectionId: collectionId,
          title: episodeTitle,
          url: episodeUrl,
          description: episodeDescription,
          releaseDate: episodeReleaseDate,
          durationTime: episodeTimeMillis,
        };
      });

    localStorage.setItem(
      '_episodesTime',
      JSON.stringify(new Date().getTime().toString())
    );

    localStorage.setItem('_episodes', JSON.stringify(episodes));

    return episodes;
  } catch (error) {
    console.error(error);
  }
};

export const episodesSlice = createSlice({
  name: 'episodes',
  initialState: initialState,
  reducers: {
    setSelectedEpisode: (state, action) => {
      const {
        id,
        collectionId,
        title,
        url,
        description,
        releaseDate,
        durationTime,
      } = action.payload;
      state.selectedEpisode.id = id;
      state.selectedEpisode.collectionId = collectionId;
      state.selectedEpisode.title = title;
      state.selectedEpisode.url = url;
      state.selectedEpisode.description = description;
      state.selectedEpisode.releaseDate = releaseDate;
      state.selectedEpisode.durationTime = durationTime;
    },
  },
});

export const { setSelectedEpisode } = episodesSlice.actions;

export default episodesSlice.reducer;
