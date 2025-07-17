import styles from "./Header.module.css";
import { Menu } from "../Menu/Menu";
import { useNavigate } from "react-router-dom";
import { useGetCurrentUserQuery, useLogoutMutation } from "../../features/auth/supabaseAuth";
import { UniversalButton } from "../Buttons/UniversalButton/UniversalButton";

export const Header = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useGetCurrentUserQuery();
  const [logout] = useLogoutMutation();

  const loginHandler = () => {
    navigate("/admin/login")
  }

  const logoutHandler = async () => {
    await logout()
    navigate("/")
  }

  return (
    <div className={styles.header}>
      <div className={styles.topLinks}>
        {!isLoading && (
          <UniversalButton
            onClick={data?.user ? logoutHandler : loginHandler}
          >
            {data?.user ? "Logout" : "Login"}
          </UniversalButton>
        )}
      </div>
      <Menu />
    </div>
  )
}