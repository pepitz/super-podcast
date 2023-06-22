import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Provider } from 'react-redux';
import { store } from 'app/store';

import App from 'components/App/App';

describe('PodcastDashboard component', () => {
  test('initial conditions', async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
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
