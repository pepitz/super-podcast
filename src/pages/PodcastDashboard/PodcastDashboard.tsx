import "./PodcastDashboard.scss";
import PodcastsList from "@components/PodcastsList/PodcastsList";

import usePodcasts from "@hooks/usePodcasts";
import Search from "@components/Search";

const PodcastDashboard = (): JSX.Element => {
  const {
    query,
    handleChangeQuery,
    podcastsData,
    podcastsStatus,
    podcastsError,
    handleSelectCurrentPodcast,
  } = usePodcasts();

  let content = null;
  if (podcastsStatus === "loading") {
    content = <p>Loading podcasts...</p>;
  } else if (podcastsStatus === "succeeded") {
    content = (
      <>
        <Search
          searchText={query}
          counter={podcastsData.length}
          handleChangeQuery={handleChangeQuery}
        />
        <PodcastsList
          podcasts={podcastsData}
          handlePodcastClick={handleSelectCurrentPodcast}
        />
      </>
    );
  } else if (podcastsStatus === "failed") {
    content = `A ${podcastsError} occured.`;
  }

  return <section className="podcastDashboard">{content}</section>;
};

export default PodcastDashboard;
