import React, { useState, useEffect, useMemo, useCallback } from 'react';
import type { Task, TaskFormData, TaskStatus } from '../interfaces/task';
import type { FilterState, BoardStats } from '../interfaces/filter';
import { COLUMNS } from '../utils/constants';
import { 
  loadTasksFromStorage, 
  saveTasksToStorage, 
  resetTasksToDefault, 
  getInitialTheme, 
  saveThemePreference 
} from '../utils/storage';
import { Header } from '../components/Header';
import { StatsOverview } from '../components/StatsOverview';
import { FilterBar } from '../components/FilterBar';
import { Column } from '../components/Column';
import { TaskModal } from '../components/TaskModal';
import { DeleteConfirmModal } from '../components/DeleteConfirmModal';
import { ImportExportModal } from '../components/ImportExportModal';
import { CheckCircle2 } from 'lucide-react';

export const BoardPage: React.FC = () => {
  // 1. Storage & Theme States
  const [tasks, setTasks] = useState<Task[]>(() => loadTasksFromStorage());
  const [theme, setTheme] = useState<'light' | 'dark'>(() => getInitialTheme());

  // 2. Filter State
  const [filter, setFilter] = useState<FilterState>({
    search: '',
    priority: 'all',
    tag: 'all',
    sortBy: 'date_desc',
  });

  // 3. Modal States
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [defaultStatusForNew, setDefaultStatusForNew] = useState<TaskStatus>('todo');

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);

  const [isImportExportOpen, setIsImportExportOpen] = useState(false);

  // 4. Toast notification state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 3000);
  }, []);

  // Theme synchronization with HTML document element
  useEffect(() => {
    saveThemePreference(theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Helper to persist tasks
  const updateAndPersistTasks = useCallback((newTasks: Task[]) => {
    setTasks(newTasks);
    saveTasksToStorage(newTasks);
  }, []);

  // ==========================================
  // CRUD Operations
  // ==========================================

  // [CREATE / EKLE]
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
    showToast(`"${newTask.title}" başarıyla eklendi!`);
  };

  // [UPDATE / GÜNCELLE]
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
    showToast(`"${formData.title}" güncellendi.`);
  };

  // [DELETE / SİL]
  const handleConfirmDelete = () => {
    if (!taskToDelete) return;

    const nextTasks = tasks.filter((t) => t.id !== taskToDelete.id);
    updateAndPersistTasks(nextTasks);
    showToast(`"${taskToDelete.title}" silindi.`);
    setTaskToDelete(null);
  };

  // [UPDATE - Drag and Drop Status Change]
  const handleDropTask = (taskId: string, targetStatus: TaskStatus) => {
    const existing = tasks.find((t) => t.id === taskId);
    if (!existing || existing.status === targetStatus) return;

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
    showToast(`Görev "${COLUMNS.find((c) => c.id === targetStatus)?.title}" sütununa taşındı.`);
  };

  // Drag start helper
  const handleDragStart = (e: React.DragEvent, taskId: string) => {
    e.dataTransfer.setData('text/plain', taskId);
    e.dataTransfer.effectAllowed = 'move';
  };

  // Quick toggle completed
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
    showToast(newStatus === 'done' ? 'Görev tamamlandı olarak işaretlendi! 🎉' : 'Görev yapılacaklara alındı.');
  };

  // Reset to initial demo tasks
  const handleResetDemo = () => {
    if (window.confirm('Demo verilerine sıfırlamak istediğinize emin misiniz?')) {
      const reset = resetTasksToDefault();
      setTasks(reset);
      showToast('Pano demo verilerine sıfırlandı.');
    }
  };

  // JSON Import success handler
  const handleImportSuccess = (imported: Task[]) => {
    updateAndPersistTasks(imported);
    showToast(`${imported.length} adet görev içe aktarıldı.`);
  };

  // Modal openers
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

  // ==========================================
  // Filter & Compute Derived Data
  // ==========================================
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      // 1. Search Query
      if (filter.search.trim()) {
        const query = filter.search.toLowerCase();
        const matchesTitle = task.title.toLowerCase().includes(query);
        const matchesDesc = task.description.toLowerCase().includes(query);
        if (!matchesTitle && !matchesDesc) return false;
      }

      // 2. Priority Filter
      if (filter.priority !== 'all' && task.priority !== filter.priority) {
        return false;
      }

      // 3. Tag Filter
      if (filter.tag !== 'all' && (!task.tags || !task.tags.includes(filter.tag))) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (filter.sortBy === 'date_desc') {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
      if (filter.sortBy === 'date_asc') {
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      }
      if (filter.sortBy === 'title_asc') {
        return a.title.localeCompare(b.title, 'tr');
      }
      if (filter.sortBy === 'priority_desc') {
        const pMap = { urgent: 4, high: 3, medium: 2, low: 1 };
        return pMap[b.priority] - pMap[a.priority];
      }
      return 0;
    });
  }, [tasks, filter]);

  // Compute Board Statistics
  const stats: BoardStats = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter((t) => t.status === 'done').length;
    const inProgress = tasks.filter((t) => t.status === 'in_progress').length;
    const highPriority = tasks.filter((t) => t.priority === 'urgent' || t.priority === 'high').length;
    const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

    return {
      total,
      completed,
      inProgress,
      highPriority,
      completionRate,
    };
  }, [tasks]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors duration-200">
      
      {/* 1. Header */}
      <Header
        theme={theme}
        onToggleTheme={toggleTheme}
        onOpenCreateModal={() => openCreateModal('todo')}
        onOpenImportExport={() => setIsImportExportOpen(true)}
        onResetDemo={handleResetDemo}
      />

      {/* 2. Main Board Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* Project Intro / Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-200/80 dark:border-slate-800">
          <div>
            <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Sprint & Görev Panosu
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
              Görevleri sürükleyip bırakarak taşıyın, filtreleyin ve gerçek zamanlı takip edin.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              LocalStorage Aktif
            </span>
          </div>
        </div>

        {/* 3. Statistics Overview */}
        <StatsOverview stats={stats} />

        {/* 4. Filter Bar */}
        <FilterBar
          filter={filter}
          onChangeFilter={(updates) => setFilter((prev) => ({ ...prev, ...updates }))}
          onClearFilters={() =>
            setFilter({ search: '', priority: 'all', tag: 'all', sortBy: 'date_desc' })
          }
          filteredCount={filteredTasks.length}
          totalCount={tasks.length}
        />

        {/* 5. Kanban Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 items-start">
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

      {/* 6. Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 py-4 mt-12 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400">
          <p>
            FlowBoard • React, TypeScript, Tailwind CSS & LocalStorage ile geliştirildi.
          </p>
          <div className="flex items-center gap-3">
            <span>Netlify Ready</span>
            <span>•</span>
            <span>CRUD Mimarisi</span>
            <span>•</span>
            <span>Drag & Drop</span>
          </div>
        </div>
      </footer>

      {/* 7. Modals */}
      <TaskModal
        isOpen={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
        onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
        initialTask={editingTask}
        defaultStatus={defaultStatusForNew}
      />

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

      {/* 8. Toast Feedback notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2.5 px-4 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-medium rounded-xl shadow-xl shadow-slate-950/20 animate-in slide-in-from-bottom-3 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 dark:text-emerald-600 flex-shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

    </div>
  );
};
