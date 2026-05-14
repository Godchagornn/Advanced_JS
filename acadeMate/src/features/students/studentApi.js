import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE = 'https://68e9f8fcf1eeb3f856e593b7.mockapi.io/api/v1/';

export const studentApi = createApi({
  reducerPath: 'studentsApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE }),
  tagTypes: ['Student'],
  endpoints: (builder) => ({
    getStudents: builder.query({
      query: () => 'students',
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Student', id })),
              { type: 'Student', id: 'LIST' },
            ]
          : [{ type: 'Student', id: 'LIST' }],
    }),

    getStudentById: builder.query({
      query: (id) => `students/${id}`,
      providesTags: (result, error, id) => [{ type: 'Student', id }],
    }),

    addStudent: builder.mutation({
      query: (student) => ({
        url: 'students',
        method: 'POST',
        body: student,
      }),
      invalidatesTags: [{ type: 'Student', id: 'LIST' }],
    }),

    updateStudent: builder.mutation({
      query: (student) => ({
        url: `students/${student.id}`,
        method: 'PUT',
        body: student,
      }),
      invalidatesTags: (result, error, student) => [
        { type: 'Student', id: student.id },
      ],
      async onQueryStarted(student, { dispatch, queryFulfilled }) {
        const patchList = dispatch(
          studentApi.util.updateQueryData('getStudents', undefined, (draft) => {
            const existing = draft.find((s) => s.id === student.id);
            if (existing) Object.assign(existing, student);
          })
        );
        const patchDetail = dispatch(
          studentApi.util.updateQueryData('getStudentById', student.id, (draft) => {
            Object.assign(draft, student);
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchList.undo();
          patchDetail.undo();
        }
      },
    }),

    deleteStudent: builder.mutation({
      query: (id) => ({
        url: `students/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [
        { type: 'Student', id },
        { type: 'Student', id: 'LIST' },
      ],
    }),
  }),
});

export const {
  useGetStudentsQuery,
  useGetStudentByIdQuery,
  useAddStudentMutation,
  useUpdateStudentMutation,
  useDeleteStudentMutation,
} = studentApi;
