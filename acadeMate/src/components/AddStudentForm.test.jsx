// @vitest-environment jsdom
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { http, HttpResponse } from 'msw';

import { server } from '../tests/server';
import { renderWithProviders } from '../tests/utils';
import AddStudentForm from './AddStudentForm';

const BASE = 'https://68e9f8fcf1eeb3f856e593b7.mockapi.io/api/v1';

describe('AddStudentForm', () => {
  it('submits a new student and clears the form', async () => {
    const user = userEvent.setup();

    server.use(
      http.post(`${BASE}/students`, () =>
        HttpResponse.json(
          { id: '99', name: 'Charlie', studentId: 'S099', major: 'Testing', gpa: 4.0 },
          { status: 201 }
        )
      )
    );

    renderWithProviders(<AddStudentForm />);

    await user.type(screen.getByPlaceholderText('Full Name'), 'Charlie');
    await user.type(screen.getByPlaceholderText('Student ID'), 'S099');
    await user.type(screen.getByPlaceholderText('Major'), 'Testing');
    await user.type(screen.getByPlaceholderText('GPA'), '4.0');

    await user.click(screen.getByRole('button', { name: /add student/i }));

    await waitFor(() => {
      expect(screen.getByPlaceholderText('Full Name')).toHaveValue('');
    });
  });
});
