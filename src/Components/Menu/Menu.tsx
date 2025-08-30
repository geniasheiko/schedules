import { Link } from "react-router-dom";
import styles from "./Menu.module.css";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";

export const Menu = () => {
  const { isAuth } = useSelector((state: RootState) => state.auth);

  return (
    <nav className={styles.menu}>
      <Link to="/" className={styles.link}>
        Запис на стенд
      </Link>
      <Link to="/meetings" className={styles.link}>
        Розклад зібрань
      </Link>
      <Link to="/lists" className={styles.link}>
        Списки
      </Link>
      <Link to="/meetings-for-field-service" className={styles.link}>
        Зустрічі для служіння
      </Link>
      {isAuth && <Link to="/admin/dashboard">Dashboard</Link>}
    </nav>
  );
};
