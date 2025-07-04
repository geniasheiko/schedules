import styles from "./ActionButton.module.css";


type ActionButtonProps = {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  color?: "primary" | "danger";
};

export const ActionButton = ({label, onClick, disabled, color = "primary",
}: ActionButtonProps) => {
 return (
  <button
    onClick={onClick}
    disabled={disabled}
   className={`${styles.button} ${styles[color]}`}
  >
    {label}
  </button>
);
}