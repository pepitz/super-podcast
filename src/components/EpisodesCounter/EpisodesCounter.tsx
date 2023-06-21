import { IEpisodeProps } from 'types/podcast.types';
import './EpisodesCounter.scss';

const EpisodesCounter = (props: { data: IEpisodeProps[] }) => {
  const { data } = props;

  return (
    <div className="episodes-card">
      <strong>Episodes: </strong>
      <span>{data && data.length}</span>
    </div>
  );
};

export default EpisodesCounter;
