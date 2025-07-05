import { useState } from "react";
import type { ScheduleSlot } from "../../types/schedule";


export function useDayScheduleHandlers(
    onBook: (slotId: string, name: string) => void,
    onDelete: (slotId: string) => void,
    _loading: boolean
) {
    //для записи
    const [inputs, setInputs] = useState<Record<string, string[]>>({});
    //Изменение импута
    const handleInputChange = (key: string, index: number, value: string) => {
        setInputs((prev) => ({
            ...prev,
            [key]: prev[key]
                ? prev[key].map((v, i) => (i === index ? value : v))
                : [index === 0 ? value : "", index === 1 ? value : ""],
        }));
    };
    // Бронирование слота
    const handleBook = (key: string, slots: ScheduleSlot[], index: number) => {
        const name = inputs[key]?.[index]?.trim();
        if (!name) return;
        const candidates = slots.filter((s) => !s.is_booked);
        if (candidates.length === 0) return;
        const slotToBook = candidates[index] || candidates[0];
        onBook(slotToBook.id, name);
        localStorage.setItem(slotToBook.id, name);  //для проверки, чтобы удалять мог только тот, кто записался

        setInputs((prev) => ({
            ...prev,
            [key]: prev[key].map((v, i) => (i === index ? "" : v)),
        }));
    };
    // Удаление бронирования
    const handleDelete = (slotId: string) => {
        localStorage.removeItem(slotId);
        onDelete(slotId);
    };

    return { inputs, handleInputChange, handleBook, handleDelete, setInputs };
}
