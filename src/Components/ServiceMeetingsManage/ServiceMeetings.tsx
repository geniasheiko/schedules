import { useState } from "react";
import { toast } from "react-toastify";
import { UniversalButton } from "../Buttons/UniversalButton/UniversalButton";
import styles from "./ServiceMeetings.module.css";
import {
  useAddEntryMutation,
  useDeleteEntryMutation,
  useGetMeetingsFieldsServiceQuery,
} from "@/store/MeetingsFieldsServiceApi";

export const ServiceMeetings = () => {
  const { data: schedule = [], isLoading } = useGetMeetingsFieldsServiceQuery();
  const [addEntry] = useAddEntryMutation();
  const [deleteEntry] = useDeleteEntryMutation();

  const [formData, setFormData] = useState({
    date: "",
    time: "",
    day_of_week: "",
    adres: "",
    speaker: "",
  });

  const handleAdd = async () => {
    try {
      const result = await addEntry(formData).unwrap();
      toast.success("Запись успешно добавлена!");
      console.log("✅ Result:", result);
      setFormData({
        date: "",
        time: "",
        day_of_week: "",
        adres: "",
        speaker: "",
      });
    } catch {
      toast.error("Ошибка при добавлении записи");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteEntry(id).unwrap();
      toast.success("Запись удалена!");
    } catch {
      toast.error("Ошибка при удалении записи");
    }
  };

  return (
    <div className={styles.meetingsContainer}>
      <h3>Зустрічі для служіння</h3>
      <div className={styles.listSection}>
        {isLoading && <p>Загрузка...</p>}
        {/* {error && <p>Ошибка: {error.message}</p>} */}
        <ul>
          {schedule.map((item) => (
            <li key={item.id} className={styles.scheduleItem}>
              <div>
                <span>{item.date}</span>
                <span>{item.time}</span>
                <span>({item.day_of_week}) - </span>
                <span>{item.adres}, </span>
                <span>{item.speaker}</span>
              </div>
              <div className={styles.itemButtons}>
                <UniversalButton onClick={() => handleDelete(item.id)}>
                  Удалить
                </UniversalButton>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.inputGroup}>
        <input
          className={styles.inputField}
          placeholder="Дата"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
        />
        <input
          className={styles.inputField}
          placeholder="Час"
          value={formData.time}
          onChange={(e) => setFormData({ ...formData, time: e.target.value })}
        />
        <input
          className={styles.inputField}
          placeholder="День тижня"
          value={formData.day_of_week}
          onChange={(e) =>
            setFormData({ ...formData, day_of_week: e.target.value })
          }
        />
        <input
          className={styles.inputField}
          placeholder="Адреса"
          value={formData.adres}
          onChange={(e) => setFormData({ ...formData, adres: e.target.value })}
        />
        <input
          className={styles.inputField}
          placeholder="Відповідальний"
          value={formData.speaker}
          onChange={(e) =>
            setFormData({ ...formData, speaker: e.target.value })
          }
        />
        <UniversalButton onClick={handleAdd}>Добавить</UniversalButton>
      </div>
    </div>
  );
};
