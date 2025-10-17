import styles from "./Header.module.css";
import { Menu } from "../Menu/Menu";
import { useNavigate } from "react-router-dom";
import {
  useGetCurrentUserQuery,
  useLogoutMutation,
} from "../../features/auth/supabaseAuth";

export const Header = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useGetCurrentUserQuery();
  const [logout] = useLogoutMutation();

  const loginHandler = () => {
    navigate("/admin/login");
  };

  const logoutHandler = async () => {
    await logout();
    navigate("/");
  };

  return (
    <div className={styles.header}>
      <div className={styles.topLinks}>
        <div className={styles.wrapper}>
          {!isLoading && (
            <button
              onClick={data?.user ? logoutHandler : loginHandler}
              className={styles.loginButton}
              // label="Login"
            >
              {data?.user ? "Logout" : "Login"}
            </button>
          )}
        </div>
      </div>
      <Menu />
    </div>
  );
};
