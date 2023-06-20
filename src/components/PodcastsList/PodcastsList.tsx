import { Entry } from '../../types/podcast.types';

interface IPodcastsListProps {
  podcasts: Entry[];
  handlePodcastClick: (currPodcast: Entry) => void;
}

const PodcastsList = ({
  podcasts,
  handlePodcastClick,
}: IPodcastsListProps): JSX.Element => {
  return (
    <ul className="podcasts">
      {podcasts &&
        podcasts.map((podcast) => (
          <li
            className="item"
            key={podcast.id.attributes['im:id']}
            onClick={() => handlePodcastClick(podcast)}
          >
            <div className="imageWrapper">
              <img
                className="podcastItemImage"
                src={podcast['im:image'][2].label}
                alt={podcast.title.label}
              />
            </div>
            <h2 className="title">{podcast['im:name'].label}</h2>
            <div className="author">
              <span>
                <strong className="author-label">Author: </strong>
                {podcast['im:artist'].label}
              </span>
            </div>
          </li>
        ))}
    </ul>
  );
};

export default PodcastsList;
