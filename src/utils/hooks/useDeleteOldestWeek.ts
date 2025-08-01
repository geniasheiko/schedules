import { useCallback } from "react";
import { useDeleteOldestWeekMutation } from "../../store/scheduleApi";


export const useDeleteOldestWeek = () => {
    const [deleteWeek, { isLoading, isError, error }] = useDeleteOldestWeekMutation()

    const deleteOldestWeek = useCallback(async() => {
        try {
            await deleteWeek().unwrap();
            return true;
        } catch(err) {
            console.error("Помилка при видаленні тижня:", err);
        }
    }, [deleteWeek]);
    return {deleteOldestWeek, isLoading, isError, error}
}