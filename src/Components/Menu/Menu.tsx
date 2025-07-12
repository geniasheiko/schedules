import { Link } from "react-router-dom";
import styles from "./Menu.module.css";

export const Menu = () => {
    return (
        <nav className={styles.menu}>
            <Link to="/" className={styles.link}>Запис на стенд</Link>
            <Link to="/life-and-ministry" className={styles.link}>НХЖС</Link>
            <Link to="/lists" className={styles.link}>Списки</Link>
            <Link to="/public-talk-watchtower" className={styles.link}>Зібрання на вихідних</Link>
            <Link to="/meetings-for-field-service" className={styles.link}>Зустрічі для служіння</Link>
        </nav>
    )
}