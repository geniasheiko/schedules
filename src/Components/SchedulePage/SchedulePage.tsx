import { useMemo } from "react";
import { days } from "../../constatns/days";
import { DaySchedule } from "../DaySchedule/DaySchedule";
import styles from "./SchedulePage.module.css";
import {
  useBookSlotMutation,
  useDeleteSlotMutation,
  useGetSchedulesQuery,
} from "../../store/scheduleApi";
import { DateOfDate } from "../DateOfDay/DateOfDay";
import { WeekToggleButton } from "../Buttons/WeekToggleButton/WeekToggleButton";
import { useSchedulesRealtime } from "../../utils/realtime/realtime";
import { useWeekToggle } from "../../utils/hooks/useWeekToggle";
import { getWeekDates } from "../../features/manageWeeks/getWeekDates";
import { toast } from "react-toastify";

export const SchedulePage = () => {
  const { data: schedules = [], isLoading, refetch } = useGetSchedulesQuery();

  // hook for automatic data update on the page
  useSchedulesRealtime(refetch);

  const [bookSlot] = useBookSlotMutation();
  const [deleteSlot] = useDeleteSlotMutation();

  const {
    uniqueWeekStarts,
    selectedWeek,
    // setSelectedWeek,
    handleToggleWeek,
  } = useWeekToggle(schedules);

  const currentWeekSlots = useMemo(() => {
    return schedules.filter((s) => s.week_start === selectedWeek);
  }, [schedules, selectedWeek]);

  const weekDates = selectedWeek ? getWeekDates(selectedWeek) : [];

  // функции с toast
  const handleBook = async (slotId: string, name: string) => {
    try {
      await bookSlot({ id: slotId, name }).unwrap();
      toast.success("Запис успішно додано!");
    } catch (error) {
      toast.error("Помилка при додаванні запису");
    }
  };

  const handleDelete = async (slotId: string) => {
    try {
      await deleteSlot({ id: slotId }).unwrap();
      toast.success("Запис успішно видалено!");
    } catch (error) {
      toast.error("Помилка при видаленні запису");
    }
  };

  return (
    <div className={styles.centerWrapper}>
      <div className={styles.header}>
        <WeekToggleButton
          uniqueWeekStarts={uniqueWeekStarts}
          selectedWeek={selectedWeek}
          onToggle={handleToggleWeek}
        />
        <DateOfDate selectedWeek={selectedWeek} />
      </div>

      <div className={styles.wrapper}>
        {days.map((day, i) => (
          <DaySchedule
            key={day}
            dayName={day}
            dayDate={weekDates[i]}
            slots={currentWeekSlots.filter((s) => s.day_of_week === day)}
            onBook={handleBook}
            onDelete={handleDelete}
            // onBook={(slotId, name) => bookSlot({ id: slotId, name })}
            // onDelete={(slotId) => deleteSlot({ id: slotId })}
            loading={isLoading}
          />
        ))}
      </div>
    </div>
  );
};
