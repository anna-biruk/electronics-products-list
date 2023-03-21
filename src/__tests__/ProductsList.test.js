import React from 'react';
import { describe, expect } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import App from '../App';
import { ProductsList } from '../components/ProductsList';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { NotFoundPage } from '../components/NotFoundPage';

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

  it('product card in the list', async () => {
    render(<ProductsList />, { wrapper: BrowserRouter });
    expect(screen.getByText(/iphone 9/i)).toBeInTheDocument();
    expect(screen.getByText(/iphone x/i)).toBeInTheDocument();
  });
});
