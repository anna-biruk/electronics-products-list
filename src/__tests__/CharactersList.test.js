import React from 'react';
import { describe, expect } from '@jest/globals';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import { CharactersList } from '../components/CharactersList';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { NotFoundPage } from '../pages/NotFoundPage';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

const server = setupServer(
  rest.get('https://rickandmortyapi.com/api/character', (req, res, ctx) => {
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
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('App', () => {
  it('renders App component', () => {
    render(<App />, { wrapper: BrowserRouter });
  });

  it('renders Not Found page component', () => {
    render(<NotFoundPage />);
    expect(screen.getByText(/404 Page not found/i)).toBeInTheDocument();
  });

  it('full app rendering/navigating', async () => {
    render(<App />, { wrapper: BrowserRouter });
    const user = userEvent.setup();

    await user.click(screen.getByText(/about/i));
    expect(screen.getByText(/about us/i)).toBeInTheDocument();
  });

  test('displays loading state correctly', async () => {
    render(<CharactersList />, { wrapper: BrowserRouter });

    const loadingText = screen.getByText('Loading...');
    expect(loadingText).toBeInTheDocument();

    const contentText = await screen.findByText('Mock Rick Sanchez');
    expect(contentText).toBeInTheDocument();
  });

  it('product card in the list', async () => {
    render(<CharactersList />, { wrapper: BrowserRouter });

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
