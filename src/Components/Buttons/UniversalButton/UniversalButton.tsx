import type { ReactNode } from "react";


type UniversalButtonPropsType = {
  onClick?: () => void
  disabled?: boolean
  type?: "button" | "submit" | "reset";
  className?: string
  children: ReactNode
}

export const UniversalButton = ({onClick, disabled, type, className, children}: UniversalButtonPropsType) => {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={className}>
       {children}
    </button>
)
}






// export const LogoutButton = () => {
//   const [logout] = useLogoutMutation();
//   const navigate = useNavigate();

//   const logoutHandler = async () => {
//     await logout();
//     navigate("/");
//   };

//   return <button onClick={logoutHandler}>Вийти</button>
// };