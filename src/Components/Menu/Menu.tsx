import { Link } from "react-router-dom";
import styles from "./Menu.module.css";

export const Menu = () => {
    return (
        <nav className={styles.menu}>
            <Link to="/" className={styles.link}>Розклад на стенд</Link>
            <Link to="/life-ministry" className={styles.link}>Розклад зібрань</Link>
            <Link to="/" className={styles.link}>Розклад выходов</Link>
            <Link to="/" className={styles.link}>Списки</Link>
            </nav>
    )
}