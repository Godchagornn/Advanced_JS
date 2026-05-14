// @vitest-environment jsdom
import { screen, waitFor } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { http, HttpResponse } from 'msw';

import { server } from '../tests/server';
import { renderWithProviders } from '../tests/utils';
import StudentTable from './StudentTable';

const BASE = 'https://68e9f8fcf1eeb3f856e593b7.mockapi.io/api/v1';

describe('StudentTable', () => {
  it('shows loading state initially', () => {
    renderWithProviders(<StudentTable />);
    expect(screen.getByText('Loading students...')).toBeInTheDocument();
  });

  it('renders student rows after data loads', async () => {
    renderWithProviders(<StudentTable />);

    await waitFor(() => {
      expect(screen.getByText('Alice')).toBeInTheDocument();
      expect(screen.getByText('Bob')).toBeInTheDocument();
    });
  });

  it('shows error message when API returns 500', async () => {
    server.use(
      http.get(`${BASE}/students`, () =>
        new HttpResponse(null, { status: 500 })
      )
    );

    renderWithProviders(<StudentTable />);

    await waitFor(() => {
      expect(screen.getByText(/error/i)).toBeInTheDocument();
    });
  });
});
