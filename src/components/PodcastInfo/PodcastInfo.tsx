import { ICurrentPodcast } from '../../types/podcast.types';
import './PodcastInfo.scss';

type TPodcastInfoProps = {
  data: ICurrentPodcast;
};

const PodcastInfo = ({ data }: TPodcastInfoProps) => {
  return (
    <section className="card">
      <article className="card__box">
        <article className="card__image-container">
          <img
            src={data.srcImg}
            height={data.heightImg}
            width={data.heightImg}
            alt={data.title}
          />
        </article>
        <article className="song">
          <div className="song__title">{data.title}</div>
          <span className="song__by">
            by <i>{data.author}</i>
          </span>
        </article>
        <article className="description">
          <span className="description__title">Description:</span>
          <p className="description__body">{data.description}</p>
        </article>
      </article>
    </section>
  );
};

export default PodcastInfo;
