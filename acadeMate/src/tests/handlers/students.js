import { http, HttpResponse } from 'msw';

const BASE = 'https://68e9f8fcf1eeb3f856e593b7.mockapi.io/api/v1';

export const studentHandlers = [
  http.get(`${BASE}/students`, () => {
    return HttpResponse.json([
      { id: '1', name: 'Alice', studentId: 'S001', major: 'CS', gpa: 3.8 },
      { id: '2', name: 'Bob', studentId: 'S002', major: 'Math', gpa: 3.2 },
    ]);
  }),

  http.post(`${BASE}/students`, async ({ request }) => {
    const body = await request.json();
    return HttpResponse.json({ id: Date.now().toString(), ...body }, { status: 201 });
  }),
];
