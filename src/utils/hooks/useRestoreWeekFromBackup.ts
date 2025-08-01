import { useCallback, useState } from "react"
import { useRestoreWeekFromBackupMutation } from "../../store/scheduleApi";


export const useRestoreWeekFromBackup = () => {
    const [successMessage, setSuccessMessage] = useState<string | null>(null)
    const [restoreWeek, { isLoading, isError, error }] = useRestoreWeekFromBackupMutation();
    const restore = useCallback(async() => {
        try {
            await restoreWeek().unwrap();
            setSuccessMessage("Тиждень успішно відновлено ✅");
      setTimeout(() => setSuccessMessage(null), 3000); // скрыть через 3 секунды
            return true;
        } catch (err) {
      console.error("Помилка при відновленні тижня:", err);
      setSuccessMessage(null);
    }
  }, [restoreWeek]);

  return { restore, isLoading, isError, error, successMessage };
};