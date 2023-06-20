import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  setCurrentPodcast,
  selectAllPodcasts,
  fetchPodcasts,
  getPodcastsError,
  getPodcastsStatus,
} from '../../store/features/podcasts/podcastsSlice';

import { Entry, ICurrentPodcast } from '../../types/podcast.types';
import { convertToCurrentPodcast } from '../../utils/helpers';

const usePodcasts = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const podcasts = useAppSelector(selectAllPodcasts);
  const podcastsError = useAppSelector(getPodcastsError);
  const podcastsStatus = useAppSelector(getPodcastsStatus);

  const { podcastId } = useParams();
  const [query, setQuery] = useState('');
  const [podcastsData, setPodcastsData] = useState<Entry[]>(podcasts);
  const [podcastInfo, setPodcastInfo] = useState({} as ICurrentPodcast);

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

  return {
    query,
    handleChangeQuery,
    podcastsData,
    podcastsStatus,
    podcastsError,
    handleSelectCurrentPodcast,
    podcastInfo,
    handleBackToPodcasts,
  };
};

export default usePodcasts;
