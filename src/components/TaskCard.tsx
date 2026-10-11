import React from 'react';
import type { Task } from '../interfaces/task';
import { PRIORITY_CONFIG } from '../utils/constants';
import { formatDueDate } from '../utils/date';
import { 
  Calendar, 
  Pencil, 
  Trash2, 
  CheckCircle2
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
      className={`group bg-white dark:bg-slate-800/90 border rounded-xl p-3.5 shadow-2xs hover:shadow-md transition-all duration-150 cursor-grab active:cursor-grabbing border-slate-200 dark:border-slate-700/80 hover:border-slate-300 dark:hover:border-slate-600 ${
        isDone ? 'opacity-75' : ''
      }`}
    >
      {/* Priority & Actions */}
      <div className="flex items-center justify-between gap-2 mb-2">
        <span
          className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[11px] font-semibold border ${priority.badge}`}
        >
          <span className={`w-1.5 h-1.5 rounded-full ${priority.dot}`} />
          {priority.label}
        </span>

        <div className="flex items-center gap-0.5 opacity-40 group-hover:opacity-100 transition-opacity">
          {/* Quick complete */}
          <button
            onClick={() => onToggleDone(task)}
            title={isDone ? 'Mark as incomplete' : 'Mark as completed'}
            className={`p-1 rounded-md transition-colors ${
              isDone 
                ? 'text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/40' 
                : 'text-slate-400 hover:text-emerald-600 hover:bg-slate-100 dark:hover:bg-slate-700'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
          </button>

          {/* Edit */}
          <button
            onClick={() => onEdit(task)}
            title="Edit task"
            className="p-1 rounded-md text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
          >
            <Pencil className="w-3.5 h-3.5" />
          </button>

          {/* Delete */}
          <button
            onClick={() => onDelete(task)}
            title="Delete task"
            className="p-1 rounded-md text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Title */}
      <h3
        className={`text-sm font-medium text-slate-900 dark:text-slate-100 mb-1 leading-snug line-clamp-2 ${
          isDone ? 'line-through text-slate-400 dark:text-slate-500' : ''
        }`}
      >
        {task.title}
      </h3>

      {/* Description */}
      {task.description && (
        <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mb-2.5 leading-relaxed">
          {task.description}
        </p>
      )}

      {/* Tags & Due Date Footer */}
      <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-100 dark:border-slate-700/60 text-[11px]">
        {/* Tags */}
        <div className="flex flex-wrap gap-1">
          {task.tags && task.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-700/60 text-slate-600 dark:text-slate-300"
            >
              {tag}
            </span>
          ))}
          {task.tags && task.tags.length > 2 && (
            <span className="text-[10px] text-slate-400">+{task.tags.length - 2}</span>
          )}
        </div>

        {/* Due Date */}
        {task.dueDate && (
          <span
            className={`inline-flex items-center gap-1 font-medium ${
              dueDateInfo.isOverdue
                ? 'text-rose-600 dark:text-rose-400 font-semibold'
                : dueDateInfo.isToday
                ? 'text-amber-600 dark:text-amber-400 font-semibold'
                : 'text-slate-500 dark:text-slate-400'
            }`}
          >
            <Calendar className="w-3 h-3 text-slate-400" />
            {dueDateInfo.text}
          </span>
        )}
      </div>
    </div>
  );
};
