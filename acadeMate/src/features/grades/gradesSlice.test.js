import { describe, it, expect } from 'vitest';
import gradesReducer, { addGrade, deleteGrade } from './gradesSlice';

describe('gradesSlice', () => {
  const initialState = gradesReducer(undefined, { type: '@@INIT' });

  it('starts with an empty grades list', () => {
    expect(initialState.ids).toHaveLength(0);
  });

  it('addGrade adds a new entry with an auto-generated id', () => {
    const state = gradesReducer(
      initialState,
      addGrade({ studentId: 's1', courseId: 'c1', grade: 'A', semester: '1/2024' })
    );

    expect(state.ids).toHaveLength(1);

    const id = state.ids[0];
    expect(state.entities[id].grade).toBe('A');
    expect(state.entities[id].studentId).toBe('s1');
  });

  it('deleteGrade removes the entry by id', () => {
    const afterAdd = gradesReducer(
      initialState,
      addGrade({ studentId: 's1', courseId: 'c1', grade: 'A', semester: '1/2024' })
    );

    const id = afterAdd.ids[0];

    const afterDelete = gradesReducer(afterAdd, deleteGrade(id));

    expect(afterDelete.ids).toHaveLength(0);
  });
});
