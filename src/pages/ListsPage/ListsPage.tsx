import styles from "./ListsPage.module.css";

export const ListsPage = () => {
    return (
    <div className={styles.container}>
        <header className={styles.headerTitle}>
            <h1 className={styles.title}>ЗБІР "ТРУСКАВЕЦЬ"</h1>
        </header>
        <div className={styles.container}>
            <div className={styles.iframeContainer}>
                <iframe src="https://docs.google.com/spreadsheets/d/e/2PACX-1vTjFaAVPtpFcupjHQ9Z00YuydqAFBUmqvYIKPi2xCIt20Je4ecwBmCKJ7We35inZrol4efN6r31dK8B/pubhtml?gid=606116683&amp;single=true&amp;widget=true&amp;headers=false"
                    width="100%"
                    height="1200"
                    frameBorder="0"
                ></iframe>
            </div>
        </div>
        <div className={styles.temp}>
            <h2 className={styles.subtitle}>Список по групах</h2>
            <h2 className={styles.subtitle}>Список вісників, схвалених для служіння зі стендом</h2>
        </div>
    </div>
    )
}