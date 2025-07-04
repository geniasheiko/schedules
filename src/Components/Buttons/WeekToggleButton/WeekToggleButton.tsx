import styles from "./WeekToggleButton.module.css";

type WeekToggleButtonProps = {
     uniqueWeekStarts: string[];
  selectedWeek: string | null;
  onToggle: () => void;
}

export const WeekToggleButton = ({uniqueWeekStarts, selectedWeek, onToggle}:WeekToggleButtonProps) => {
 if (uniqueWeekStarts.length < 2) return null;
   return (
    <button onClick={onToggle} className={styles.toggleButton}>
      {selectedWeek === uniqueWeekStarts[0]
        ? "Наступний тиждень"
        : "Поточний тиждень"}
    </button>
  );
}