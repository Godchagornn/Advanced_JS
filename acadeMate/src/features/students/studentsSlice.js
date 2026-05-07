import {
  createSlice,
} from '@reduxjs/toolkit';

import {
  fetchStudents,
  addStudentAsync,
  updateStudentAsync,
  deleteStudentAsync,
} from './studentsThunks';

const studentsSlice = createSlice({
  name: 'students',

  initialState: {
    list: [],
    status: 'idle',
    error: null,
  },

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
          state.list = action.payload;
        }
      )

      .addCase(
        fetchStudents.rejected,
        (state, action) => {
          state.status = 'failed';
          state.error = action.payload;
        }
      )

      // ================= ADD =================
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

          state.list.push(action.payload);
        }
      )

      .addCase(
        addStudentAsync.rejected,
        (state, action) => {
          state.status = 'failed';
          state.error = action.payload;
        }
      )

      // ================= UPDATE =================
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

          const index =
            state.list.findIndex(
              (student) =>
                student.id ===
                action.payload.id
            );

          if (index !== -1) {
            state.list[index] =
              action.payload;
          }
        }
      )

      .addCase(
        updateStudentAsync.rejected,
        (state, action) => {
          state.status = 'failed';
          state.error = action.payload;
        }
      )

      // ================= DELETE =================
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

          state.list =
            state.list.filter(
              (student) =>
                student.id !==
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

export default studentsSlice.reducer;