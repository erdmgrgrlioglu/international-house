/**
 * @jest-environment jsdom
 */

import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../i18n';
import BookingPage, { getFormatedHourAndMinutes } from './Booking';
import '@testing-library/jest-dom';
import { get, push } from '../../database/database';

jest.mock('../../database/database', () => ({
  get: jest.fn(),
  push: jest.fn(),
  useDatabase: jest.fn((callback) => callback()),
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

const mockEvents = [
  {
    id: '1',
    repeat: 'no',
    startDate: new Date().toISOString(),
    endDate: new Date().toISOString(),
    consultation: { 
      name: 'Consultation 1', 
      description: 'Description 1', 
      shortVersion: 'CONS-001', 
      dailyVisitorCount: 10
    },
  },
  {
    id: '2',
    repeat: 'daily',
    startDate: new Date().toISOString(),
    endDate: new Date().toISOString(),
    consultation: { 
      name: 'Consultation 2', 
      description: 'Description 2', 
      shortVersion: 'CONS-002', 
      dailyVisitorCount: 5
    },
  },
];

beforeEach(() => {
  get.mockResolvedValue(mockEvents);
  push.mockResolvedValue({ id: 'CONS-001' });
  push.mockResolvedValue({ id: 'CONS-002' });
  const modalRoot = document.createElement("div");
  modalRoot.setAttribute("id", "modal");
  document.body.appendChild(modalRoot);
});
afterEach(() => {
  document.getElementById("modal")?.remove();
});

test('renders booking page with events', async () => {
  render(
    <MemoryRouter>
      <I18nextProvider i18n={i18n}>
        <BookingPage />
      </I18nextProvider>
    </MemoryRouter>
  );
  const titleElement = await screen.findByText(/Available Meetings Today/i);
  expect(titleElement).toBeInTheDocument();
  const eventElements = await screen.findAllByText(/Consultation/i);
  expect(eventElements.length).toBe(2);
});

test('renders home accessibility button', () => {
  render(
    <MemoryRouter>
      <I18nextProvider i18n={i18n}>
        <BookingPage />
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
        <BookingPage />
      </I18nextProvider>
    </MemoryRouter>
  );
  const languageButton = screen.getByRole('button', { name: /globe/i });
  expect(languageButton).toBeInTheDocument();
});

test('opens info modal on info button click', async () => {
  render(
    <MemoryRouter>
      <I18nextProvider i18n={i18n}>
        <BookingPage />
      </I18nextProvider>
    </MemoryRouter>
  );
  await screen.findByText(/Consultation 1/i);
  const infoButtons = screen.getAllByLabelText("info");
  expect(infoButtons[0]).toBeInTheDocument();
  fireEvent.click(infoButtons[0]);
  const description = await screen.findByText(/Description 1/i);
  expect(description).toBeInTheDocument();
});

test('opens confirmation modal on book button click', async () => {
  render(
    <MemoryRouter>
      <I18nextProvider i18n={i18n}>
        <BookingPage />
      </I18nextProvider>
    </MemoryRouter>
  );

  const currentTime = getFormatedHourAndMinutes(mockEvents[0].startDate, mockEvents[0].endDate);
  const bookButtons = await screen.findAllByText(currentTime);
  
  expect(bookButtons[0]).toBeInTheDocument();
  fireEvent.click(bookButtons[0]);
  
  const confirmModal = await screen.findByText(/Confirm Booking/i);
  expect(confirmModal).toBeInTheDocument();
});

test('adds visitor on confirmation modal yes button click', async () => {

  render(
    <MemoryRouter>
      <I18nextProvider i18n={i18n}>
        <BookingPage />
      </I18nextProvider>
    </MemoryRouter>
  );
  const currentTime = getFormatedHourAndMinutes(mockEvents[0].startDate, mockEvents[0].endDate);
  const bookButtons = await screen.findAllByText(currentTime);
  
  expect(bookButtons[0]).toBeInTheDocument();
  fireEvent.click(bookButtons[0]);

  const yesButton = await screen.findByText(/Yes/i);
  expect(yesButton).toBeInTheDocument();
  fireEvent.click(yesButton);

  expect(push).toHaveBeenCalled();
});