import usePodcasts from '../../pages/PodcastDashboard/usePodcasts';
import './Episode.scss';

const Episode = () => {
  const { selectedEpisode } = usePodcasts();

  return selectedEpisode ? (
    <div className="episode episode-card">
      <div className="episode__title">{selectedEpisode.title}</div>
      <div className="episode__description">{selectedEpisode.description}</div>
      <div className="audioControl">
        <audio
          id={selectedEpisode.id.toString()}
          controlsList="nodownload"
          controls
        >
          <source src={selectedEpisode.url} type="audio/mpeg" />
        </audio>
      </div>
    </div>
  ) : null;
};

export default Episode;
