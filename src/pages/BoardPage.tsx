import React, { useState, useEffect, useMemo, useCallback } from 'react';
import type { Task, TaskFormData, TaskStatus } from '../interfaces/task';
import type { FilterState, BoardStats } from '../interfaces/filter';
import { COLUMNS, REPO_URL } from '../utils/constants';
import { 
  loadTasksFromStorage, 
  saveTasksToStorage, 
  resetTasksToDefault, 
  getInitialTheme, 
  saveThemePreference 
} from '../utils/storage';
import { Header } from '../components/Header';
import { FilterBar } from '../components/FilterBar';
import { Column } from '../components/Column';
import { TaskModal } from '../components/TaskModal';
import { DeleteConfirmModal } from '../components/DeleteConfirmModal';
import { ImportExportModal } from '../components/ImportExportModal';
import { CheckCircle2 } from 'lucide-react';

export const BoardPage: React.FC = () => {
  // Theme & Storage
  const [tasks, setTasks] = useState<Task[]>(() => loadTasksFromStorage());
  const [theme, setTheme] = useState<'light' | 'dark'>(() => getInitialTheme());

  // Filter State
  const [filter, setFilter] = useState<FilterState>({
    search: '',
    priority: 'all',
    tag: 'all',
  });

  // Modal States
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [defaultStatusForNew, setDefaultStatusForNew] = useState<TaskStatus>('todo');

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);

  const [isImportExportOpen, setIsImportExportOpen] = useState(false);

  // Toast Notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((curr) => (curr === msg ? null : curr));
    }, 2500);
  }, []);

  // Sync theme with HTML class
  useEffect(() => {
    saveThemePreference(theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const updateAndPersistTasks = useCallback((newTasks: Task[]) => {
    setTasks(newTasks);
    saveTasksToStorage(newTasks);
  }, []);

  // CRUD: Create (Ekle)
  const handleCreateTask = (formData: TaskFormData) => {
    const newTask: Task = {
      id: `task-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      title: formData.title,
      description: formData.description,
      status: formData.status,
      priority: formData.priority,
      tags: formData.tags,
      dueDate: formData.dueDate,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const nextTasks = [newTask, ...tasks];
    updateAndPersistTasks(nextTasks);
    showToast(`Task "${newTask.title}" created!`);
  };

  // CRUD: Update (Güncelle)
  const handleUpdateTask = (formData: TaskFormData) => {
    if (!editingTask) return;

    const nextTasks = tasks.map((t) => {
      if (t.id === editingTask.id) {
        return {
          ...t,
          title: formData.title,
          description: formData.description,
          status: formData.status,
          priority: formData.priority,
          tags: formData.tags,
          dueDate: formData.dueDate,
          updatedAt: new Date().toISOString(),
        };
      }
      return t;
    });

    updateAndPersistTasks(nextTasks);
    showToast(`Task "${formData.title}" updated.`);
  };

  // CRUD: Delete (Sil)
  const handleConfirmDelete = () => {
    if (!taskToDelete) return;

    const nextTasks = tasks.filter((t) => t.id !== taskToDelete.id);
    updateAndPersistTasks(nextTasks);
    showToast(`Task "${taskToDelete.title}" deleted.`);
    setTaskToDelete(null);
  };

  // Drag & Drop Status Update
  const handleDropTask = (taskId: string, targetStatus: TaskStatus) => {
    const existing = tasks.find((t) => t.id === taskId);
    if (!existing || existing.status === targetStatus) return;

    const targetColumn = COLUMNS.find((c) => c.id === targetStatus);

    const nextTasks = tasks.map((t) => {
      if (t.id === taskId) {
        return {
          ...t,
          status: targetStatus,
          updatedAt: new Date().toISOString(),
        };
      }
      return t;
    });

    updateAndPersistTasks(nextTasks);
    showToast(`Moved to ${targetColumn?.title || targetStatus}`);
  };

  const handleDragStart = (e: React.DragEvent, taskId: string) => {
    e.dataTransfer.setData('text/plain', taskId);
    e.dataTransfer.effectAllowed = 'move';
  };

  // Toggle complete
  const handleToggleDone = (task: Task) => {
    const newStatus: TaskStatus = task.status === 'done' ? 'todo' : 'done';
    const nextTasks = tasks.map((t) => {
      if (t.id === task.id) {
        return {
          ...t,
          status: newStatus,
          updatedAt: new Date().toISOString(),
        };
      }
      return t;
    });
    updateAndPersistTasks(nextTasks);
    showToast(newStatus === 'done' ? 'Task marked as completed! 🎉' : 'Task moved to To Do');
  };

  // Reset to demo tasks
  const handleResetDemo = () => {
    if (window.confirm('Reset board to sample demo tasks?')) {
      const reset = resetTasksToDefault();
      setTasks(reset);
      showToast('Board reset to demo tasks.');
    }
  };

  const handleImportSuccess = (imported: Task[]) => {
    updateAndPersistTasks(imported);
    showToast(`${imported.length} tasks imported successfully.`);
  };

  const openCreateModal = (status: TaskStatus = 'todo') => {
    setEditingTask(null);
    setDefaultStatusForNew(status);
    setIsTaskModalOpen(true);
  };

  const openEditModal = (task: Task) => {
    setEditingTask(task);
    setIsTaskModalOpen(true);
  };

  const openDeleteModal = (task: Task) => {
    setTaskToDelete(task);
    setIsDeleteModalOpen(true);
  };

  // Filter tasks
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      if (filter.search.trim()) {
        const query = filter.search.toLowerCase();
        const matchesTitle = task.title.toLowerCase().includes(query);
        const matchesDesc = task.description.toLowerCase().includes(query);
        if (!matchesTitle && !matchesDesc) return false;
      }
      if (filter.priority !== 'all' && task.priority !== filter.priority) {
        return false;
      }
      if (filter.tag !== 'all' && (!task.tags || !task.tags.includes(filter.tag))) {
        return false;
      }
      return true;
    });
  }, [tasks, filter]);

  // Statistics
  const stats: BoardStats = useMemo(() => {
    const total = tasks.length;
    const todo = tasks.filter((t) => t.status === 'todo').length;
    const inProgress = tasks.filter((t) => t.status === 'in_progress').length;
    const review = tasks.filter((t) => t.status === 'review').length;
    const done = tasks.filter((t) => t.status === 'done').length;
    const completionRate = total > 0 ? Math.round((done / total) * 100) : 0;

    return { total, todo, inProgress, review, done, completionRate };
  }, [tasks]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors duration-150">
      
      {/* 1. Header */}
      <Header
        theme={theme}
        onToggleTheme={toggleTheme}
        onOpenCreateModal={() => openCreateModal('todo')}
        onOpenImportExport={() => setIsImportExportOpen(true)}
        onResetDemo={handleResetDemo}
      />

      {/* 2. Main Board Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6">
        
        {/* Simplified Filter & Search Bar */}
        <FilterBar
          filter={filter}
          onChangeFilter={(updates) => setFilter((prev) => ({ ...prev, ...updates }))}
          stats={stats}
        />

        {/* 3. 4 Clean Kanban Columns Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-start">
          {COLUMNS.map((column) => {
            const columnTasks = filteredTasks.filter((t) => t.status === column.id);
            return (
              <Column
                key={column.id}
                column={column}
                tasks={columnTasks}
                onAddTask={(status) => openCreateModal(status)}
                onEditTask={openEditModal}
                onDeleteTask={openDeleteModal}
                onToggleDone={handleToggleDone}
                onDropTask={handleDropTask}
                onDragStartTask={handleDragStart}
              />
            );
          })}
        </div>

      </main>

      {/* 4. Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800/80 bg-white/50 dark:bg-slate-900/40 py-3.5 mt-auto transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-400 dark:text-slate-500">
          <p>© {new Date().getFullYear()} FlowBoard</p>
          <div className="flex items-center gap-4">
            <span title="No account needed. Your tasks never leave this device.">
              Your tasks are saved in this browser
            </span>
            <a
              href={REPO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>
      </footer>

      {/* Modals */}
      {isTaskModalOpen && (
        <TaskModal
          key={editingTask?.id ?? `new-${defaultStatusForNew}`}
          isOpen={isTaskModalOpen}
          onClose={() => setIsTaskModalOpen(false)}
          onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
          initialTask={editingTask}
          defaultStatus={defaultStatusForNew}
        />
      )}

      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        task={taskToDelete}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
      />

      <ImportExportModal
        isOpen={isImportExportOpen}
        tasks={tasks}
        onClose={() => setIsImportExportOpen(false)}
        onImportSuccess={handleImportSuccess}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2 px-3.5 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-medium rounded-xl shadow-lg animate-in slide-in-from-bottom-2 duration-150">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 dark:text-emerald-600 flex-shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

    </div>
  );
};
