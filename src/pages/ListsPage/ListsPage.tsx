import styles from "./ListsPage.module.css";

export const ListsPage = () => {
    return (
    <div className={styles.container}>
        <header className={styles.headerTitle}>
            <h1 className={styles.title}>ЗБІР "ТРУСКАВЕЦЬ"</h1>
        </header>
        <h2 className={styles.subtitle}>Список по групах</h2>
        <h2 className={styles.subtitle}>Список вісників, схвалених для служіння зі стендом</h2>
        <h2 className={styles.subtitle}>Піонери</h2>
    </div>
    )
}