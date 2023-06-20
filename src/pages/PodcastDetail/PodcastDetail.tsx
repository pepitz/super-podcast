import usePodcasts from '../PodcastDashboard/usePodcasts';

import PodcastLayout from '../../components/PodcastLayout';
import EpisodesCounter from '../../components/EpisodesCounter/EpisodesCounter';
import EpisodesList from '../../components/EpisodesList/EpisodesList';

import './PodcastDetail.scss';

const PodcastDetail = () => {
  const { podcastEpisodes } = usePodcasts();

  return (
    <PodcastLayout>
      {podcastEpisodes?.length ? (
        <div className="episodes__container">
          <div className="episodes__counter">
            <EpisodesCounter data={podcastEpisodes} />
          </div>
          <div className="episodes__list">
            <EpisodesList data={podcastEpisodes} />
          </div>
        </div>
      ) : null}
    </PodcastLayout>
  );
};

export default PodcastDetail;
