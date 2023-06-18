import './PodcastDashboard.scss';
import PodcastsList from '../../components/PodcastsList/PodcastsList';
import Search from '../../components/Search/Search';
import usePodcasts from './usePodcasts';

const PodcastDashboard = (): JSX.Element => {
  const {
    query,
    handleChangeQuery,
    podcastsData,
    podcastsStatus,
    podcastsError,
  } = usePodcasts();

  console.log(localStorage.length);

  let content = null;
  if (podcastsStatus === 'loading') {
    content = <p>Loading podcasts...</p>;
  } else if (podcastsStatus === 'succeeded') {
    content = (
      <>
        <Search
          searchText={query}
          counter={podcastsData.length}
          handleChangeQuery={handleChangeQuery}
        />
        <PodcastsList podcasts={podcastsData} />
      </>
    );
  } else if (podcastsStatus === 'failed') {
    content = `A ${podcastsError} occured.`;
  }

  return <section className="podcastDashboard">{content}</section>;
};

export default PodcastDashboard;
