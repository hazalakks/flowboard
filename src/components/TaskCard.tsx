import React from 'react';
import type { Task } from '../interfaces/task';
import { PRIORITY_CONFIG } from '../utils/constants';
import { formatDueDate } from '../utils/date';
import { 
  Calendar, 
  Tag as TagIcon, 
  Pencil, 
  Trash2, 
  GripVertical,
  CheckCircle2,
  Clock
} from 'lucide-react';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
  onToggleDone: (task: Task) => void;
  onDragStart: (e: React.DragEvent, taskId: string) => void;
  onDragEnd: (e: React.DragEvent) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({
  task,
  onEdit,
  onDelete,
  onToggleDone,
  onDragStart,
  onDragEnd,
}) => {
  const priority = PRIORITY_CONFIG[task.priority] || PRIORITY_CONFIG.medium;
  const dueDateInfo = formatDueDate(task.dueDate);
  const isDone = task.status === 'done';

  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, task.id)}
      onDragEnd={onDragEnd}
      className={`group relative bg-white dark:bg-slate-900 border rounded-xl p-3.5 shadow-xs hover:shadow-md transition-all duration-200 cursor-grab active:cursor-grabbing border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700/60 ${
        isDone ? 'opacity-85' : ''
      }`}
    >
      {/* Top Header: Priority Badge + Drag Handle + Action Buttons */}
      <div className="flex items-center justify-between gap-2 mb-2">
        <div className="flex items-center gap-1.5">
          <span
            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-semibold border ${priority.badge}`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${priority.dot}`} />
            {priority.label}
          </span>
        </div>

        <div className="flex items-center gap-1 opacity-70 group-hover:opacity-100 transition-opacity">
          {/* Quick complete toggle */}
          <button
            onClick={() => onToggleDone(task)}
            title={isDone ? 'Tamamlanmadı olarak işaretle' : 'Tamamlandı olarak işaretle'}
            className={`p-1 rounded-md transition-colors ${
              isDone 
                ? 'text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/50' 
                : 'text-slate-400 hover:text-emerald-600 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
          </button>

          {/* Edit Button */}
          <button
            onClick={() => onEdit(task)}
            title="Görevi Düzenle"
            className="p-1 rounded-md text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <Pencil className="w-3.5 h-3.5" />
          </button>

          {/* Delete Button */}
          <button
            onClick={() => onDelete(task)}
            title="Görevi Sil"
            className="p-1 rounded-md text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>

          {/* Drag Handle Indicator */}
          <div className="text-slate-300 dark:text-slate-600 p-0.5 cursor-grab">
            <GripVertical className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>

      {/* Task Title */}
      <h3
        className={`text-sm font-semibold text-slate-900 dark:text-slate-100 mb-1.5 leading-snug line-clamp-2 ${
          isDone ? 'line-through text-slate-500 dark:text-slate-400' : ''
        }`}
      >
        {task.title}
      </h3>

      {/* Task Description */}
      {task.description && (
        <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mb-3 leading-relaxed">
          {task.description}
        </p>
      )}

      {/* Tags */}
      {task.tags && task.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-2.5">
          {task.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 text-[10px] font-medium px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
            >
              <TagIcon className="w-2.5 h-2.5 text-slate-400" />
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Card Footer: Due Date */}
      {task.dueDate && (
        <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800/80 text-[11px]">
          <span
            className={`inline-flex items-center gap-1 font-medium ${
              dueDateInfo.isOverdue
                ? 'text-rose-600 dark:text-rose-400 font-semibold'
                : dueDateInfo.isToday
                ? 'text-amber-600 dark:text-amber-400 font-semibold'
                : 'text-slate-500 dark:text-slate-400'
            }`}
          >
            {dueDateInfo.isOverdue ? (
              <Clock className="w-3 h-3 text-rose-500 animate-bounce" />
            ) : (
              <Calendar className="w-3 h-3 text-slate-400" />
            )}
            {dueDateInfo.text}
          </span>
        </div>
      )}
    </div>
  );
};
