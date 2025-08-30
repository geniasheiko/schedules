import styles from "./MeetingsFieldServicePage.module.css";
import { useServiceOverseerSchedule } from "../../utils/hooks/useServiceOverseerSchedule";

export const MeetingsFieldServicePage = () => {
  const { schedule, loading, error } = useServiceOverseerSchedule();
  if (loading) return <p>Загрузка...</p>;
  if (error) return <p>Ошибка: {error.message}</p>;

  return (
    <div className={styles.container}>
      <header className={styles.headerTitle}>
        <h1 className={styles.title}>ЗБІР "ТРУСКАВЕЦЬ"</h1>
        <h2 className={styles.subtitle}>Зустрічі для служіння</h2>
      </header>
      <ul className={styles.list}>
        {schedule.map((item: any) => (
          <li key={item.id}>
            {item.date} ({item.day_of_week}) — {item.adres}, {item.speaker}
          </li>
        ))}
      </ul>
    </div>
  );
};
