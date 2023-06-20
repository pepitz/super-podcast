import usePodcasts from '../PodcastDashboard/usePodcasts';

import PodcastLayout from '../../components/PodcastLayout';
import EpisodesCounter from '../../components/EpisodesCounter/EpisodesCounter';
import EpisodesListCard from '../../components/EpisodesListCard/EpisodesListCard';

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
            <EpisodesListCard item={podcastEpisodes} />
          </div>
        </div>
      ) : null}
    </PodcastLayout>
  );
};

export default PodcastDetail;
