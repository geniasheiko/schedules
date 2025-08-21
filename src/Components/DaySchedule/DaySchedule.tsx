import styles from "./DaySchedule.module.css";
import type { ScheduleSlot } from "../../types/schedule";
import { scheduleTimes } from "../../constatns/scheduleTimes";
import { useDayScheduleHandlers } from "./useDayScheduleHandlers";
import { UniversalButton } from "../Buttons/UniversalButton/UniversalButton";

type DayScheduleProps = {
  dayName: string;
  dayDate: string;
  slots: ScheduleSlot[];
  onBook: (slotId: string, name: string) => void;
  onDelete: (slotId: string) => void;
  loading: boolean;
};

export const DaySchedule = ({
  dayName,
  dayDate,
  slots,
  onBook,
  onDelete,
  loading,
}: DayScheduleProps) => {

  const { inputs, handleInputChange, handleBook, handleDelete } =
    useDayScheduleHandlers(onBook, onDelete, loading);

  // Group slots by location and time
  const groupedByLocation: Record<string, Record<string, ScheduleSlot[]>> = {};
  const dayLocations = scheduleTimes[dayName] || {};

  for (const slot of slots) {
    if (!groupedByLocation[slot.location]) groupedByLocation[slot.location] = {};
    if (!groupedByLocation[slot.location][slot.slot_time]) {
      groupedByLocation[slot.location][slot.slot_time] = [];
    }
    groupedByLocation[slot.location][slot.slot_time].push(slot);
  }

  return (
    <div className={styles.daySchedule}>
      <div className={styles.dateScheduleHeader}>
        <h2>
          {dayName}        
        </h2>
        {dayDate && (
          <span className={styles.dateSchedule}>
            
            {(() => {
              const date = new Date(dayDate);
              const formatted = date.toLocaleDateString("uk-UA", {
                day: "2-digit",
                month: "long",
              }) + ` ${date.getFullYear()}`;
              return formatted;
            })()}
            
          </span>
        )}
      </div>

      {Object.entries(dayLocations).map(([location, times]) => (
        <div key={location} className={styles.locationBlock}>
          <h3>{location}</h3>
          {times.map((time) => {
            const slotsAtTime = (groupedByLocation[location]?.[time] || []).slice().sort((a, b) => a.id.localeCompare(b.id));
            return (
              <div key={`${location}_${time}`} className={styles.timeRow}>
                <div className={styles.timeCell}>{time}</div>
                <div className={styles.slotsCellWrapper}>
                  {slotsAtTime.map((current) =>
                    current.is_booked ? (
                      <div key={current.id} className={styles.slotCell}>
                        <input
                          readOnly
                          value={current.booked_person_name ?? "-"}
                          className={styles.readonlyInput}
                        />                       
                        <UniversalButton
                         label="Видалити"
                          onClick={() => handleDelete(current.id)}
                          disabled={loading}
                          color="primary"
                          type="button"
                        />                     
                      </div>
                    ) : (
                      <div key={current.id} className={styles.slotCell}>
                        <input
                          type="text"
                          value={inputs[current.id] || ""}
                          onChange={(e) => handleInputChange(current.id, e.target.value)}
                          disabled={loading}
                          className={styles.input}
                        />
                        <UniversalButton
                          label="Записатись"
                          onClick={() => handleBook(current.id, current)}
                          disabled={loading}
                          color="danger"
                        />
                      </div>
                    )
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};