import React from 'react';
import type { FilterState } from '../interfaces/filter';
import type { TaskPriority } from '../interfaces/task';
import { AVAILABLE_TAGS } from '../utils/constants';
import { Search, X, SlidersHorizontal, ArrowUpDown } from 'lucide-react';

interface FilterBarProps {
  filter: FilterState;
  onChangeFilter: (updates: Partial<FilterState>) => void;
  onClearFilters: () => void;
  filteredCount: number;
  totalCount: number;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  filter,
  onChangeFilter,
  onClearFilters,
  filteredCount,
  totalCount,
}) => {
  const isFiltered =
    filter.search.trim() !== '' ||
    filter.priority !== 'all' ||
    filter.tag !== 'all' ||
    filter.sortBy !== 'date_desc';

  const priorities: { id: TaskPriority | 'all'; label: string }[] = [
    { id: 'all', label: 'Tüm Öncelikler' },
    { id: 'urgent', label: '🔴 Acil' },
    { id: 'high', label: '🟠 Yüksek' },
    { id: 'medium', label: '🔵 Orta' },
    { id: 'low', label: '⚪ Düşük' },
  ];

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 mb-6 shadow-xs transition-colors">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={filter.search}
            onChange={(e) => onChangeFilter({ search: e.target.value })}
            placeholder="Görev adı veya açıklamasında ara..."
            className="w-full pl-9 pr-8 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
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

        {/* Priority Filter */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400 hidden xl:inline-flex items-center gap-1 mr-1">
            <SlidersHorizontal className="w-3.5 h-3.5" /> Öncelik:
          </span>
          {priorities.map((p) => {
            const active = filter.priority === p.id;
            return (
              <button
                key={p.id}
                onClick={() => onChangeFilter({ priority: p.id })}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors border ${
                  active
                    ? 'bg-indigo-50 text-indigo-700 border-indigo-300 dark:bg-indigo-950/70 dark:text-indigo-300 dark:border-indigo-700 shadow-xs'
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700 dark:hover:bg-slate-700'
                }`}
              >
                {p.label}
              </button>
            );
          })}
        </div>

        {/* Tag Filter & Sort */}
        <div className="flex items-center gap-2">
          {/* Tag Dropdown */}
          <select
            value={filter.tag}
            onChange={(e) => onChangeFilter({ tag: e.target.value })}
            className="px-3 py-1.5 text-xs font-medium bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
          >
            <option value="all">Tüm Etiketler</option>
            {AVAILABLE_TAGS.map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </select>

          {/* Sort Dropdown */}
          <div className="relative">
            <select
              value={filter.sortBy}
              onChange={(e) => onChangeFilter({ sortBy: e.target.value as FilterState['sortBy'] })}
              className="px-3 py-1.5 text-xs font-medium bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            >
              <option value="date_desc">En Yeni Eklenen</option>
              <option value="date_asc">En Eski Eklenen</option>
              <option value="priority_desc">Önceliğe Göre</option>
              <option value="title_asc">Başlığa Göre (A-Z)</option>
            </select>
          </div>

          {/* Clear Filters */}
          {isFiltered && (
            <button
              onClick={onClearFilters}
              title="Filtreleri Temizle"
              className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/50 hover:bg-rose-100 dark:hover:bg-rose-900/60 rounded-lg transition-colors border border-rose-200 dark:border-rose-900"
            >
              <X className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Temizle</span>
            </button>
          )}
        </div>

      </div>

      {/* Info Bar */}
      <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
        <div>
          {isFiltered ? (
            <span>
              Filtrelenmiş sonuçlar: <strong className="text-slate-700 dark:text-slate-200">{filteredCount}</strong> / {totalCount} görev
            </span>
          ) : (
            <span>
              Toplam <strong>{totalCount}</strong> görev gösteriliyor
            </span>
          )}
        </div>
        <div className="flex items-center gap-1 text-[11px] text-slate-400">
          <ArrowUpDown className="w-3 h-3" />
          <span>Sütunlar arasında sürükle & bırak desteklenir</span>
        </div>
      </div>
    </div>
  );
};
