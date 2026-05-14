// @vitest-environment jsdom
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { http, HttpResponse } from 'msw';

import { server } from '../tests/server';
import { renderWithProviders } from '../tests/utils';
import CoursesPage from './CoursesPage';

const BASE = 'https://68e9f8fcf1eeb3f856e593b7.mockapi.io/api/v1';

describe('CoursesPage', () => {
  it('shows loading state initially', () => {
    renderWithProviders(<CoursesPage />);
    expect(screen.getByText('Loading courses...')).toBeInTheDocument();
  });

  it('renders course rows after data loads', async () => {
    renderWithProviders(<CoursesPage />);

    await waitFor(() => {
      expect(screen.getByText('CS101')).toBeInTheDocument();
      expect(screen.getByText('Calculus')).toBeInTheDocument();
    });
  });

  it('shows error message when API returns 500', async () => {
    server.use(
      http.get(`${BASE}/courses`, () =>
        new HttpResponse(null, { status: 500 })
      )
    );

    renderWithProviders(<CoursesPage />);

    await waitFor(() => {
      expect(screen.getByText(/error/i)).toBeInTheDocument();
    });
  });

  it('clears the add form after a successful submission', async () => {
    const user = userEvent.setup();

    server.use(
      http.post(`${BASE}/courses`, () =>
        HttpResponse.json(
          { id: '99', code: 'CS999', title: 'Test Course', credits: 3, dept: 'CS' },
          { status: 201 }
        )
      )
    );

    renderWithProviders(<CoursesPage />);

    await waitFor(() => {
      expect(screen.getByText('CS101')).toBeInTheDocument();
    });

    await user.type(screen.getByPlaceholderText('Code'), 'CS999');
    await user.type(screen.getByPlaceholderText('Title'), 'Test Course');
    await user.type(screen.getByPlaceholderText('Credits'), '3');
    await user.type(screen.getByPlaceholderText('Dept'), 'CS');

    await user.click(screen.getByRole('button', { name: /\+ add/i }));

    await waitFor(() => {
      expect(screen.getByPlaceholderText('Code')).toHaveValue('');
    });
  });
});
