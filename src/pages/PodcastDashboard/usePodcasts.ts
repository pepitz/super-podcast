import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  selectAllPodcasts,
  fetchPodcasts,
  getPodcastsError,
  getPodcastsStatus,
} from '../../store/features/podcasts/podcastsSlice';
import { Entry } from '../../types/podcast.types';

const usePodcasts = () => {
  const dispatch = useAppDispatch();
  const podcasts = useAppSelector(selectAllPodcasts);
  const podcastsError = useAppSelector(getPodcastsError);
  const podcastsStatus = useAppSelector(getPodcastsStatus);

  const [query, setQuery] = useState('');
  const [podcastsData, setPodcastsData] = useState<Entry[]>(podcasts);

  const handleChangeQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

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

  return {
    query,
    handleChangeQuery,
    podcastsData,
    podcastsStatus,
    podcastsError,
  };
};

export default usePodcasts;
