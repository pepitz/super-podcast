import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { fetchEpisodes } from 'store/features/episodes/episodesSlice';

import { useAppDispatch, useAppSelector } from 'app/hooks';
import {
  setCurrentPodcast,
  selectAllPodcasts,
  fetchPodcasts,
  getPodcastsError,
  getPodcastsStatus,
} from 'store/features/podcasts/podcastsSlice';

import { Entry, IEpisodeProps, ICurrentPodcast } from 'types/podcast.types';

import {
  convertToCurrentPodcast,
  dayInterval,
  getLastUpdatedDate,
} from 'utils/helpers';

const usePodcasts = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const podcasts = useAppSelector(selectAllPodcasts);
  const podcastsError = useAppSelector(getPodcastsError);
  const podcastsStatus = useAppSelector(getPodcastsStatus);

  const { podcastId, episodeId } = useParams();
  const [query, setQuery] = useState('');
  const [podcastsData, setPodcastsData] = useState<Entry[]>(podcasts);
  const [podcastInfo, setPodcastInfo] = useState({} as ICurrentPodcast);
  const [podcastEpisodes, setPodcastEpisodes] = useState<IEpisodeProps[]>();
  const [selectedEpisode, setSelectedEpisode] = useState<IEpisodeProps>();
  const [selectedEpisodesId, setSelectedEpisodesId] = useState<string>();

  const handleChangeQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSelectCurrentPodcast = (selectedPodcast: Entry): void => {
    const currentPodcastInfo = convertToCurrentPodcast(selectedPodcast);
    dispatch(setCurrentPodcast(currentPodcastInfo));
    navigate(`/podcast/${currentPodcastInfo.id}`);
  };

  const handleBackToPodcasts = (): void => {
    navigate('/');
  };

  const getSelectedPodcast = useCallback(() => {
    let selectedPodcast;

    if (podcastId && podcasts.length) {
      const podcastsIds = podcasts.map(
        (podcast) => +podcast.id.attributes['im:id']
      );
      const isPodcastIdMatched =
        Boolean(podcastId) && podcastsIds.includes(Number(podcastId));

      if (isPodcastIdMatched === false) {
        return;
      }

      selectedPodcast = podcasts.find(
        (podcast) => +podcast.id.attributes['im:id'] === +podcastId
      );
      if (selectedPodcast) {
        setPodcastInfo(convertToCurrentPodcast(selectedPodcast));
      }
    }
  }, [podcastId, podcasts]);

  const getEpisodesData = useCallback(async () => {
    if (podcastId) {
      const podcastEpisodesData = await fetchEpisodes(Number(podcastId));
      setPodcastEpisodes(podcastEpisodesData);
    }
  }, [podcastId]);

  const getStoredEpisodes = () => {
    const dataPodcastEpisodesArr = localStorage.getItem('_episodes');
    if (dataPodcastEpisodesArr?.length) {
      setPodcastEpisodes(JSON.parse(dataPodcastEpisodesArr));
    }
  };

  const getStoredEpisodesDate = useCallback(
    () => getLastUpdatedDate('_episodesTime'),
    []
  );

  const episodesStoredTime = getStoredEpisodesDate();

  const haveTimePassedEpisodes = episodesStoredTime
    ? dayInterval(new Date(episodesStoredTime))
    : false;
  useEffect(() => {
    if (
      !episodesStoredTime ||
      haveTimePassedEpisodes ||
      (podcastId && selectedEpisodesId && selectedEpisodesId !== podcastId)
    ) {
      getEpisodesData();
    } else {
      getStoredEpisodes();
    }
  }, [
    episodesStoredTime,
    getEpisodesData,
    haveTimePassedEpisodes,
    selectedEpisodesId,
    podcastId,
  ]);

  const getSelectedEpisode = useCallback(() => {
    if (episodeId && podcastEpisodes) {
      const episodeWithSelectedId = podcastEpisodes.find(
        (episode) => episode.id === episodeId
      );
      setSelectedEpisode(episodeWithSelectedId);
    }
  }, [episodeId, podcastEpisodes]);

  const getSelectedEpisodesId = useCallback(() => {
    if (podcastEpisodes) {
      setSelectedEpisodesId(podcastEpisodes[0].collectionId);
    }
  }, [podcastEpisodes]);

  useEffect(() => {
    dispatch(fetchPodcasts());
  }, [dispatch]);

  useEffect(() => {
    setPodcastsData(podcasts ?? []);
  }, [podcasts]);

  useEffect(() => {
    if (podcasts.length === 0) {
      return;
    }

    if (Boolean(query) === false) {
      setPodcastsData(podcasts);
    } else {
      const filteredResults = podcasts.filter(
        (podcast) =>
          podcast.title.label
            .toLocaleLowerCase()
            .includes(query.toLocaleLowerCase()) ||
          podcast['im:name'].label
            .toLocaleLowerCase()
            .includes(query.toLocaleLowerCase())
      );
      setPodcastsData(filteredResults);
    }
  }, [podcasts, query]);

  useEffect(() => {
    getSelectedPodcast();
  }, [getSelectedPodcast]);

  useEffect(() => {
    getSelectedEpisode();
  }, [getSelectedEpisode]);

  useEffect(() => {
    getSelectedEpisodesId();
  }, [getSelectedEpisodesId]);

  return {
    query,
    handleChangeQuery,
    podcastsData,
    podcastsStatus,
    podcastsError,
    handleSelectCurrentPodcast,
    podcastInfo,
    handleBackToPodcasts,
    podcastEpisodes,
    selectedEpisode,
  };
};

export default usePodcasts;
