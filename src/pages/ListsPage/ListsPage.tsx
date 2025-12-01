import styles from "./ListsPage.module.css";

export const ListsPage = () => {
    return (
    <div className={styles.container}>
        <div className={styles.wrapper}>
            <header className={styles.headerTitle}>
                <h1 className={styles.title}>Списки</h1>
            </header>
                <h3 className={styles.subtitle}>Список вісників, схвалених для служіння без стенду</h3>
                <h3 className={styles.subtitle}>Список по групах</h3>
                <h3 className={styles.subtitle}>Піонери</h3>
                <a className={styles.schedulesLink} target="_blank" href="https://drive.google.com/file/d/1SuLn3RAM2fepv3Soldyb0MwhR5Il1_dG/view">Відкрити файл з усіма списками</a>
                {/* <div className={styles.iframeContainer}>
                    <iframe src="https://docs.google.com/spreadsheets/d/e/2PACX-1vTjFaAVPtpFcupjHQ9Z00YuydqAFBUmqvYIKPi2xCIt20Je4ecwBmCKJ7We35inZrol4efN6r31dK8B/pubhtml?gid=606116683&amp;single=true&amp;widget=true&amp;headers=false"
                        width="100%"
                        height="1200"
                        frameBorder="0"
                    ></iframe>
                </div> */}
            <div className={styles.temp}>
                <h2 className={styles.subtitle}>Список по групах</h2>
                <h2 className={styles.subtitle}>Список вісників, схвалених для служіння зі стендом</h2>
            </div>
        </div>
    </div>
    )
}