import { useEffect } from "react";
import { useAddNewWeek } from "../../utils/hooks/useAddNewWeek";
import { useDeleteOldestWeek } from "../../utils/hooks/useDeleteOldestWeek";
import { useRestoreWeekFromBackup } from "../../utils/hooks/useRestoreWeekFromBackup";
import { toast } from "react-toastify";
import { UniversalButton } from "../Buttons/UniversalButton/UniversalButton";

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
    <div>
      <UniversalButton onClick={handleDelete} disabled={isLoading}>
        Видалити старий тиждень
      </UniversalButton>
      <UniversalButton onClick={handleAdd} disabled={isLoading}>
        Додати новий тиждень
      </UniversalButton>
      <UniversalButton onClick={handleRestore} disabled={isLoading}>
        Поновити видалений тиждень
      </UniversalButton>
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
          Завантаження...
        </div>
      )}
    </div>
  );
};
