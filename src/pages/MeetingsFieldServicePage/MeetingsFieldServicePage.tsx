import { useGetMeetingsFieldsServiceQuery } from "../../store/MeetingsFieldsServiceApi";
import styles from "./MeetingsFieldServicePage.module.css";
// import { useServiceOverseerSchedule } from "../../utils/hooks/useServiceOverseerSchedule";

export const MeetingsFieldServicePage = () => {
  // const { schedule, loading, error } = useServiceOverseerSchedule();
  const {
    data: schedule = [],
    isLoading,
    error,
  } = useGetMeetingsFieldsServiceQuery();
  if (isLoading) return <p>Загрузка...</p>;
  if (error) return <p>Ошибка: {(error as any).message}</p>;

  return (
    <div className={styles.container}>
      <header className={styles.headerTitle}>
        <h1 className={styles.title}>ЗБІР "ТРУСКАВЕЦЬ"</h1>
        <h2 className={styles.subtitle}>Зустрічі для служіння</h2>
      </header>
      <ul className={styles.list}>
        {schedule.map((item: any) => (
          <li key={item.id}>
            <div>
              <span>{item.date}</span>
              <span>{item.time?.slice(0, 5)}</span>
              <span>({item.day_of_week}) — </span>
              <span>{item.adres},</span>
              <span>{item.speaker}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
