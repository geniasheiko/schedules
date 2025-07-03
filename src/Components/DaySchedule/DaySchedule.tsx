import { useState } from "react"
import styles from "./DaySchedule.module.css";
import { ActionButton } from "../ActionButton/ActionButton";
import type { ScheduleSlot } from "../../types/schedule";

type DayScheduleProps = {
  dayName: string;
  dayDate: string;
  slots: ScheduleSlot[];
  onBook: (slotId: string, name: string) => void;
  onDelete: (slotId: string) => void;
  loading: boolean;
}

const scheduleTimes:Record<string, Record<string, string[]>> =  {
   Понеділок: {
    "Стебницьке кільце": ["09:30", "12:00", "13:00", "14:00", "15:00", "16:00"],
  },
  Вівторок: {
    "Європа": ["11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"],
  },
  Середа: {
    "Рукавічка": ["11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"],
    "Стебницьке кільце": ["11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"],
  },
  Четвер: {
   "Парк": ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"],
  },
  Пятниця: {
   "Стебницьке кільце": ["12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"],
  },
  Субота: {
    "Рукавічка": ["11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"],
    "Європа": ["11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"],
  },
  Неділя: {
   "Злата": ["13:00", "14:00", "15:00", "16:00", "17:00"],
  },
}

export const DaySchedule: React.FC<DayScheduleProps> = ({ dayName, dayDate, slots, onBook, onDelete, loading }) => {
  //для записи
  const [inputs, setInputs] = useState<Record<string, string[]>>({})

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
  
  //Изменение импута
  const handleInputChange = (key: string, index: number, value: string) => {
    setInputs((prev) => ({
      ...prev,
      [key]: prev[key]
        ? prev[key].map((v, i) => (i === index ? value : v))
        : [index === 0 ? value : "", index === 1 ? value : ""],
    }));
  };
  // Бронирование слота
  const handleBook = (key: string, slots: ScheduleSlot[], index: number) => {
    const name = inputs[key]?.[index]?.trim();
    console.log("Hello!")
    if (!name) return;
   const candidates = slots.filter((s) => !s.is_booked)
    if (candidates.length === 0) return
    const slotToBook = candidates[index] || candidates[0]
    onBook(slotToBook.id, name)

    setInputs((prev) => ({
      ...prev,
      [key]: prev[key].map((v, i) => (i === index ? "" : v)),
    }))
  }


  // Удаление бронирования
  const handleDelete = (slotId: string) => {
    onDelete(slotId);
  };


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
                      <ActionButton
                        label="Видалити"
                        onClick={() => handleDelete(current.id)}
                        disabled={loading}
                        color="primary"
                      />
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
      {/* {timeSlots.map((time) => (
        <div
          key={time} className={styles.timeRow}>
          <div className={styles.timeCell}>{time}</div>
          {[0, 1].map((i) => {
            const current = grouped[time]?.[i];
            return current && current.is_booked ? (
              <div key={i} className={styles.slotCell}>
                <input
                  readOnly
                  value={current.booked_person_name ?? "-"}
                  className={styles.readonlyInput}
                /> */}
//                 <ActionButton label="Видалити"
//                   onClick={() => handleDelete(current.id)}
//                   disabled={loading}
//                   color="primary" />
//               </div>
//             ) : (
//               <div
//                 key={i}
//                 className={styles.slotCell}>
//                 <input
//                   type="text"
//                   placeholder="Им`я"
//                   value={inputs[time]?.[i] || ""}
//                   onChange={(e) =>
//                     handleInputChange(time, i, e.target.value)
//                   }
//                   style={{ flex: 1 }}
//                   disabled={loading}
//                 />
//                 <ActionButton label="Записатись"
//                   onClick={() =>handleBook(key, slotsAtTime, i)}
//                   disabled={loading}
//                   color="danger" />
//               </div>
//               )
//                   })}
//                 </div>
//               )
//             })}
//         </div>
//       ))}
//     </div>
//   )
// }