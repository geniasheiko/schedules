import { useEffect, useMemo, useState } from "react";
import type { ScheduleSlot } from "../../types/schedule";

export const useWeekToggle = (schedules: ScheduleSlot[]) => {
 const uniqueWeekStarts = useMemo(() => {
    const sorted = Array.from(
      new Set(schedules.map((s) => s.week_start))
    ).sort();
    return sorted;
  }, [schedules]);

  const [selectedWeek, setSelectedWeek] = useState<string | null>(
    uniqueWeekStarts[0] || null
  );

useEffect(() => {
  if(!selectedWeek && uniqueWeekStarts.length > 0) {
    setSelectedWeek(uniqueWeekStarts[0]);
  }
},[uniqueWeekStarts, selectedWeek])

 const handleToggleWeek = () => {
    if (uniqueWeekStarts.length < 2) return;
    const currentIndex = uniqueWeekStarts.indexOf(selectedWeek ?? "");
    const nextIndex = currentIndex === 0 ? 1 : 0;// Если сейчас текущая неделя (первая), переключаем на следующую (вторая)
     setSelectedWeek(uniqueWeekStarts[nextIndex]);  // Если сейчас следующая неделя (вторая), переключаем на текущую (первая)
    };

    return {uniqueWeekStarts, selectedWeek, setSelectedWeek, handleToggleWeek}
}