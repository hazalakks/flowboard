import React from 'react';
import type { BoardStats } from '../interfaces/filter';
import { CheckCircle2, Clock, Layers } from 'lucide-react';

interface StatsOverviewProps {
  stats: BoardStats;
}

export const StatsOverview: React.FC<StatsOverviewProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 flex items-center gap-3">
        <div className="p-2 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
          <Layers className="w-4 h-4" />
        </div>
        <div>
          <p className="text-xs text-slate-500 dark:text-slate-400">Total Tasks</p>
          <p className="text-lg font-bold text-slate-900 dark:text-white">{stats.total}</p>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 flex items-center gap-3">
        <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
          <Clock className="w-4 h-4" />
        </div>
        <div>
          <p className="text-xs text-slate-500 dark:text-slate-400">In Progress</p>
          <p className="text-lg font-bold text-slate-900 dark:text-white">{stats.inProgress}</p>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 flex items-center gap-3">
        <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
          <CheckCircle2 className="w-4 h-4" />
        </div>
        <div>
          <p className="text-xs text-slate-500 dark:text-slate-400">Completed ({stats.completionRate}%)</p>
          <p className="text-lg font-bold text-slate-900 dark:text-white">{stats.done}</p>
        </div>
      </div>
    </div>
  );
};
