import { useState, useMemo, useEffect } from "react";
import { days } from "../../constatns/days";
import { DaySchedule } from "../DaySchedule/DaySchedule";
import styles from "./SchedulePage.module.css";
import { useBookSlotMutation, useDeleteSlotMutation, useGetSchedulesQuery} from "../../store/scheduleApi";

export const SchedulePage = () => {
  const { data: schedules = [], isLoading } = useGetSchedulesQuery();
  const [bookSlot] = useBookSlotMutation();
  const [deleteSlot] = useDeleteSlotMutation();

  // Вычисление всех недель
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

  const currentWeekSlots = useMemo(() => {
    return schedules.filter((s) => s.week_start === selectedWeek);
  }, [schedules, selectedWeek]);

  const handleToggleWeek = () => {
    if (uniqueWeekStarts.length < 2) return;
    const currentIndex = uniqueWeekStarts.indexOf(selectedWeek ?? "");
    const nextIndex = currentIndex === 0 ? 1 : 0;// Если сейчас текущая неделя (первая), переключаем на следующую (вторая)
     setSelectedWeek(uniqueWeekStarts[nextIndex]);  // Если сейчас следующая неделя (вторая), переключаем на текущую (первая)
    };

    // Массив дат для выбранной недели, чтобы выводить дату дня
function getWeekDates(weekStart: string): string[] {
  const start = new Date(weekStart);
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    return d.toISOString().slice(0, 10);
  });
}

const weekDates = selectedWeek ? getWeekDates(selectedWeek) : [];

  return (
    <div className={styles.centerWrapper}>
      <div className={styles.header}>
         {uniqueWeekStarts.length > 1 && (
        <button onClick={handleToggleWeek} className={styles.toggleButton}>
         {selectedWeek === uniqueWeekStarts[0]
            ? "Наступний тиждень"
            : "Поточний тиждень"}
        </button>
      )}
      <p>
        Тиждень від:{" "}
  {selectedWeek &&
    new Date(selectedWeek).toLocaleDateString("uk-UA", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })}
      </p>
    </div>

      <div className={styles.wrapper}>
        {days.map((day, i) => (
          <DaySchedule
            key={day}
            dayName={day}
            dayDate={weekDates[i]}
            slots={currentWeekSlots.filter((s) => s.day_of_week === day)}
            onBook={(slotId, name) => bookSlot({ id: slotId, name })}
            onDelete={(slotId) => deleteSlot({ id: slotId })}
            loading={isLoading}
          />
        ))}
      </div>
    </div>
  );
};
