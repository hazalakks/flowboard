import React from 'react';
import { 
  Kanban, 
  Plus, 
  Sun, 
  Moon, 
  RotateCcw, 
  Download
} from 'lucide-react';

interface HeaderProps {
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  onOpenCreateModal: () => void;
  onOpenImportExport: () => void;
  onResetDemo: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  theme,
  onToggleTheme,
  onOpenCreateModal,
  onOpenImportExport,
  onResetDemo,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-15 gap-4">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-sm">
              <Kanban className="w-5 h-5" />
            </div>
            <div>
              <span className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">
                FlowBoard
              </span>
              <span className="text-xs text-slate-400 dark:text-slate-500 ml-2 hidden sm:inline">
                Kanban Task Manager
              </span>
            </div>
          </div>

          {/* Action Toolbar */}
          <div className="flex items-center gap-2">
            
            {/* Backup / Restore */}
            <button
              onClick={onOpenImportExport}
              title="Backup / Restore tasks (JSON)"
              className="px-2.5 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-lg transition-colors border border-slate-200 dark:border-slate-700 flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Backup</span>
            </button>

            {/* Reset Demo */}
            <button
              onClick={onResetDemo}
              title="Reset to demo tasks"
              className="px-2.5 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-lg transition-colors border border-slate-200 dark:border-slate-700 flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Reset Demo</span>
            </button>

            {/* Dark / Light Theme Toggle */}
            <button
              onClick={onToggleTheme}
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              className="p-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-lg transition-colors border border-slate-200 dark:border-slate-700"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-indigo-600" />
              )}
            </button>

            {/* + New Task Primary Button */}
            <button
              onClick={onOpenCreateModal}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs sm:text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-xs active:scale-95 transition-all"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
              <span>New Task</span>
            </button>

          </div>

        </div>
      </div>
    </header>
  );
};
