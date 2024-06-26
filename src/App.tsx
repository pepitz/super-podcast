import {
  RouterProvider,
  createBrowserRouter,
  Navigate,
} from "react-router-dom";

import PodcastEpisode from "@pages/PodcastEpisode";
import RootLayout from "@pages/Root";
import PodcastDashboard from "@pages/PodcastDashboard";
import PodcastDetail from "@pages/PodcastDetail";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <PodcastDashboard /> },
      {
        path: "/podcast",
        element: <PodcastDashboard />,
      },
      {
        path: "/podcast/:podcastId",
        element: <PodcastDetail />,
      },
      {
        path: "/podcast/:podcastId/episode/:episodeId",
        element: <PodcastEpisode />,
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/" />,
  },
]);

const App = () => {
  return <RouterProvider router={router}></RouterProvider>;
};

export default App;
