import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { setSelectedEpisode } from 'store/features/episodes/episodesSlice';
import { dateFormat, timeFormat } from 'utils/helpers';
import { IEpisodeProps } from 'types/podcast.types';

import './EpisodesList.scss';

const EpisodesList = (props: { data: IEpisodeProps[] }) => {
  const { data } = props;

  const navigate = useNavigate();
  let location = useLocation();
  const dispatch = useDispatch();

  const handleClick = (episode: IEpisodeProps) => {
    dispatch(setSelectedEpisode(episode));
    navigate(`${location.pathname}/episode/${episode.id}`);
  };

  return (
    <div className="episodes-card">
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Date</th>
            <th>Duration</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((episode) => (
              <tr key={`episode-item-${episode.id}`}>
                <td
                  className="episode-item__link"
                  onClick={() => handleClick(episode)}
                >
                  {episode.title}
                </td>
                <td>
                  {episode.releaseDate ? dateFormat(episode.releaseDate) : '-'}
                </td>
                <td>
                  {episode.durationTime
                    ? timeFormat(episode.durationTime)
                    : '-'}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default EpisodesList;
