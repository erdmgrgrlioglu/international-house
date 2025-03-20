/**
 * @jest-environment jsdom
 */

import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from "@testing-library/user-event";
import { Button } from '../../components';
import { useNavigate } from "react-router-dom";
import { Simulate } from "react-dom/test-utils";
import { I18nextProvider } from 'react-i18next';
import i18n from '../../i18n';
import WelcomePage from './Welcome';
import '@testing-library/jest-dom';


jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

function sum(a, b) {
  return a + b;
}

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});

test('renders welcome title', () => {
  render(
    <MemoryRouter>
      <I18nextProvider i18n={i18n}>
        <WelcomePage />
      </I18nextProvider>
    </MemoryRouter>
  );
  const titleElement = screen.getByText(/Welcome to the International House TU Darmstadt/i);
  expect(titleElement).toBeInTheDocument();
});

test('navigates to booking page on book button click', () => {
    const navigateMock = jest.fn();
    const useNavigateMock = require('react-router-dom').useNavigate;
    useNavigateMock.mockReturnValue(navigateMock);
    render(
        <MemoryRouter>
            <I18nextProvider i18n={i18n}>
                <WelcomePage />
            </I18nextProvider>
        </MemoryRouter>
    );
    const bookButton = screen.getByText(/Book a consultation/i);
    expect(bookButton).toBeInTheDocument();
    fireEvent.click(bookButton);
    expect(navigateMock).toHaveBeenCalledWith('/booking');
});

test('navigates to info page on info button click', () => {
    const navigateMock = jest.fn();
    const useNavigateMock = require('react-router-dom').useNavigate;
    useNavigateMock.mockReturnValue(navigateMock);
    render(
    <MemoryRouter>
        <I18nextProvider i18n={i18n}>
        <WelcomePage />
        </I18nextProvider>
    </MemoryRouter>
    );
    const infoButton = screen.getByText(/Information/i);
    fireEvent.click(infoButton);
    expect(navigateMock).toHaveBeenCalledWith('/info');
});

test('renders accessibility button', () => {
  render(
    <MemoryRouter>
      <I18nextProvider i18n={i18n}>
        <WelcomePage />
      </I18nextProvider>
    </MemoryRouter>
  );
  expect(screen.getByRole('button', { name: 'globe' })).toBeInTheDocument();
});