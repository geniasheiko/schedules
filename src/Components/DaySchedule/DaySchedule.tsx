import styles from "./DaySchedule.module.css";
import { ActionButton } from "../Buttons/ActionButton/ActionButton";
import type { ScheduleSlot } from "../../types/schedule";
import { scheduleTimes } from "../../constatns/scheduleTimes";
import { useDayScheduleHandlers } from "./useDayScheduleHandlers";

type DayScheduleProps = {
  dayName: string;
  dayDate: string;
  slots: ScheduleSlot[];
  onBook: (slotId: string, name: string) => void;
  onDelete: (slotId: string) => void;
  loading: boolean;
}


export const DaySchedule = ({ dayName, dayDate, slots, onBook, onDelete, loading }: DayScheduleProps) => {

  const { inputs, handleInputChange, handleBook, handleDelete } = useDayScheduleHandlers(onBook, onDelete, loading);
  //Группировка слотов по локации - времени
  const groupedByLocation: Record<string, Record<string, ScheduleSlot[]>> = {}

  const dayLocations = scheduleTimes[dayName] || {};

  for (const slot of slots) {
    if (!groupedByLocation[slot.location]) groupedByLocation[slot.location] = {}
    if (!groupedByLocation[slot.location][slot.slot_time]) {
      groupedByLocation[slot.location][slot.slot_time] = []
    }
    groupedByLocation[slot.location][slot.slot_time].push(slot)
  }

  return (
    <div className={styles.daySchedule}>
      <h2>{dayName}
        {dayDate && (
          <span style={{ marginLeft: 8, fontWeight: 400, fontSize: "1rem" }}>
            ({new Date(dayDate).toLocaleDateString("uk-UA", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })})
          </span>
        )}
      </h2>
      {Object.entries(dayLocations).map(([location, times]) => {
        const timesForLocation = times; // массив времени по локации из расписания

        return (
          <div key={location} className={styles.locationBlock}>
            <h3>{location}</h3>
            {timesForLocation.map((time) => {
              const slotsAtTime = groupedByLocation[location]?.[time] || [];
              const key = `${location}_${time}`;

              return (
                <div key={key} className={styles.timeRow}>
                  <div className={styles.timeCell}>{time}</div>
                  {[0, 1].map((i) => {
                    const current = slotsAtTime[i];

                    return current && current.is_booked ? (
                      <div key={i} className={styles.slotCell}>
                        <input
                          readOnly
                          value={current.booked_person_name ?? "-"}
                          className={styles.readonlyInput}
                        />
                        {localStorage.getItem(current.id) === current.booked_person_name && (
                          <ActionButton
                            label="Видалити"
                            onClick={() => handleDelete(current.id)}
                            disabled={loading}
                            color="primary"
                          />
                        )}
                      </div>
                    ) : (
                      <div key={i} className={styles.slotCell}>
                        <input
                          type="text"
                          placeholder="Ім'я"
                          value={inputs[key]?.[i] || ""}
                          onChange={(e) => handleInputChange(key, i, e.target.value)}
                          disabled={loading}
                          className={styles.input}
                        />
                        <ActionButton
                          label="Записатись"
                          onClick={() => handleBook(key, slotsAtTime, i)}
                          disabled={loading}
                          color="danger"
                        />
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

