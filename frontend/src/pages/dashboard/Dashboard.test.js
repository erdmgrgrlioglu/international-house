/**
 * @jest-environment jsdom
 */

import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../i18n';
import DashboardPage from './Dashboard';
import '@testing-library/jest-dom';
import { get } from '../../database/database';
import Cookies from 'js-cookie';

jest.mock('../../database/database', () => ({
  get: jest.fn(),
  useDatabase: jest.fn((callback) => callback()),
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

jest.mock('js-cookie', () => ({
  get: jest.fn(),
  set: jest.fn(),
  remove: jest.fn(),
}));

const mockVisitors = [
  { id: '1', beingCalled: false, consultation: { name: 'Consultation 1' } },
  { id: '2', beingCalled: true, consultation: { name: 'Consultation 2' } },
];

const mockUser = { name: 'Admin User', role: 'ADMIN' };

beforeEach(() => {
  get.mockImplementation((key) => {
    if (key === 'visitors') {
      return Promise.resolve(mockVisitors);
    }
    if (key === 'auth/profile') {
      return Promise.resolve(mockUser);
    }
    return Promise.resolve([]);
  });
});

test('renders dashboard page with user info and tabs', async () => {
  render(
    <MemoryRouter>
      <I18nextProvider i18n={i18n}>
        <DashboardPage />
      </I18nextProvider>
    </MemoryRouter>
  );
  const loginButton = await screen.findByText(/Next/i);
  fireEvent.click(loginButton);
  const userInfo = await screen.findByText(/Signed In As: Admin User/i);
  expect(userInfo).toBeInTheDocument();
  const calendarTab = screen.getByText(/Calendar/i);
  expect(calendarTab).toBeInTheDocument();
  const visitorsTab = screen.getByText(/Visitors/i);
  expect(visitorsTab).toBeInTheDocument();
  const manageUsersTab = screen.getByText(/Manage Users/i);
  expect(manageUsersTab).toBeInTheDocument();
  const manageConsultationHoursTab = screen.getByText(/Manage Consultation Hours/i);
  expect(manageConsultationHoursTab).toBeInTheDocument();
  const manageInfoPageTab = screen.getByText(/Manage Info Page/i);
  expect(manageInfoPageTab).toBeInTheDocument();
});