import { ReactNode } from 'react';

import usePodcasts from 'pages/PodcastDashboard/usePodcasts';
import PodcastInfo from 'components/PodcastInfo';

import './PodcastLayout.scss';

const PodcastLayout = ({ children }: { children: ReactNode }) => {
  const { podcastInfo, handleBackToPodcasts } = usePodcasts();

  let content;
  const hasPodcastInfo = Object.keys(podcastInfo).length !== 0;
  if (hasPodcastInfo) {
    content = (
      <>
        <PodcastInfo data={podcastInfo} />
        {children}
      </>
    );
  } else {
    content = (
      <div className="error-block">
        <p className="error-block__message">No data available!</p>
        <div className="error-block__action">
          <button
            onClick={handleBackToPodcasts}
            className="error-block--button"
          >
            Go back...
          </button>
        </div>
      </div>
    );
  }

  return <section className="podcastLayout">{content}</section>;
};

export default PodcastLayout;
