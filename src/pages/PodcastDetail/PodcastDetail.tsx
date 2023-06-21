import PodcastLayout from 'components/PodcastLayout';
import EpisodesCounter from 'components/EpisodesCounter/EpisodesCounter';
import EpisodesList from 'components/EpisodesList/EpisodesList';

import usePodcasts from 'hooks/usePodcasts';

import './PodcastDetail.scss';

const PodcastDetail = () => {
  const { podcastEpisodes } = usePodcasts();

  return (
    <PodcastLayout>
      {podcastEpisodes?.length ? (
        <section className="episodes__container">
          <div className="episodes__counter">
            <EpisodesCounter data={podcastEpisodes} />
          </div>
          <div className="episodes__list">
            <EpisodesList data={podcastEpisodes} />
          </div>
        </section>
      ) : null}
    </PodcastLayout>
  );
};

export default PodcastDetail;
