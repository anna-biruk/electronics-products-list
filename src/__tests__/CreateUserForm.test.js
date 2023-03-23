import React from 'react';
import { describe, expect } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import { CreateUserForm } from '../components/CreateUserForm';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import App from '../App';

describe('CreateUserForm', () => {
    it('renders CreateUserForm component', () => {
        render(<CreateUserForm />, { wrapper: BrowserRouter });
    });


    it('full app rendering/navigating', async () => {
        render(<App />, { wrapper: BrowserRouter });
        const user = userEvent.setup();

        await user.click(screen.getByText(/forms/i));
        expect(screen.getByText(/Create user card/i)).toBeInTheDocument();
    });


    it('displays error messages', async () => {
        render(<CreateUserForm />, { wrapper: BrowserRouter });
        const user = userEvent.setup();

        await user.click(screen.getByText(/submit/i));
        expect(screen.getByText(/Name is required/i)).toBeInTheDocument();
        expect(screen.getByText(/Date is required/i)).toBeInTheDocument();
        expect(screen.getByText(/Country is not selected/i)).toBeInTheDocument();
        expect(screen.getByText(/Check the consent!/i)).toBeInTheDocument();
        expect(screen.getByText(/Gender is not selected/i)).toBeInTheDocument();
        expect(screen.getByText(/Upload the file/i)).toBeInTheDocument();
    });
});
