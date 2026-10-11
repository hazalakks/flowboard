import type { TaskStatus } from './task';

export interface ColumnDef {
  id: TaskStatus;
  title: string;
  dotColor: string;
  badgeBg: string;
  badgeText: string;
}
