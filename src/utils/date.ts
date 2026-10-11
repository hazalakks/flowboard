export function formatDueDate(dateStr?: string): { text: string; isOverdue: boolean; isToday: boolean } {
  if (!dateStr) {
    return { text: '', isOverdue: false, isToday: false };
  }

  const targetDate = new Date(dateStr);
  const now = new Date();
  
  // Set both to midnight for day comparison
  const targetMidnight = new Date(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate());
  const nowMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  const diffTime = targetMidnight.getTime() - nowMidnight.getTime();
  const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

  const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short' };
  const formatted = targetMidnight.toLocaleDateString('tr-TR', options);

  if (diffDays < 0) {
    return { text: `${formatted} (Gecikti)`, isOverdue: true, isToday: false };
  } else if (diffDays === 0) {
    return { text: 'Bugün', isOverdue: false, isToday: true };
  } else if (diffDays === 1) {
    return { text: 'Yarın', isOverdue: false, isToday: false };
  } else {
    return { text: formatted, isOverdue: false, isToday: false };
  }
}
