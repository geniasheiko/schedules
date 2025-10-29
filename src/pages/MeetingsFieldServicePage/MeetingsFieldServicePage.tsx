import { useGetMeetingsFieldsServiceQuery } from "../../store/MeetingsFieldsServiceApi";
import styles from "./MeetingsFieldServicePage.module.css";

export const MeetingsFieldServicePage = () => {
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
        <li className={styles.listHeader}>
          <span className={`${styles.listDate} ${styles.item}`}>Дата</span>
          <span className={`${styles.listTime} ${styles.item}`}>Час</span>
          <span className={`${styles.listAddress} ${styles.item}`}>Адреса</span>
          <span className={`${styles.listSpeaker} ${styles.item}`}>
            Ведучий
          </span>
        </li>
        {schedule.map((item: any) => (
          <li key={item.id} className={styles.listItem}>
            <span className={`${styles.listDate} ${styles.item}`}>
              {item.date}, {item.day_of_week}
            </span>
            <span className={`${styles.listTime} ${styles.item}`}>
              {item.time?.slice(0, 5)}
            </span>
            <span className={`${styles.listAddress} ${styles.item}`}>
              {item.adres},
            </span>
            <span className={`${styles.listSpeaker} ${styles.item}`}>
              {item.speaker}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};
