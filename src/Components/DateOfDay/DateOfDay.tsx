import styles from "./DateOfDay.module.css";

type DateOfDayPropsType = {
    selectedWeek: string | null;
}

export const DateOfDate = ({ selectedWeek }: DateOfDayPropsType) => {
    return (
    <>
        <h1 className={styles.headerTitle}>
            <span className={styles.text}>Тиждень від</span>
            <span className={styles.date}>{selectedWeek &&
                new Date(selectedWeek).toLocaleDateString("uk-UA", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                })}
            </span>
        </h1>
    </>
    )
}