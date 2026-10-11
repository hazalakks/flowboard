import type { Task } from '../interfaces/task';
import { INITIAL_TASKS } from './constants';

const STORAGE_KEY = 'flowboard_tasks_v2';
const THEME_KEY = 'flowboard_theme';

export function loadTasksFromStorage(): Task[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      saveTasksToStorage(INITIAL_TASKS);
      return INITIAL_TASKS;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
    return INITIAL_TASKS;
  } catch (error) {
    console.error('Error reading localStorage:', error);
    return INITIAL_TASKS;
  }
}

export function saveTasksToStorage(tasks: Task[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
}

export function resetTasksToDefault(): Task[] {
  saveTasksToStorage(INITIAL_TASKS);
  return INITIAL_TASKS;
}

export function exportTasksAsJSON(tasks: Task[]): void {
  const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(tasks, null, 2));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute('href', dataStr);
  downloadAnchor.setAttribute('download', `flowboard_tasks_backup_${new Date().toISOString().slice(0, 10)}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}

export function parseImportedTasks(jsonString: string): { success: boolean; data?: Task[]; error?: string } {
  try {
    const parsed = JSON.parse(jsonString);
    if (!Array.isArray(parsed)) {
      return { success: false, error: 'File must contain an array of tasks.' };
    }
    for (const item of parsed) {
      if (!item.id || !item.title || !item.status) {
        return { success: false, error: 'Invalid task format: "id", "title" and "status" are required.' };
      }
    }
    return { success: true, data: parsed as Task[] };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Unknown error';
    return { success: false, error: `JSON parse error: ${msg}` };
  }
}

export function getInitialTheme(): 'light' | 'dark' {
  const saved = localStorage.getItem(THEME_KEY);
  if (saved === 'light' || saved === 'dark') {
    return saved;
  }
  // Default to light mode as requested!
  return 'light';
}

export function saveThemePreference(theme: 'light' | 'dark'): void {
  localStorage.setItem(THEME_KEY, theme);
  if (theme === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
}
