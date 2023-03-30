import React from 'react';
import { describe, expect } from '@jest/globals';
import { render, screen, fireEvent } from '@testing-library/react';
import FormsPage from '../components/pages/FormsPage';
import readFileAsBase64 from '../helpers/readFileBase64';
import { CreateUserForm } from '../components/CreateUserForm';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import App from '../App';

describe('CreateUserForm', () => {
  it('renders CreateUserForm component', () => {
    render(<FormsPage />, { wrapper: BrowserRouter });
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
    expect(screen.getByText(/Name field is required/i)).toBeInTheDocument();
    expect(screen.getByText(/Date field is required/i)).toBeInTheDocument();
    expect(screen.getByText(/Country field is not selected/i)).toBeInTheDocument();
    expect(screen.getByText(/Check the consent!/i)).toBeInTheDocument();
    expect(screen.getByText(/The gender field is not selected/i)).toBeInTheDocument();
    expect(screen.getByText(/File is not uploaded/i)).toBeInTheDocument();
  });
  it('submits the form with user input', async () => {
    const { getByLabelText } = render(<CreateUserForm />, { wrapper: BrowserRouter });

    const nameInput = getByLabelText('Your Name:');
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    const dateInput = getByLabelText('Date of birth:');
    fireEvent.change(dateInput, { target: { value: '2023-03-18' } });
    const countryInput = getByLabelText('Country:');
    fireEvent.change(countryInput, { target: { value: 'Russia' } });
    const consentInput = getByLabelText('I consent to my personal data');
    fireEvent.change(consentInput, { target: { value: true } });
    const genderInput = getByLabelText('Male');
    fireEvent.change(genderInput, { target: { value: 'Male' } });

    const file = new File(['Hello, world!'], 'test.txt', { type: 'text/plain' });
    const base64 = await readFileAsBase64(file);
    expect(base64).toEqual('SGVsbG8sIHdvcmxkIQ==');
    fireEvent.change(getByLabelText('Choose a profile picture:'), { target: { files: [file] } });
    const user = userEvent.setup();

    await user.click(screen.getByText(/submit/i));
  });
});
