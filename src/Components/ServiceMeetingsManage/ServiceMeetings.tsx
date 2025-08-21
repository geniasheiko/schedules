import { useState } from "react";
import { useManageServiceOverseerSchedule } from "../../utils/hooks/useManageServiceOverseerSchedule";
import { toast } from "react-toastify";
import { UniversalButton } from "../Buttons/UniversalButton/UniversalButton";
import { useServiceOverseerSchedule } from "../../utils/hooks/useServiceOverseerSchedule";

export const ServiceMeetings = () => {
  const { addEntry, deleteEntry } = useManageServiceOverseerSchedule();
  const { schedule, loading, error } = useServiceOverseerSchedule();

  const [formData, setFormData] = useState({
    date: "",
    day_of_week: "",
    adres: "",
    speaker: "",
  });

  const handleAdd = async () => {
    const success = await addEntry(formData);
    if (success) {
      toast.success("Запись успешно добавлена!");
      setFormData({ date: "", day_of_week: "", adres: "", speaker: "" });
    } else {
      toast.error("Ошибка при добавлении записи");
    }
  };

  const handleDelete = async (id: string) => {
    const success = await deleteEntry(id);
    if (success) {
      toast.success("Запись удалена!");
    } else {
      toast.error("Ошибка при удалении записи");
    }
  };
  return (
    <div>
      {loading && <p>Загрузка...</p>}
      {error && <p>Ошибка: {error.message}</p>}

      <ul>
        {schedule.map((item) => (
          <li key={item.id}>
            {item.date} ({item.day_of_week}) — {item.adres}, {item.speaker}
            <UniversalButton onClick={() => handleDelete(item.id)}>
              Удалить
            </UniversalButton>
          </li>
        ))}
      </ul>

      <div>
        <input
          placeholder="Дата"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
        />
        <input
          placeholder="День тижня"
          value={formData.day_of_week}
          onChange={(e) =>
            setFormData({ ...formData, day_of_week: e.target.value })
          }
        />
        <input
          placeholder="Адреса"
          value={formData.adres}
          onChange={(e) => setFormData({ ...formData, adres: e.target.value })}
        />
        <input
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
