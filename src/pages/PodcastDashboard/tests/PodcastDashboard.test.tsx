import { screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { renderWithProviders } from 'test-utils';

import PodcastDashboard from 'pages/PodcastDashboard';

describe('PodcastDashboard component', () => {
  test('initial conditions', async () => {
    renderWithProviders(
      <MemoryRouter>
        <PodcastDashboard />
      </MemoryRouter>
    );

    // should render Search
    const inputNode = await screen.findByPlaceholderText(/^filter/i);
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
