import { useState } from "react";
import type { ScheduleSlot } from "../../types/schedule";

export function useDayScheduleHandlers(
  onBook: (slotId: string, name: string) => void,
  onDelete: (slotId: string) => void,
  _loading: boolean
) {

  const [inputs, setInputs] = useState<Record<string, string>>({});

  const handleInputChange = (key: string, value: string) => {
    setInputs((prev) => ({
      ...prev,
      [key]: value,
    }));
  };
  const handleBook = (key: string, slot: ScheduleSlot) => {
    const name = inputs[key]?.trim();
    if (!name) return;
    onBook(slot.id, name);
    localStorage.setItem(slot.id, name);
    setInputs((prev) => ({
      ...prev,
      [key]: "",
    }));
  };

  const handleDelete = (slotId: string) => {
    localStorage.removeItem(slotId);
    onDelete(slotId);
  };

  return { inputs, handleInputChange, handleBook, handleDelete, setInputs };
}
