import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  fetchPodcasts,
  selectAllPodcasts,
  getPodcastsError,
  getPodcastsStatus,
} from '../../store/features/podcasts/podcastsSlice';

import './PodcastDashboard.scss';
import PodcastsList from '../../components/PodcastsList/PodcastsList';

const PodcastDashboard = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const podcasts = useAppSelector(selectAllPodcasts);
  const podcastsError = useAppSelector(getPodcastsError);
  const podcastsStatus = useAppSelector(getPodcastsStatus);

  useEffect(() => {
    dispatch(fetchPodcasts());
  }, [dispatch]);

  let content: JSX.Element | string | null = null;
  if (podcastsStatus === 'loading') {
    content = <p>Loading podcasts...</p>;
  } else if (podcastsStatus === 'succeeded') {
    content = <PodcastsList podcasts={podcasts} />;
  } else if (podcastsStatus === 'failed') {
    content = `A ${podcastsError} occured.`;
  }

  return (
    <section className="podcastDashboard">
      <div>Filter podcasts</div>
      {content}
    </section>
  );
};

export default PodcastDashboard;
