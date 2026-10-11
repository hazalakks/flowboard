import React, { useState } from 'react';
import type { ColumnDef } from '../interfaces/column';
import type { Task, TaskStatus } from '../interfaces/task';
import { TaskCard } from './TaskCard';
import { Plus, Inbox } from 'lucide-react';

interface ColumnProps {
  column: ColumnDef;
  tasks: Task[];
  onAddTask: (status: TaskStatus) => void;
  onEditTask: (task: Task) => void;
  onDeleteTask: (task: Task) => void;
  onToggleDone: (task: Task) => void;
  onDropTask: (taskId: string, targetStatus: TaskStatus) => void;
  onDragStartTask: (e: React.DragEvent, taskId: string) => void;
}

export const Column: React.FC<ColumnProps> = ({
  column,
  tasks,
  onAddTask,
  onEditTask,
  onDeleteTask,
  onToggleDone,
  onDropTask,
  onDragStartTask,
}) => {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (!isDragOver) {
      setIsDragOver(true);
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    if (e.currentTarget.contains(e.relatedTarget as Node)) return;
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const taskId = e.dataTransfer.getData('text/plain');
    if (taskId) {
      onDropTask(taskId, column.id);
    }
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`flex flex-col bg-slate-100/70 dark:bg-slate-900/50 rounded-2xl p-3 border transition-all duration-200 min-h-[500px] ${
        isDragOver
          ? 'border-indigo-500 ring-2 ring-indigo-500/20 bg-indigo-50/40 dark:bg-indigo-950/20'
          : 'border-slate-200/80 dark:border-slate-800'
      }`}
    >
      {/* Column Header */}
      <div className="flex items-center justify-between pb-3 px-1 border-b border-slate-200/60 dark:border-slate-800/80 mb-3">
        <div className="flex items-center gap-2">
          <span className={`w-2.5 h-2.5 rounded-full ${column.color.dot}`} />
          <h2 className="text-sm font-bold text-slate-800 dark:text-slate-100 tracking-tight">
            {column.title}
          </h2>
          <span
            className={`text-xs font-semibold px-2 py-0.5 rounded-full ${column.color.bgBadge}`}
          >
            {tasks.length}
          </span>
        </div>

        {/* Quick Add Button */}
        <button
          onClick={() => onAddTask(column.id)}
          title={`${column.title} sütununa görev ekle`}
          className="p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {/* Task List / Drop Zone */}
      <div className="flex-1 flex flex-col gap-2.5 overflow-y-auto pr-0.5 min-h-[120px]">
        {tasks.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl my-2">
            <Inbox className="w-8 h-8 text-slate-300 dark:text-slate-600 mb-1" />
            <p className="text-xs font-medium text-slate-400 dark:text-slate-500">
              Görev bulunmuyor
            </p>
            <button
              onClick={() => onAddTask(column.id)}
              className="mt-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              + Yeni ekle
            </button>
          </div>
        ) : (
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={onEditTask}
              onDelete={onDeleteTask}
              onToggleDone={onToggleDone}
              onDragStart={onDragStartTask}
              onDragEnd={() => setIsDragOver(false)}
            />
          ))
        )}
      </div>

      {/* Column Footer: Quick Add bar */}
      <button
        onClick={() => onAddTask(column.id)}
        className="mt-2.5 flex items-center justify-center gap-1.5 w-full py-2 text-xs font-medium text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-white dark:hover:bg-slate-800/80 rounded-xl border border-transparent hover:border-slate-200 dark:hover:border-slate-700 transition-all shadow-2xs"
      >
        <Plus className="w-3.5 h-3.5" />
        <span>Görev Ekle</span>
      </button>
    </div>
  );
};
