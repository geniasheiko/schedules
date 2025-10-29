import type { ReactNode } from "react";
import styles from "./UniversalButton.module.css"; //!!

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
  type = "button",
  // type,
  className,
  children,
  label,
  color, //!!
}: UniversalButtonPropsType) => {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      // className={className}
      className={`${styles.button} ${color ? styles[color] : ""} ${
        className ?? ""
      }`}
    >
      {label ?? children}
    </button>
  );
};
