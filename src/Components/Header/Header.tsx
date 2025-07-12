import styles from "./Header.module.css";
import { Menu } from "../Menu/Menu";
// import { useNavigate } from "react-router-dom";

export const Header = () => {

  // const navigate = useNavigate();

  return (
    <div className={styles.header}>
      <div className={styles.topLinks}>
        <a href="/#/admin/login" className={styles.loginLink}>
          Login
        </a>
        {/* <button onClick={() => navigate("/admin/login")}>
          Admin
        </button> */}
      </div>
      <Menu />
    </div>
  )

}