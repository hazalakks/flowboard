import type { TaskStatus } from './task';

export interface ColumnDef {
  id: TaskStatus;
  title: string;
  description: string;
  color: {
    accent: string;
    border: string;
    bgBadge: string;
    textBadge: string;
    dot: string;
  };
}
