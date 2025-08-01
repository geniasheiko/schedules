
export const getNextWeekStart = (currentWeekStart: string): string => {
  const current = new Date(currentWeekStart);
  current.setDate(current.getDate() + 7); // прибавляем 7 дней
  return current.toISOString().split("T")[0]; // формат YYYY-MM-DD
};
