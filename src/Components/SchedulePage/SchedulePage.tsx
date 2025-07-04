import { useMemo } from "react";
import { days } from "../../constatns/days";
import { DaySchedule } from "../DaySchedule/DaySchedule";
import styles from "./SchedulePage.module.css";
import { useBookSlotMutation, useDeleteSlotMutation, useGetSchedulesQuery} from "../../store/scheduleApi";
import { DateOfDate } from "../DateOfDay/DateOfDay";
import { WeekToggleButton } from "../Buttons/WeekToggleButton/WeekToggleButton";
import { getWeekDates } from "../../features/getWeekDates";
import { useWeekToggle } from "../../utils/hooks/useWeekToggle";
import { useSchedulesRealtime } from "../../utils/realtime/realtime";

export const SchedulePage = () => {

  //хук для автоматического обновления данных на страницы
  useSchedulesRealtime();

  const { data: schedules = [], isLoading } = useGetSchedulesQuery();
  const [bookSlot] = useBookSlotMutation();
  const [deleteSlot] = useDeleteSlotMutation();

  const {
    uniqueWeekStarts, 
    selectedWeek, 
    // setSelectedWeek, 
    handleToggleWeek
  } = useWeekToggle(schedules)


  const currentWeekSlots = useMemo(() => {
    return schedules.filter((s) => s.week_start === selectedWeek);
  }, [schedules, selectedWeek]);

 

const weekDates = selectedWeek ? getWeekDates(selectedWeek) : [];

  return (
    <div className={styles.centerWrapper}>
       <div className={styles.header}>
     <WeekToggleButton
        uniqueWeekStarts={uniqueWeekStarts}
        selectedWeek={selectedWeek}
        onToggle={handleToggleWeek}
      />
      <DateOfDate selectedWeek={selectedWeek}/>
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
