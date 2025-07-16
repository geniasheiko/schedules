import styles from "./Header.module.css";
import { Menu } from "../Menu/Menu";
import { useNavigate } from "react-router-dom";

export const Header = () => {

const navigate = useNavigate();

  return (
    <div className={styles.header}>
      <div className={styles.topLinks}>
        <button className={styles.loginLink} onClick={() => navigate("/admin/login")}>
          Login
        </button>
      </div>
      <Menu />
    </div>
  )

}