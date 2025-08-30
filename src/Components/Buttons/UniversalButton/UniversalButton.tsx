import type { ReactNode } from "react";

type UniversalButtonPropsType = {
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  className?: string;
  children?: ReactNode;
  color?: "primary" | "danger";
  label?: string;
};

export const UniversalButton = ({
  onClick,
  disabled,
  type,
  className,
  children,
  label,
}: UniversalButtonPropsType) => {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={className}
    >
      {label ?? children}
    </button>
  );
};

// export const LogoutButton = () => {
//   const [logout] = useLogoutMutation();
//   const navigate = useNavigate();

//   const logoutHandler = async () => {
//     await logout();
//     navigate("/");
//   };

//   return <button onClick={logoutHandler}>Вийти</button>
// };
