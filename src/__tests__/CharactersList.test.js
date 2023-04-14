import React from 'react';
import { describe, expect } from '@jest/globals';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import App from '../App';
import { CharactersList } from '../components/CharactersList';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { NotFoundPage } from '../pages/NotFoundPage';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { Provider } from 'react-redux';
import { store } from '../app/store';

const server = setupServer(
  rest.get('https://rickandmortyapi.com/api/character', (req, res, ctx) => {
    const queryParams = req.url.searchParams;
    const page = queryParams.get('page');
    if (page === '1') {
      return res(
        ctx.status(200),
        ctx.json({
          results: [
            {
              id: 1,
              name: 'Mock Rick Sanchez',
              status: 'Alive',
              species: 'Human',
            },
            {
              id: 2,
              name: 'Mock Morty Smith',
              status: 'Alive',
              species: 'Human',
            },
            {
              id: 3,
              name: 'Mock Evil Jerry Clone',
              status: 'Dead',
              species: 'Human',
            },
          ],
        })
      );
    } else {
      return res(ctx.status(500));
    }
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('App', () => {
  it('renders App component', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>,
      { wrapper: BrowserRouter }
    );
  });

  it('renders Not Found page component', () => {
    render(
      <Provider store={store}>
        <NotFoundPage />
      </Provider>,
      { wrapper: BrowserRouter }
    );
    expect(screen.getByText(/404 Page not found/i)).toBeInTheDocument();
  });

  it('full app rendering/navigating', async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>,
      { wrapper: BrowserRouter }
    );
    const user = userEvent.setup();

    await user.click(screen.getByText(/about/i));
    expect(screen.getByText(/about us/i)).toBeInTheDocument();
  });

  it('displays loading state correctly', async () => {
    render(
      <Provider store={store}>
        <CharactersList />
      </Provider>,
      { wrapper: BrowserRouter }
    );

    const loadingText = screen.getByText('Loading...');
    expect(loadingText).toBeInTheDocument();

    const contentText = await screen.findByText('Mock Rick Sanchez');
    expect(contentText).toBeInTheDocument();
  });

  it('should display a search input', () => {
    render(
      <Provider store={store}>
        <CharactersList />
      </Provider>,
      { wrapper: BrowserRouter }
    );
    expect(screen.getByPlaceholderText('Search')).toBeInTheDocument();
  });

  it('should update the search query when the search input changes', () => {
    render(
      <Provider store={store}>
        <CharactersList />
      </Provider>,
      { wrapper: BrowserRouter }
    );
    const input = screen.getByPlaceholderText('Search');
    fireEvent.change(input, { target: { value: 'Rick' } });
    expect(input.value).toBe('Rick');
  });
  it('should submit the search query when the search form is submitted', () => {
    const fetchCharactersMock = jest.fn();
    store.dispatch = fetchCharactersMock;
    render(
      <Provider store={store}>
        <CharactersList />
      </Provider>,
      { wrapper: BrowserRouter }
    );
    const input = screen.getByPlaceholderText('Search');
    const form = screen.getByTestId('search-form');
    fireEvent.change(input, { target: { value: 'Morty' } });
    fireEvent.submit(form);
  });
  it('product card in the list', async () => {
    render(
      <Provider store={store}>
        <CharactersList />
      </Provider>,
      { wrapper: BrowserRouter }
    );

    const loadingText = await screen.getByText('Loading...');
    await expect(loadingText).toBeInTheDocument();

    await waitFor(
      () => {
        expect(screen.getByText(/Mock Morty Smith/i)).toBeInTheDocument();
        expect(screen.getByText(/Mock Rick Sanchez/i)).toBeInTheDocument();
        expect(screen.getByText(/Mock Evil Jerry Clone/i)).toBeInTheDocument();
      },
      {
        timeout: 1000,
      }
    );
  });
});
