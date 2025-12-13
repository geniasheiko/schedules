import styles from "./MeetingsPage.module.css";
import treasuresImg from "../../assets/treasures.png";
import applyImg from "../../assets/apply.png";
import livingImg from "../../assets/living.png";
import publicTalkImg from "../../assets/speech.png";
import watchtowerImg from "../../assets/watchtower.png";
import fieldServiceImg from "../../assets/kingdom-ministry.png";
// import servicesImg from "../../assets/services.png";

export const MeetingsPage = () => {
    return (
    <div className={styles.container}>
        <div className={styles.wrapper}>
        <header className={styles.headerTitle}>
            <h1 className={styles.subtitle}>Розклад зібрань</h1>
        </header>
        {/* <div className={styles.container}> */}
        <div>
            <h3 className={styles.lifeMinistryTitle}>Життя і служіння</h3>
            <h3 className={styles.lifeMinistryTitle}>Публічна промова та Вартова башта</h3>
            <a className={styles.schedulesLink} target="_blank" href="https://drive.google.com/file/d/126fQJcGJjwdisXkspjrMFMWro34YRob0/view">Відкрити графік</a>
        </div>
        <div className={styles.temp}>
        <header className={styles.headerTitle}>
            <h1 className={styles.title}>ЗБІР "ТРУСКАВЕЦЬ"</h1>
            <h2 className={styles.subtitle}>Розклад зібрань</h2>
        </header>
        <div className={styles.weeksContainer}>
            <section className={styles.weeksItem}>
                <h2 className={styles.weekTitle}>1—7 вересня 2025</h2>
                <div className={styles.weekContent}>
                    <div className={styles.lifeMinistryWrapper}>
                        <h3 className={styles.lifeMinistryTitle}>Життя і служіння</h3>
                        <div className={styles.lifeMinistryContent}>
                            <div className={styles.topBlock}>
                                <div className={styles.chairman}>
                                    <span className={styles.personRole}>Ведучий, молитва:</span>
                                    <span className={styles.person}>Філатов В.</span>
                                </div>
                                <div className={styles.introductionConclusion}>
                                    <span className={styles.time}>19:00</span>
                                    <span>Пісня і молитва  |  Вступні слова </span>
                                    <span className={styles.introductionConclusionTime}>(1 хв)</span>
                                </div>
                            </div>
                            <div className={styles.treasuresBlock}>
                                <div className={styles.treasuresTitle}>
                                    <img className={styles.treasuresImg} src={treasuresImg} alt="Скарби з Божого Слова" />
                                    <h3 className={styles.treasuresText}>СКАРБИ З БОЖОГО СЛОВА</h3>
                                </div>
                                <ul className={styles.treasuresList}>
                                    <li className={styles.treasuresItem}>
                                        <span className={styles.time}>19:06</span>
                                        <span className={styles.treasuresNumber}>1.</span>
                                        <span className={styles.person}>Бондаренко В.</span>
                                    </li>
                                    <li className={styles.treasuresItem}>
                                        <span className={styles.time}>19:16</span>
                                        <span className={styles.treasuresNumber}>2.</span>
                                        <span className={styles.person}>Мельник Є.</span>
                                    </li>
                                    <li className={styles.treasuresItem}>
                                        <span className={styles.time}>19:26</span>
                                        <span className={styles.treasuresNumber}>3.</span>
                                        <span className={styles.person}>Козлюк Ю.</span>
                                    </li>
                                </ul>
                            </div>
                            <div className={styles.ministryBlock}>
                                <div className={styles.ministryTitle}>
                                    <img className={styles.ministryImg} src={applyImg} alt="Вдосконалюймо своє служіння" />
                                    <h3 className={styles.ministryText}>ВДОСКОНАЛЮЙМО СВОЄ СЛУЖІННЯ</h3>
                                </div>
                                <ul className={styles.ministryList}>
                                    <li className={styles.ministryItem}>
                                        <span className={styles.time}>19:31</span>
                                        <span className={styles.ministryNumber}>4.</span>
                                        <span className={styles.person}>Кобзар Г. / Рихлінська Г.</span>
                                    </li>
                                    <li className={styles.ministryItem}>                                
                                        <span className={styles.time}>19:34</span>
                                        <span className={styles.ministryNumber}>5.</span>
                                        <span className={styles.person}>Липак М. / Рихлінська М.</span>
                                    </li>
                                    <li className={styles.ministryItem}>
                                        <span className={styles.time}>19:38</span>
                                        <span className={styles.ministryNumber}>6.</span>
                                        <span className={styles.person}>Мельник Єв. / Залокоцька О.</span>
                                    </li>
                                    <li className={styles.ministryItem}>
                                        <span className={styles.time}>19:42</span>
                                        <span className={styles.ministryNumber}>7.</span>
                                        <span className={styles.person}>Маяков В.</span>
                                    </li>
                                </ul>
                            </div>
                            <div className={styles.lifeBlock}>
                                <div className={styles.lifeTitle}>
                                    <img className={styles.lifeImg} src={livingImg} alt="Християнське життя" />
                                    <h3 className={styles.lifeText}>ХРИСТИЯНСЬКЕ ЖИТТЯ</h3>
                                </div>
                                <div className={styles.middleBlock}>
                                    <span className={styles.time}>19:46</span><span>Пісня</span>
                                </div>
                                <ul className={styles.lifeList}>
                                    <li className={styles.lifeItem}>
                                        <span className={styles.time}>19:51</span>
                                        <span className={styles.lifeNumber}>8.</span>
                                        <span className={styles.person}>Мельник Є.</span>
                                    </li>
                                    <li className={styles.lifeItem}>
                                        <span className={styles.time}>20:06</span>
                                        <span className={styles.lifeNumber}>9.</span>
                                        <span className={styles.person}>Мураль В. / Паталаха М.</span>
                                    </li>
                                </ul>
                            </div>
                            <div className={styles.bottomBlock}>
                                <div className={styles.introductionConclusion}>Кінцеві слова <span className={styles.introductionConclusionTime}>(3 хв)</span>  |  Пісня і молитва</div>
                                <div className={styles.lastItem}>
                                    <span className={styles.personRole}>Молитва:</span>
                                    <span className={styles.person}>Паталаха М.</span>
                                </div>
                            </div>
                        </div>
                        <footer className={styles.weekFooter}>
                            <div className={`${styles.footerItem} ${styles.service}`}>
                                <h3 className={styles.footerTitle}>ОБСЛУГОВУВАННЯ</h3>
                                <ul className={styles.footerList}>
                                    <li className={styles.footerListItem}>
                                        <span className={styles.personRole}>Мікшер | Сцена:</span>
                                        <span className={styles.person}>Залокоцький Н. | Дзюбанов А.</span>
                                    </li>
                                    <li className={styles.footerListItem}>
                                        <span className={styles.personRole}>Обслуговуючі:</span>
                                        <span className={styles.person}>Паталаха М. | Кондаревич В.</span>
                                    </li>
                                    <li className={styles.footerListItem}>
                                        <span className={styles.personRole}>Мікрофони:</span>
                                        <span className={styles.person}>Сворень Я. | Салань А.</span>
                                    </li>
                                </ul>
                            </div>
                        </footer>
                        <div className={styles.cleaningkWrapper}>
                            <div className={`${styles.footerItem} ${styles.cleaning}`}>
                                <h3 className={styles.footerTitle}>ПРИБИРАННЯ</h3>
                                <div className={styles.footerList}>
                                    <div className={styles.footerListItem}>
                                        <span className={styles.personRole}>Група</span>
                                        <span className={styles.person}>1</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.watchtowerPublicTalkWrapper}>
                        <h3 className={styles.watchtowerPublicTalkTitle}>Публічна промова та Вартова башта</h3>
                        <div className={styles.watchtowerPublicTalkContent}>
                            <div className={styles.publicTalkBlock}>
                                <div className={styles.publicTalkTitle}>
                                    <img className={styles.publicTalkImg} src={publicTalkImg} alt="Публічна промова" />
                                    <h3 className={styles.publicTalkText}>Публічна промова</h3>
                                </div>
                                <div className={styles.topBlock}>
                                    <div className={styles.chairman}>
                                        <span className={styles.personRole}>Ведучий, молитва:</span>
                                        <span className={styles.person}>Філатов В.</span>
                                    </div>
                                    <div className={styles.introductionConclusion}>
                                        <span>Пісня 31</span>
                                    </div>
                                </div>
                                <div className={styles.publicTalkContent}>
                                    <span className={styles.publicTalkTitleText}>«Чому ми віримо в Бога?»</span>
                                    <div className={styles.publicTalkSpeakerWrapper}>
                                        <span className={styles.personRole}>Промовець:</span>
                                        <span className={styles.person}>Паталаха М.</span>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.watchtowerBlock}>
                                <div className={styles.watchtowerTitle}>
                                    <img className={styles.watchtowerImg} src={watchtowerImg} alt="Вартова башта" />
                                    <h3 className={styles.watchtowerText}>Вартова башта</h3>
                                </div>
                                <div className={styles.watchtowerContent}>
                                    <div className={styles.watchtowerWrap}>
                                        <span className={styles.personRole}>Ведучий:</span>
                                        <span className={styles.person}>Паталаха М.</span>
                                    </div>
                                    <div className={styles.watchtowerWrap}>
                                        <span className={styles.personRole}>Читець:</span>
                                        <span className={styles.person}>Кондаревич В.</span>
                                    </div>
                                </div>
                                <div className={styles.bottomBlock}>

                                </div>
                            </div>
                            <div className={styles.fieldServiceBlock}>
                                <div className={styles.fieldServiceTitle}>
                                    <img className={styles.fieldServiceImg} src={fieldServiceImg} alt="Зустріч для служіння" />
                                    <h3 className={styles.fieldServiceText}>Зустріч для служіння</h3>
                                </div>
                                <div className={styles.fieldServiceContent}>
                                    <div className={styles.fieldServiceWrap}>
                                        <span className={styles.personRole}>Ведучий:</span>
                                        <span className={styles.person}>Паталаха М.</span>
                                    </div>
                                </div>
                            </div>
                            <footer className={styles.weekFooter}>
                                <div className={`${styles.footerItem} ${styles.service}`}>
                                    <h3 className={styles.footerTitle}>ОБСЛУГОВУВАННЯ</h3>
                                    <ul className={styles.footerList}>
                                        <li className={styles.footerListItem}>
                                            <span className={styles.personRole}>Мікшер | Сцена:</span>
                                            <span className={styles.person}>Залокоцький Н. | Дзюбанов А.</span>
                                        </li>
                                        <li className={styles.footerListItem}>
                                            <span className={styles.personRole}>Обслуговуючі:</span>
                                            <span className={styles.person}>Паталаха М. | Кондаревич В.</span>
                                        </li>
                                        <li className={styles.footerListItem}>
                                            <span className={styles.personRole}>Мікрофони:</span>
                                            <span className={styles.person}>Сворень Я. | Салань А.</span>
                                        </li>
                                    </ul>
                                </div>                                
                            </footer>
                        </div>
                    </div>
                    <div className={styles.cleaningkWrapper}>
                        <div className={`${styles.footerItem} ${styles.cleaning}`}>
                            <h3 className={styles.footerTitle}>ПРИБИРАННЯ</h3>
                            <div className={styles.footerList}>
                                <div className={styles.footerListItem}>
                                    <span className={styles.personRole}>Група</span>
                                    <span className={styles.person}>1</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className={styles.weeksItem}>
                <h2 className={styles.weekTitle}>8—14 вересня 2025</h2>                
            </section>
            <section className={styles.weeksItem}>
                <h2 className={styles.weekTitle}>15—21 вересня 2025</h2>                
            </section>
            <section className={styles.weeksItem}>
                <h2 className={styles.weekTitle}>22—28 вересня 2025</h2>                
            </section>
        </div>
        </div>
        </div>
    </div>
    )
}