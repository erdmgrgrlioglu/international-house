/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from '@i18n';
import InformationPage from './Information';
import '@testing-library/jest-dom';
import { get, useDatabase } from '@database/database';

function sum(a, b) {
    return a + b;
  }
  
test('adds 1 + 2 to equal 3', () => {
expect(sum(1, 2)).toBe(3);
});

jest.mock('@database/database', () => ({
  get: jest.fn(),
  useDatabase: jest.fn((callback) => callback()),
}));


jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

const mockInfo = [
  { content: '<p>English content</p>' },
  { content: '<p>German content</p>' },
];

beforeEach(() => {
  get.mockResolvedValue(mockInfo);
});

test('renders information page with English content', async () => {
  i18n.changeLanguage('en');
  render(
    <MemoryRouter>
      <I18nextProvider i18n={i18n}>
        <InformationPage />
      </I18nextProvider>
    </MemoryRouter>
  );
  const contentElement = await screen.findByText(/English content/i);
  expect(contentElement).toBeInTheDocument();
});

test('renders information page with German content', async () => {
  i18n.changeLanguage('de');
  render(
    <MemoryRouter>
      <I18nextProvider i18n={i18n}>
        <InformationPage />
      </I18nextProvider>
    </MemoryRouter>
  );
  const contentElement = await screen.findByText(/German content/i);
  expect(contentElement).toBeInTheDocument();
});

test('renders home accessibility button', () => {
  render(
    <MemoryRouter>
      <I18nextProvider i18n={i18n}>
        <InformationPage />
      </I18nextProvider>
    </MemoryRouter>
  );
  const homeButton = screen.getByRole('button', { name: /home/i });
  expect(homeButton).toBeInTheDocument();
  
});

test('renders language accessibility button', () => {
  render(
    <MemoryRouter>
      <I18nextProvider i18n={i18n}>
        <InformationPage />
      </I18nextProvider>
    </MemoryRouter>
  );
  expect(screen.getByRole('button', { name: 'globe' })).toBeInTheDocument();
});