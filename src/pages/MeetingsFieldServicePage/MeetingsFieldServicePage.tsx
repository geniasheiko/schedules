import { useState } from "react";
import styles from "./MeetingsFieldServicePage.module.css";
import { toast } from "react-toastify";
import { useManageServiceOverseerSchedule } from "../../utils/hooks/useManageServiceOverseerSchedule";
import { useServiceOverseerSchedule } from "../../utils/hooks/useServiceOverseerSchedule";
import { UniversalButton } from "../../Components/Buttons/UniversalButton/UniversalButton";

// export const MeetingsFieldServicePage = ({isAdmin}: {isAdmin:boolean}) => {
export const MeetingsFieldServicePage = () => {
  const { schedule, loading, error } = useServiceOverseerSchedule();
  // const { addEntry, deleteEntry } = useManageServiceOverseerSchedule();

  // const [formData, setFormData] = useState({
  //     date: "",
  //     day_of_week:"",
  //     adres: "",
  //     speaker: ""
  // });
  if (loading) return <p>Загрузка...</p>;
  if (error) return <p>Ошибка: {error.message}</p>;

  // const handleAdd = async() => {
  // const success = await addEntry(formData);
  //     if (success) {
  //       toast.success("Запись успешно добавлена!");
  //     } else {
  //       toast.error("Ошибка при добавлении записи");
  //     }
  // }

  // const handleDelete = async(id:string) => {
  //   console.log("!")
  //   const success = await deleteEntry(id);
  //   if(success) {
  //     toast.success("Запись успешно видадлена!");

  //   } else {
  //       toast.error("Ошибка при видаленні записи");
  //     }
  // }

  // if (loading) return <p>Загрузка...</p>;              //??
  // if (error) return <p>Ошибка: {error.message}</p>;    //??

  return (
    <div className={styles.container}>
      <header className={styles.headerTitle}>
        <h1 className={styles.title}>ЗБІР "ТРУСКАВЕЦЬ"</h1>
        <h2 className={styles.subtitle}>Зустрічі для служіння</h2>
      </header>
      <ul>
        {schedule.map((item: any) => (
          <li key={item.id}>
            {item.date} ({item.day_of_week}) — {item.adres}, {item.speaker}
            {/* {isAdmin && (
        <UniversalButton onClick={() => handleDelete(item.id)}>Удалить</UniversalButton>
      )} */}
          </li>
        ))}
      </ul>

      {/* {isAdmin && (
        <div>
            <input
            placeholder="Дата"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          />
          <input
            placeholder="День тижня"
            value={formData.day_of_week}
            onChange={(e) => setFormData({ ...formData, day_of_week: e.target.value })}
          />
          <input
            placeholder="Адреса"
            value={formData.adres}
            onChange={(e) => setFormData({ ...formData, adres: e.target.value })}
          />
          <input
            placeholder="Відповідальний"
            value={formData.speaker}
            onChange={(e) => setFormData({ ...formData, speaker: e.target.value })}
          />
          <div>
             <UniversalButton onClick={handleAdd}>Додати</UniversalButton>
          </div>
         
        </div>
      )} */}
    </div>
  );
};
