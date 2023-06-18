import { Link } from 'react-router-dom';
import { Entry } from '../../types/podcast.types';

interface IPodcastsListProps {
  podcasts: Entry[];
}

const PodcastsList = ({ podcasts }: IPodcastsListProps): JSX.Element => {
  return (
    <ul className="podcasts">
      {podcasts &&
        podcasts.map((podcast) => (
          <li className="item" key={podcast.id.attributes['im:id']}>
            <Link to={`/podcast/${podcast.id.attributes['im:id']}`}>
              <div className="imageWrapper">
                <img
                  className="podcastItemImage"
                  src={podcast['im:image'][2].label}
                  alt=""
                />
              </div>
              <h2 className="title">{podcast['im:name'].label}</h2>
              <div className="author">
                <span>
                  <strong className="author-label">Author: </strong>
                  {podcast['im:artist'].label}
                </span>
              </div>
            </Link>
          </li>
        ))}
    </ul>
  );
};

export default PodcastsList;
