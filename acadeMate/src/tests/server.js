import { setupServer } from 'msw/node';
import { studentHandlers } from './handlers/students';
import { courseHandlers } from './handlers/courses';

export const server = setupServer(...studentHandlers, ...courseHandlers);
