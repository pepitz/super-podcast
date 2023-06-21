import usePodcasts from '../../pages/PodcastDashboard/usePodcasts';
import './Episode.scss';

const Episode = () => {
  const { selectedEpisode } = usePodcasts();

  const linkRegex = /(https?:\/\/)?(www\.)?[^\s]+\.[^\s]+/g;
  const replacer = (matched: string) => {
    let withProtocol = matched;

    if (!withProtocol.startsWith('http')) {
      withProtocol = 'http://' + matched;
    }

    const newStr = `<a
      class="text-link"
      href="${withProtocol}"
    >
      ${matched}
    </a>`;

    return newStr;
  };

  const modifiedStr =
    selectedEpisode &&
    selectedEpisode?.description.replace(linkRegex, replacer);
  const target = document.getElementById('target');
  if (target !== undefined && target !== null && modifiedStr !== undefined) {
    target.innerHTML = modifiedStr;
  }

  return selectedEpisode ? (
    <div className="episode episode-card">
      <div className="episode__title">{selectedEpisode.title}</div>
      <div id="target" className="episode__description"></div>
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
