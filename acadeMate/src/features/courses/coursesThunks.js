import { createAsyncThunk } from '@reduxjs/toolkit';

const BASE_URL =
  'https://68e9f8fcf1eeb3f856e593b7.mockapi.io/api/v1';

export const fetchCourses = createAsyncThunk(
  'courses/fetchAll',

  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(
        `${BASE_URL}/courses`
      );

      if (!res.ok) {
        return rejectWithValue(
          'Failed to fetch courses'
        );
      }

      return await res.json();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const addCourseAsync = createAsyncThunk(
  'courses/addOne',

  async (courseData, { rejectWithValue }) => {
    try {
      const res = await fetch(
        `${BASE_URL}/courses`,
        {
          method: 'POST',

          headers: {
            'Content-Type':
              'application/json',
          },

          body: JSON.stringify(courseData),
        }
      );

      if (!res.ok) {
        return rejectWithValue(
          'Failed to add course'
        );
      }

      return await res.json();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const updateCourseAsync =
  createAsyncThunk(
    'courses/updateOne',

    async (
      { id, ...changes },
      { rejectWithValue }
    ) => {
      try {
        const res = await fetch(
          `${BASE_URL}/courses/${id}`,
          {
            method: 'PUT',

            headers: {
              'Content-Type':
                'application/json',
            },

            body: JSON.stringify(changes),
          }
        );

        if (!res.ok) {
          return rejectWithValue(
            'Failed to update course'
          );
        }

        return await res.json();
      } catch (err) {
        return rejectWithValue(err.message);
      }
    }
  );

export const deleteCourseAsync =
  createAsyncThunk(
    'courses/deleteOne',

    async (id, { rejectWithValue }) => {
      try {
        const res = await fetch(
          `${BASE_URL}/courses/${id}`,
          {
            method: 'DELETE',
          }
        );

        if (!res.ok) {
          return rejectWithValue(
            'Failed to delete course'
          );
        }

        return id;
      } catch (err) {
        return rejectWithValue(err.message);
      }
    }
  );