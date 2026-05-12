import { createAsyncThunk } from '@reduxjs/toolkit';

const BASE_URL = 'https://68e9f8fcf1eeb3f856e593b7.mockapi.io/api/v1';

export const fetchStudents = createAsyncThunk(
  'students/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(`${BASE_URL}/students`);

      if (!res.ok) {
        return rejectWithValue('Failed to fetch students');
      }

      return await res.json();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const addStudentAsync = createAsyncThunk(
  'students/addOne',
  async (studentData, { rejectWithValue }) => {
    try {
      const res = await fetch(`${BASE_URL}/students`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(studentData),
      });

      if (!res.ok) {
        return rejectWithValue('Failed to add student');
      }

      return await res.json();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const updateStudentAsync = createAsyncThunk(
  'students/updateOne',
  async ({ id, ...changes }, { rejectWithValue }) => {
    try {
      const res = await fetch(`${BASE_URL}/students/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(changes),
      });

      if (!res.ok) {
        return rejectWithValue('Failed to update student');
      }

      return await res.json();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const deleteStudentAsync = createAsyncThunk(
  'students/deleteOne',
  async (id, { rejectWithValue }) => {
    try {
      const res = await fetch(`${BASE_URL}/students/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        return rejectWithValue('Failed to delete student');
      }

      return id;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);