import { days } from "../../constatns/days";
import type { ScheduleSlot } from "../../types/schedule";
import { DaySchedule } from "../DaySchedule/DaySchedule";
import styles from "./WeeklySchedule.module.css";

type Props = {
  schedules: ScheduleSlot[];
  weekDates: string[];
  onBook: (slotId: string, name: string) => void;
  onDelete: (slotId: string) => void;
  loading: boolean;
};

export const SchedulePage = ({
  schedules,
  weekDates,
  onBook,
  onDelete,
  loading,
}: Props) => {
  return (
    <div className={styles.wrapper}>
      {days.map((day, i) => (
        <DaySchedule
          key={day}
          dayName={day}
          dayDate={weekDates[i]}
          slots={schedules.filter((s) => s.day_of_week === day)}
          onBook={onBook}
          onDelete={onDelete}
          loading={loading}
        />
      ))}
    </div>
  );
};
