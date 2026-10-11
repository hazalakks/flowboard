import type { TaskPriority } from './task';

export interface FilterState {
  search: string;
  priority: TaskPriority | 'all';
  tag: string | 'all';
}

export interface BoardStats {
  total: number;
  todo: number;
  inProgress: number;
  review: number;
  done: number;
  completionRate: number;
}
