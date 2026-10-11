import React, { useState } from 'react';
import type { ColumnDef } from '../interfaces/column';
import type { Task, TaskStatus } from '../interfaces/task';
import { TaskCard } from './TaskCard';
import { Plus } from 'lucide-react';

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
    if (!isDragOver) setIsDragOver(true);
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
      className={`flex flex-col bg-slate-100/80 dark:bg-slate-900/50 rounded-2xl p-3 border transition-colors duration-150 min-h-[460px] ${
        isDragOver
          ? 'border-indigo-500 ring-2 ring-indigo-500/20 bg-indigo-50/50 dark:bg-indigo-950/20'
          : 'border-slate-200/90 dark:border-slate-800'
      }`}
    >
      {/* Column Header */}
      <div className="flex items-center justify-between pb-2.5 px-1 border-b border-slate-200/70 dark:border-slate-800 mb-3">
        <div className="flex items-center gap-2">
          <span className={`w-2.5 h-2.5 rounded-full ${column.dotColor}`} />
          <h2 className="text-sm font-semibold text-slate-800 dark:text-slate-100">
            {column.title}
          </h2>
          <span
            className={`text-xs font-semibold px-2 py-0.5 rounded-full ${column.badgeBg} ${column.badgeText}`}
          >
            {tasks.length}
          </span>
        </div>

        <button
          onClick={() => onAddTask(column.id)}
          title={`Add task to ${column.title}`}
          className="p-1 rounded-md text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {/* Task List */}
      <div className="flex-1 flex flex-col gap-2.5 overflow-y-auto">
        {tasks.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center border border-dashed border-slate-300/80 dark:border-slate-800 rounded-xl my-1">
            <p className="text-xs text-slate-400 dark:text-slate-500">
              No tasks here
            </p>
            <button
              onClick={() => onAddTask(column.id)}
              className="mt-1.5 text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              + Add a task
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

      {/* Add Task Button at bottom */}
      <button
        onClick={() => onAddTask(column.id)}
        className="mt-2.5 flex items-center justify-center gap-1.5 w-full py-1.5 text-xs font-medium text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-white dark:hover:bg-slate-800 rounded-lg border border-transparent hover:border-slate-200 dark:hover:border-slate-700 transition-all shadow-2xs"
      >
        <Plus className="w-3.5 h-3.5" />
        <span>Add Task</span>
      </button>
    </div>
  );
};
