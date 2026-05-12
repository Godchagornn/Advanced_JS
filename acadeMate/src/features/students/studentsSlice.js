import {
  createSlice,
  createEntityAdapter,
} from '@reduxjs/toolkit';

import {
  fetchStudents,
  addStudentAsync,
  updateStudentAsync,
  deleteStudentAsync,
} from './studentsThunks';

const studentsAdapter = createEntityAdapter({
  sortComparer: (a, b) =>
    a.name.localeCompare(b.name),
});

const initialState =
  studentsAdapter.getInitialState({
    status: 'idle',
    error: null,
  });

const studentsSlice = createSlice({
  name: 'students',

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder

      // ================= FETCH =================
      .addCase(
        fetchStudents.pending,
        (state) => {
          state.status = 'loading';
          state.error = null;
        }
      )

      .addCase(
        fetchStudents.fulfilled,
        (state, action) => {
          state.status = 'succeeded';
          studentsAdapter.setAll(
            state,
            action.payload
          );
        }
      )

      .addCase(
        fetchStudents.rejected,
        (state, action) => {
          state.status = 'failed';
          state.error = action.payload;
        }
      )

      .addCase(
        addStudentAsync.pending,
        (state) => {
          state.status = 'loading';
        }
      )

      .addCase(
        addStudentAsync.fulfilled,
        (state, action) => {
          state.status = 'succeeded';
          studentsAdapter.addOne(
            state,
            action.payload
          );
        }
      )

      .addCase(
        addStudentAsync.rejected,
        (state, action) => {
          state.status = 'failed';
          state.error = action.payload;
        }
      )

      .addCase(
        updateStudentAsync.pending,
        (state) => {
          state.status = 'loading';
        }
      )

      .addCase(
        updateStudentAsync.fulfilled,
        (state, action) => {
          state.status = 'succeeded';
          studentsAdapter.upsertOne(
            state,
            action.payload
          );
        }
      )

      .addCase(
        updateStudentAsync.rejected,
        (state, action) => {
          state.status = 'failed';
          state.error = action.payload;
        }
      )

      .addCase(
        deleteStudentAsync.pending,
        (state) => {
          state.status = 'loading';
        }
      )

      .addCase(
        deleteStudentAsync.fulfilled,
        (state, action) => {
          state.status = 'succeeded';
          studentsAdapter.removeOne(
            state,
            action.payload
          );
        }
      )

      .addCase(
        deleteStudentAsync.rejected,
        (state, action) => {
          state.status = 'failed';
          state.error = action.payload;
        }
      );
  },
});

export const {
  selectAll: selectAllStudents,
  selectById: selectStudentById,
  selectTotal: selectStudentCount,
} = studentsAdapter.getSelectors(
  (state) => state.students
);

export default studentsSlice.reducer;