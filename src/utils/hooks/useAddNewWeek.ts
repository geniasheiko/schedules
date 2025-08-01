import { useCallback } from "react";
import { useAddNewWeekMutation } from "../../store/scheduleApi"

export const useAddNewWeek = () => {
     const [addWeek, { isLoading, isError, error }] = useAddNewWeekMutation();

     const addNewWeek = useCallback(async () => {
          try {
               await addWeek().unwrap();
               return true;
          } catch (err) {
               console.error("Помилка при додаванні тижня:", err);
          }
     }, [addWeek]);
     return { addNewWeek, isLoading, isError, error }
}