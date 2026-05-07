import { createSlice } from '@reduxjs/toolkit';

import {
  fetchCourses,
  addCourseAsync,
  updateCourseAsync,
  deleteCourseAsync,
} from './coursesThunks';

const coursesSlice = createSlice({
  name: 'courses',

  initialState: {
    list: [],
    status: 'idle',
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      // FETCH
      .addCase(fetchCourses.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })

      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload;
      })

      .addCase(fetchCourses.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // ADD
      .addCase(addCourseAsync.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })

      // UPDATE
      .addCase(updateCourseAsync.fulfilled, (state, action) => {
        const index = state.list.findIndex(
          (course) => course.id === action.payload.id
        );

        if (index !== -1) {
          state.list[index] = action.payload;
        }
      })

      // DELETE
      .addCase(deleteCourseAsync.fulfilled, (state, action) => {
        state.list = state.list.filter(
          (course) => course.id !== action.payload
        );
      });
  },
});

export default coursesSlice.reducer;