import React from 'react';
import type { BoardStats } from '../interfaces/filter';
import { CheckCircle2, Clock, AlertTriangle, Layers } from 'lucide-react';

interface StatsOverviewProps {
  stats: BoardStats;
}

export const StatsOverview: React.FC<StatsOverviewProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-6">
      
      {/* Total Tasks */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-3 sm:p-4 flex items-center gap-3 shadow-xs">
        <div className="p-2.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
          <Layers className="w-5 h-5" />
        </div>
        <div>
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Toplam Görev</p>
          <p className="text-xl font-bold text-slate-900 dark:text-white">{stats.total}</p>
        </div>
      </div>

      {/* In Progress Tasks */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-3 sm:p-4 flex items-center gap-3 shadow-xs">
        <div className="p-2.5 rounded-lg bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400">
          <Clock className="w-5 h-5" />
        </div>
        <div>
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Devam Eden</p>
          <p className="text-xl font-bold text-slate-900 dark:text-white">{stats.inProgress}</p>
        </div>
      </div>

      {/* Completed Tasks with percentage */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-3 sm:p-4 flex items-center gap-3 shadow-xs">
        <div className="p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
          <CheckCircle2 className="w-5 h-5" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Tamamlanan</p>
            <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              %{stats.completionRate}
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <p className="text-xl font-bold text-slate-900 dark:text-white">{stats.completed}</p>
          </div>
        </div>
      </div>

      {/* High Priority Tasks */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-3 sm:p-4 flex items-center gap-3 shadow-xs">
        <div className="p-2.5 rounded-lg bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400">
          <AlertTriangle className="w-5 h-5" />
        </div>
        <div>
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Kritik / Yüksek</p>
          <p className="text-xl font-bold text-slate-900 dark:text-white">{stats.highPriority}</p>
        </div>
      </div>

    </div>
  );
};
