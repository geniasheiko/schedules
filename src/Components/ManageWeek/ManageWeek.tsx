import { useEffect } from "react";
import { useAddNewWeek } from "../../utils/hooks/useAddNewWeek";
import { useDeleteOldestWeek } from "../../utils/hooks/useDeleteOldestWeek";
import { useRestoreWeekFromBackup } from "../../utils/hooks/useRestoreWeekFromBackup";
import { toast } from "react-toastify";
import { UniversalButton } from "../Buttons/UniversalButton/UniversalButton";
import styles from "./ManageWeek.module.css";

export const ManageWeek = () => {
  const {
    deleteOldestWeek,
    isLoading: isDeleting,
    isError: isDeleteError,
    error: deleteError,
  } = useDeleteOldestWeek();
  const {
    addNewWeek,
    isLoading: isAdding,
    isError: isAddError,
    error: addError,
  } = useAddNewWeek();

  const {
    restore,
    isLoading: _isRestoring,
    isError: isRestoreError,
    error: restoreError,
    successMessage: _restoreSuccess,
  } = useRestoreWeekFromBackup();

  const isLoading = isDeleting || isAdding;

  useEffect(() => {
    if (isDeleteError) {
      toast.error(
        deleteError instanceof Error
          ? deleteError.message
          : "Помилка видалення тижня"
      );
    }

    if (isAddError) {
      toast.error(
        addError instanceof Error ? addError.message : "Помилка додавання тижня"
      );
    }

    if (isRestoreError) {
      toast.error(
        restoreError instanceof Error
          ? restoreError.message
          : "Помилка оновлення тижня"
      );
    }
  }, [
    isDeleteError,
    isAddError,
    deleteError,
    addError,
    restoreError,
    isRestoreError,
  ]);

  const handleDelete = async () => {
    const result = await deleteOldestWeek();
    if (result) toast.success("Тиждень успішно видалений!");
  };

  const handleAdd = async () => {
    const result = await addNewWeek();
    if (result) toast.success("Тиждень успішно доданий!");
  };

  const handleRestore = async () => {
    const result = await restore();
    if (result) toast.success("Тиждень успішно оновлений!");
  };

  return (
    <div className={styles.manageWeek}>
      <div>
        <h3>Правила оновленя тижнів</h3>
        <p>
          В таблиці завжди присутні не більше двох тижнів: периший поточни і
          другий наступний. Додати третій тиждень не має можливості. Тому, щоб
          додати новий тиждень, потрібно спочатку видалити старий, натиснувши на
          кнопку "Видалити старий тиждень", а потім додати наступний (новий)
          тиждень - кнопка "Додати новий тиждень". Щоб не видалити актуальні
          записи, слід видаляти тиждень з неактуальними записами (минулий
          тиждень) в неділю ввечорі, або понеділок зранку. Якщо випадково було
          видалено актуальні записи поточного тижня, наприклад кнопка "Видалити
          старий тиждень" була натиснута в п'ятницю, а значить видалились записи
          суботи та неділі, то можна повністю видновити поточний тиждень -
          кнопка "Поновити видалений тиждень". Цією кнопкою відновлюється тільки
          перний з двох наявних тижнів.
        </p>
      </div>
      <div className={styles.buttonsBlock}>
        <UniversalButton onClick={handleDelete} disabled={isLoading}>
          Видалити старий тиждень
        </UniversalButton>
        <UniversalButton onClick={handleAdd} disabled={isLoading}>
          Додати новий тиждень
        </UniversalButton>
        <UniversalButton onClick={handleRestore} disabled={isLoading}>
          Поновити видалений тиждень
        </UniversalButton>
      </div>
      {isLoading && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            fontWeight: "bold",
            color: "blue",
          }}
        >
          {/* Завантаження... */}
        </div>
      )}
    </div>
  );
};
