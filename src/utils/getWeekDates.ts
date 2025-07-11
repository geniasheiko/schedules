   
   // Array of dates for the selected week, used to display the date of each day
export const getWeekDates = (weekStart: string): string[] => {
  const start = new Date(weekStart);
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    return d.toISOString().slice(0, 10);
  });
}