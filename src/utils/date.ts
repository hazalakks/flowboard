export function formatDueDate(dateStr?: string): { text: string; isOverdue: boolean; isToday: boolean } {
  if (!dateStr) {
    return { text: '', isOverdue: false, isToday: false };
  }

  // Parse "YYYY-MM-DD" as a local date (new Date(str) would treat it as UTC).
  const [y, m, d] = dateStr.split('-').map(Number);
  const targetDate = new Date(y, m - 1, d);
  const now = new Date();
  
  const targetMidnight = new Date(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate());
  const nowMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  const diffTime = targetMidnight.getTime() - nowMidnight.getTime();
  const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

  const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short' };
  const formatted = targetMidnight.toLocaleDateString('en-US', options);

  if (diffDays < 0) {
    return { text: `${formatted} (Overdue)`, isOverdue: true, isToday: false };
  } else if (diffDays === 0) {
    return { text: 'Today', isOverdue: false, isToday: true };
  } else if (diffDays === 1) {
    return { text: 'Tomorrow', isOverdue: false, isToday: false };
  } else {
    return { text: formatted, isOverdue: false, isToday: false };
  }
}
