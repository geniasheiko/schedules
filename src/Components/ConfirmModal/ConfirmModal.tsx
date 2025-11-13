import { useEffect } from "react";
import styles from "./ConfirmModal.module.css";

type ConfirmModalProps = {
  isOpen: boolean;
  message: string;
  highlight?: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export const ConfirmModal = ({
  isOpen,
  message,
  highlight,
  onConfirm,
  onCancel,
}: ConfirmModalProps) => {
  useEffect(() => {
    // блокируем прокрутку при открытии модалки
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <p>
          {message}{" "}
          {highlight && (
            <strong style={{ fontWeight: 700 }}>{highlight}</strong>
          )}
          ?
        </p>
        <div className={styles.buttons}>
          <button onClick={onConfirm} className={styles.ok}>
            OK
          </button>
          <button onClick={onCancel} className={styles.cancel}>
            Відмінити
          </button>
        </div>
      </div>
    </div>
  );
};
