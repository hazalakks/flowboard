import type { TaskPriority } from './task';

export interface FilterState {
  search: string;
  priority: TaskPriority | 'all';
  tag: string | 'all';
  sortBy: 'date_desc' | 'date_asc' | 'priority_desc' | 'title_asc';
}

export interface BoardStats {
  total: number;
  completed: number;
  inProgress: number;
  highPriority: number;
  completionRate: number;
}
