import { http, HttpResponse } from 'msw';

const BASE = 'https://68e9f8fcf1eeb3f856e593b7.mockapi.io/api/v1';

export const courseHandlers = [
  http.get(`${BASE}/courses`, () => {
    return HttpResponse.json([
      { id: '1', code: 'CS101', title: 'Intro to CS', credits: 3, dept: 'CS' },
      { id: '2', code: 'MATH201', title: 'Calculus', credits: 4, dept: 'Math' },
    ]);
  }),

  http.post(`${BASE}/courses`, async ({ request }) => {
    const body = await request.json();
    return HttpResponse.json({ id: Date.now().toString(), ...body }, { status: 201 });
  }),
];
