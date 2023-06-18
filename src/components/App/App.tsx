import {
  RouterProvider,
  createBrowserRouter,
  Navigate,
} from 'react-router-dom';

import RootLayout from '../../pages/Root/Root';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      // { index: true, element: <PodcastDashboard />, loader: loadPodcasts },
      // {
      //   path: "/podcast",
      //   element: <PodcastLayout />,
      //   id: "podcastRoot",
      //   children: [
      //     {
      //       path: ":podcastId",
      //       element: <PodcastDetail />,
      //     },
      //     {
      //       path: ":podcastId/episode/:episodeId",
      //       element: <PodcastEpisode />,
      //     },
      //   ],
      //   loader: loadDetail,
      // },
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
