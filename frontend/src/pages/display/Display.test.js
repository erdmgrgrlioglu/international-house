/**
 * @jest-environment jsdom
 */

import { render, screen, fireEvent } from '@testing-library/react';
import { useDatabase, get } from '../../database/database';
import DisplayPage from './Display';
import '@testing-library/jest-dom';

jest.mock('../../database/database', () => ({
  get: jest.fn(),
  useDatabase: jest.fn((callback) => callback()),
}));

const mockVisitors = [
  { id: '1', beingCalled: false, consultation: { name: 'Consultation 1' } },
  { id: '2', beingCalled: true, consultation: { name: 'Consultation 2' } },
];

const mockConsultations = [
  { name: 'Consultation 1' },
  { name: 'Consultation 2' },
];

beforeEach(() => {
  get.mockImplementation((key) => {
    if (key === 'visitors') {
      return Promise.resolve(mockVisitors);
    }
    if (key === 'consultations') {
      return Promise.resolve(mockConsultations);
    }
    return Promise.resolve([]);
  });
});

test('toggles sound on and off', () => {
  render(<DisplayPage />);
  const soundToggleButton = screen.getByText(/Sound: OFF/i);
  expect(soundToggleButton).toBeInTheDocument();
  fireEvent.click(soundToggleButton);
  expect(screen.getByText(/Sound: ON/i)).toBeInTheDocument();
  fireEvent.click(screen.getByText(/Sound: ON/i));
  expect(screen.getByText(/Sound: OFF/i)).toBeInTheDocument();
});
