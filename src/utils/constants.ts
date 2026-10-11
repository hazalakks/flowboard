import type { ColumnDef } from '../interfaces/column';
import type { Task } from '../interfaces/task';

export const REPO_URL = 'https://github.com/hazalakks/flowboard';

export const COLUMNS: ColumnDef[] = [
  {
    id: 'todo',
    title: 'To Do',
    dotColor: 'bg-slate-400',
    badgeBg: 'bg-slate-100 dark:bg-slate-800',
    badgeText: 'text-slate-600 dark:text-slate-400',
  },
  {
    id: 'in_progress',
    title: 'In Progress',
    dotColor: 'bg-blue-500',
    badgeBg: 'bg-blue-50 dark:bg-blue-950/60',
    badgeText: 'text-blue-600 dark:text-blue-300',
  },
  {
    id: 'review',
    title: 'In Review',
    dotColor: 'bg-purple-500',
    badgeBg: 'bg-purple-50 dark:bg-purple-950/60',
    badgeText: 'text-purple-600 dark:text-purple-300',
  },
  {
    id: 'done',
    title: 'Done',
    dotColor: 'bg-emerald-500',
    badgeBg: 'bg-emerald-50 dark:bg-emerald-950/60',
    badgeText: 'text-emerald-600 dark:text-emerald-300',
  },
];

export const PRIORITY_CONFIG = {
  low: {
    label: 'Low',
    badge: 'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700',
    dot: 'bg-slate-400',
  },
  medium: {
    label: 'Medium',
    badge: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/50 dark:text-blue-300 dark:border-blue-800',
    dot: 'bg-blue-500',
  },
  high: {
    label: 'High',
    badge: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/50 dark:text-amber-300 dark:border-amber-800',
    dot: 'bg-amber-500',
  },
  urgent: {
    label: 'Urgent',
    badge: 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/50 dark:text-rose-300 dark:border-rose-800',
    dot: 'bg-rose-500 animate-pulse',
  },
} as const;

export const AVAILABLE_TAGS = [
  'Frontend',
  'Backend',
  'UI/UX',
  'Bug',
  'AI',
  'DevOps',
];

// Seed due dates are relative to today so the demo never looks overdue.
function daysFromNow(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toLocaleDateString('en-CA'); // local YYYY-MM-DD
}

export const INITIAL_TASKS: Task[] = [
  {
    id: 'task-1',
    title: 'Design clean Kanban dashboard UI',
    description: 'Create responsive column cards with drag-and-drop support and smooth transitions.',
    status: 'done',
    priority: 'high',
    tags: ['UI/UX', 'Frontend'],
    dueDate: daysFromNow(3),
    createdAt: new Date(Date.now() - 4 * 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 1 * 86400000).toISOString(),
  },
  {
    id: 'task-2',
    title: 'HTML5 Drag & Drop interactions',
    description: 'Allow moving tasks seamlessly between columns with real-time feedback and state sync.',
    status: 'in_progress',
    priority: 'urgent',
    tags: ['Frontend'],
    dueDate: daysFromNow(2),
    createdAt: new Date(Date.now() - 3 * 86400000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'task-3',
    title: 'LocalStorage persistence and JSON backup',
    description: 'Save all tasks locally so data stays intact on browser reload, plus export/import support.',
    status: 'done',
    priority: 'medium',
    tags: ['Frontend'],
    dueDate: daysFromNow(0),
    createdAt: new Date(Date.now() - 5 * 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 2 * 86400000).toISOString(),
  },
  {
    id: 'task-4',
    title: 'Fast search and priority filtering',
    description: 'Instant client-side filter by keyword, tag, or priority level.',
    status: 'in_progress',
    priority: 'medium',
    tags: ['Frontend'],
    dueDate: daysFromNow(6),
    createdAt: new Date(Date.now() - 2 * 86400000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'task-5',
    title: 'Netlify CI/CD automatic deployment',
    description: 'Configure automated build & preview on Netlify via GitHub repository.',
    status: 'review',
    priority: 'high',
    tags: ['DevOps'],
    dueDate: daysFromNow(1),
    createdAt: new Date(Date.now() - 3 * 86400000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'task-6',
    title: 'AI task summarizer integration',
    description: 'Explore generative sprint insights module to summarize board activity.',
    status: 'todo',
    priority: 'low',
    tags: ['AI'],
    dueDate: daysFromNow(10),
    createdAt: new Date(Date.now() - 1 * 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 1 * 86400000).toISOString(),
  },
];
