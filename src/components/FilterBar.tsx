import React from 'react';
import type { FilterState, BoardStats } from '../interfaces/filter';
import type { TaskPriority } from '../interfaces/task';
import { Search, X, CheckCircle2 } from 'lucide-react';

interface FilterBarProps {
  filter: FilterState;
  onChangeFilter: (updates: Partial<FilterState>) => void;
  stats: BoardStats;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  filter,
  onChangeFilter,
  stats,
}) => {
  const priorities: { id: TaskPriority | 'all'; label: string }[] = [
    { id: 'all', label: 'All' },
    { id: 'urgent', label: 'Urgent' },
    { id: 'high', label: 'High' },
    { id: 'medium', label: 'Medium' },
    { id: 'low', label: 'Low' },
  ];

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
      
      {/* Search Input */}
      <div className="relative flex-1 max-w-md">
        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={filter.search}
          onChange={(e) => onChangeFilter({ search: e.target.value })}
          placeholder="Search tasks..."
          className="w-full pl-9 pr-8 py-1.5 text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-2xs"
        />
        {filter.search && (
          <button
            onClick={() => onChangeFilter({ search: '' })}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Priority Filter & Quick Progress */}
      <div className="flex items-center gap-3 justify-between sm:justify-end">
        {/* Priority Filter Pills */}
        <div className="flex items-center gap-1 bg-white dark:bg-slate-900 p-1 border border-slate-200 dark:border-slate-800 rounded-lg shadow-2xs">
          {priorities.map((p) => {
            const active = filter.priority === p.id;
            return (
              <button
                key={p.id}
                onClick={() => onChangeFilter({ priority: p.id })}
                className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                  active
                    ? 'bg-indigo-600 text-white shadow-2xs'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {p.label}
              </button>
            );
          })}
        </div>

        {/* Minimal Progress Badge */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg shadow-2xs text-xs font-medium text-slate-600 dark:text-slate-300">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
          <span>
            {stats.done} of {stats.total} completed ({stats.completionRate}%)
          </span>
        </div>
      </div>

    </div>
  );
};
