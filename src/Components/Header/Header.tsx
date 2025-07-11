import { useNavigate } from "react-router-dom";
import styles from "./Header.module.css";
import { Menu } from "../Menu/Menu";
export const Header = () => {

  const navigate = useNavigate();

  return (
    <div className={styles.header}>
      <Menu />
      <div className={styles.AdminButton}>
        <button onClick={() => navigate("/admin/login")}>
          Admin
        </button>
      </div>
    </div>
  )
}