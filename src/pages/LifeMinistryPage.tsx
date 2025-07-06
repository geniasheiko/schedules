import styles from "./LifeMinistryPage.module.css";

export const LifeMinistryPage = () => {
    return (
    <div className={styles.container}>
        <h1 className={styles.title}>
            <span>ЗБІР "ТРУСКАВЕЦЬ"</span>
            <span>Розклад зібрань серед тижня</span>
        </h1>
        <div className={styles.weeksContainer}>
            <div className={styles.weeksItem}>
                
            </div>
            <div className={styles.weeksItem}></div>
            <div className={styles.weeksItem}></div>
            <div className={styles.weeksItem}></div>
        </div>
    </div>
    )
}