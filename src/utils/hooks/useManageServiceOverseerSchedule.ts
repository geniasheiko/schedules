import { useState } from "react";
import { supabase } from "../supabase/supabase";

export const useManageServiceOverseerSchedule = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const addEntry = async (entry: {
    date: string;
    day_of_week: string;
    adres: string;
    speaker: string;
  }) => {
    setLoading(true);
    const { error } = await supabase
      .from("service_overseer_schedule")
      .insert([entry]);

    setLoading(false);
    if (error) {
      setError(error);
      return false;
    }
    return true;
  };

  const updateEntry = async (
    id: string,
    updateData: Partial<{
      date: string;
      day_of_week: string;
      adres: string;
      speaker: string;
    }>
  ) => {
    setLoading(true);
    const { error } = await supabase
      .from("service_overseer_schedule")
      .update(updateData)
      .eq("id", id);

    setLoading(false);
    if (error) {
      setError(error);
      return false;
    }
    return true;
  };

  const deleteEntry = async (id: string) => {
    setLoading(true);
    const { error } = await supabase
      .from("service_overseer_schedule")
      .delete()
      .eq("id", id);

    setLoading(false);
    if (error) {
      setError(error);
      return false;
    }
    return true;
  };
  return { addEntry, updateEntry, deleteEntry, loading, error };
};
