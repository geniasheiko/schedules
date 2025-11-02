import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { UniversalButton } from "../Buttons/UniversalButton/UniversalButton";
import styles from "./ServiceMeetings.module.css";
import {
  useAddEntryMutation,
  useDeleteEntryMutation,
  useGetMeetingsFieldsServiceQuery,
  useUpdateEntryMutation,
} from "@/store/MeetingsFieldsServiceApi";
import { supabase } from "@/utils/supabase/supabase";

export const ServiceMeetings = () => {
  const { data: schedule = [], isLoading } = useGetMeetingsFieldsServiceQuery();
  const [addEntry] = useAddEntryMutation();
  const [deleteEntry] = useDeleteEntryMutation();
  const [updateEntry] = useUpdateEntryMutation();

  const [formData, setFormData] = useState({
    date: "",
    time: "",
    day_of_week: "",
    adres: "",
    speaker: "",
  });

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState({
    date: "",
    time: "",
    day_of_week: "",
    adres: "",
    speaker: "",
  });

  useEffect(() => {
    const checkConnection = async () => {
      const { data, error } = await supabase
        .from("service_overseer_schedule")
        .select("count");
      console.log("🟢 Ping Supabase", { data, error });
    };

    const interval = setInterval(checkConnection, 30000);
    checkConnection();

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleFocus = async () => {
      console.log("👀 Tab active again, reinitializing Supabase session...");
      const { error } = await supabase
        .from("service_overseer_schedule")
        .select("count");
      if (error) console.warn("⚠️ Supabase reconnect error:", error.message);
    };

    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, []);

  const handleAdd = async () => {
    console.log("🔥 handleAdd clicked", formData);
    try {
      const result = await addEntry(formData).unwrap();
      toast.success("Запис успішно додано!");
      console.log("✅ Result:", result);
      console.log("📋 Schedule:", schedule);
      setFormData({
        date: "",
        time: "",
        day_of_week: "",
        adres: "",
        speaker: "",
      });
    } catch {
      toast.error("Помилка при додаванні запису");
    }
  };

  const handleDelete = async (id: string) => {
    if (!id) {
      console.error("❌ Попытка удаления с пустым ID!");
      return;
    }
    try {
      await deleteEntry(id).unwrap();
      toast.success("Запис видалено!");
    } catch {
      toast.error("Помилка при видаленні запису");
    }
  };

  //для исправления
  const handleEditClick = (item: any) => {
    setEditingId(item.id);
    setEditData({
      date: item.date || "",
      time: item.time.slice(0, 5) || "",
      day_of_week: item.day_of_week || "",
      adres: item.adres || "",
      speaker: item.speaker || "",
    });
  };
  //для сохранения исправления
  const handleSaveEdit = async () => {
    try {
      await updateEntry({ id: editingId!, ...editData }).unwrap();
      toast.success("Запис оновлено!");
      setEditingId(null);
    } catch {
      // console.error("🚨 Полный объект ошибки API:", e);
      toast.error("Помилка при редагуванні запису");
    }
  };

  return (
    <div className={styles.meetingsContainer}>
      <h3>Зустрічі для служіння</h3>
      <div className={styles.listSection}>
        {isLoading && <p>Завантаження...</p>}
        <ul>
          {schedule.map((item) => (
            <li key={item.id} className={styles.scheduleItem}>
              {editingId === item.id ? (
                <div className={styles.inputGroup}>
                  <input
                    className={styles.inputField}
                    value={editData.date}
                    onChange={(e) =>
                      setEditData({ ...editData, date: e.target.value })
                    }
                  />
                  <input
                    className={styles.inputField}
                    value={editData.time}
                    onChange={(e) =>
                      setEditData({ ...editData, time: e.target.value })
                    }
                  />
                  <input
                    className={styles.inputField}
                    value={editData.day_of_week}
                    onChange={(e) =>
                      setEditData({ ...editData, day_of_week: e.target.value })
                    }
                  />
                  <input
                    className={styles.inputField}
                    value={editData.adres}
                    onChange={(e) =>
                      setEditData({ ...editData, adres: e.target.value })
                    }
                  />
                  <input
                    className={styles.inputField}
                    value={editData.speaker}
                    onChange={(e) =>
                      setEditData({ ...editData, speaker: e.target.value })
                    }
                  />
                </div>
              ) : (
                <div>
                  <span>{item.date}</span> <span>{item.time.slice(0, 5)}</span>{" "}
                  <span>{item.day_of_week} - </span>
                  <span>{item.adres}, </span>
                  <span>{item.speaker}</span>
                </div>
              )}
              <div className={styles.buttonGroup}>
                {editingId === item.id ? (
                  <UniversalButton onClick={handleSaveEdit}>
                    Зберегти зміни
                  </UniversalButton>
                ) : (
                  <UniversalButton onClick={() => handleEditClick(item)}>
                    Редагувати
                  </UniversalButton>
                )}

                <UniversalButton onClick={() => handleDelete(item.id)}>
                  Видалити
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
          placeholder="Час(00:00)"
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
        <UniversalButton onClick={handleAdd}>Додати</UniversalButton>
      </div>
    </div>
  );
};
