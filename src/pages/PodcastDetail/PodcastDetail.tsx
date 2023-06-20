import {
  json,
  Link,
  LoaderFunctionArgs,
  useRouteLoaderData,
} from 'react-router-dom';

import PodcastLayout from '../../components/PodcastLayout';

import { IPodcastResult } from '../../types/podcast.types';
import './PodcastDetail.scss';

const PodcastDetail = () => {
  // const data = useRouteLoaderData('podcastRoot') as IPodcastResult;
  // const episodes = data.results.filter(
  //   (result) => result.kind === 'podcast-episode'
  // );

  const msToHMS = (ms: number) => {
    if (!ms) {
      return '';
    }
    // 1- Convert to seconds:
    let seconds = ms / 1000;
    // 2- Extract hours:
    const hours = parseInt((seconds / 3600).toString()); // 3,600 seconds in 1 hour
    seconds = seconds % 3600; // seconds remaining after extracting hours
    // 3- Extract minutes:
    const minutes = parseInt((seconds / 60).toString()); // 60 seconds in 1 minute
    return `${hours}:${minutes}`;
  };

  return (
    <PodcastLayout>
      {/* <ul className="episodesList">
        <div className="episodesListHeader">
          <div className="title">Title</div>
          <div className="date">Date</div>
          <div className="duration">Duration</div>
        </div>
        {episodes &&
          episodes.map((episode) => {
            const date = new Date(
              episode.releaseDate.toString()
            ).toLocaleDateString('en-GB');
            const duration = msToHMS(episode.trackTimeMillis);
            return (
              <li key={episode.trackId} className="itemRow">
                <Link
                  relative="route"
                  className="title"
                  to={`episode/${episode.trackId}`}
                >
                  <div>{episode.trackName}</div>
                </Link>
                <div className="date">{date}</div>
                <div className="duration">{duration}</div>
              </li>
            );
          })}
      </ul> */}
      <div className="episodes">Episodes list placeholder</div>
    </PodcastLayout>
  );
};

export default PodcastDetail;

export const loader = async ({
  params,
}: LoaderFunctionArgs): Promise<IPodcastResult> => {
  const id = params.podcastId;
  // https://itunes.apple.com/us/lookup?id=${id}
  // https://itunes.apple.com/lookup?id=1251196416&country=US&media=podcast&entity=podcastEpisode&limit=100
  const response = await fetch(
    `https://itunes.apple.com/lookup?id=${id}&entity=podcastEpisode`
  );
  if (!response.ok) {
    throw json(
      { message: 'Could not fetch details for selected podcast.' },
      {
        status: 500,
      }
    );
  } else {
    return response.json();
  }
};
