import {
  RouterProvider,
  createBrowserRouter,
  Navigate,
} from 'react-router-dom';

import RootLayout from 'pages/Root/Root';

import PodcastDashboard from 'pages/PodcastDashboard';
import PodcastDetail from 'pages/PodcastDetail';
import PodcastEpisode from 'pages/PodcastEpisode';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <PodcastDashboard /> },
      {
        path: '/podcast',
        element: <PodcastDashboard />,
      },
      {
        path: '/podcast/:podcastId',
        element: <PodcastDetail />,
      },
      {
        path: '/podcast/:podcastId/episode/:episodeId',
        element: <PodcastEpisode />,
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/" />,
  },
]);

const App = () => {
  return <RouterProvider router={router}></RouterProvider>;
};

export default App;
