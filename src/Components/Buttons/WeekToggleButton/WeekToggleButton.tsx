import styles from "./WeekToggleButton.module.css";

type WeekToggleButtonProps = {
  uniqueWeekStarts: string[];
  selectedWeek: string | null;
  onToggle: () => void;
}

export const WeekToggleButton = ({ uniqueWeekStarts, selectedWeek, onToggle }: WeekToggleButtonProps) => {
  if (uniqueWeekStarts.length < 2) return null;

  const isNext =
    selectedWeek === uniqueWeekStarts[0];

  return (
    <button onClick={onToggle} className={styles.toggleButton}>
      {isNext ? (
        <>
          Наступний тиждень
          <span className={`${styles.arrow} ${styles.arrowForward}`}></span>
        </>
      ) : (
        <>
          <span className={`${styles.arrow} ${styles.arrowBack}`}></span>
          Поточний тиждень
        </>
      )}
    </button>
  );
}

// <button onClick={onToggle} className={styles.toggleButton}>
//     {selectedWeek === uniqueWeekStarts[0]
//       ? "Наступний тиждень"
//       : "Поточний тиждень"}
//   </button>