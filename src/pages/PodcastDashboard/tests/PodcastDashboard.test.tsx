import { screen, prettyDOM, logRoles } from '@testing-library/react';

import { renderWithProviders } from 'test-utils';

import PodcastDashboard from 'pages/PodcastDashboard';

describe('PodcastDashboard component', () => {
  test('initial conditions', async () => {
    renderWithProviders(<PodcastDashboard />);

    // should render Search
    const inputNode = await screen.findByPlaceholderText('Filter results...');
    expect(inputNode).toBeInTheDocument();
    expect(inputNode).toHaveTextContent('');

    //should render PodcastsList
    const list = await screen.findByRole('list');
    expect(list).toBeInTheDocument();

    // should render items inside PodcastsList
    const items = await screen.findAllByRole('listitem');

    expect(items.length).toBeGreaterThan(0);
  });
});
