import { useEffect, useState } from "react";
import { supabase } from "../supabase/supabase";

// для общего списка

export const useServiceOverseerSchedule = () => {
  const [schedule, setSchedule] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchSchedule = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("service_overseer_schedule")
      .select("*")
      .order("date", { ascending: true });

    setLoading(false);
    if (error) setError(error);
    else setSchedule(data || []);
  };
  useEffect(() => {
    fetchSchedule();

    const channel = supabase
      .channel("service_overseer_schedule_changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "service_overseer_schedule" },
        (payload) => {
          if (payload.eventType === "INSERT") {
            setSchedule((prev) => [...prev, payload.new]);
          } else if (payload.eventType === "UPDATE") {
            setSchedule((prev) =>
              prev.map((item) =>
                item.id === payload.new.id ? payload.new : item
              )
            );
          } else if (payload.eventType === "DELETE") {
            setSchedule((prev) =>
              prev.filter((item) => item.id !== payload.old.id)
            );
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return { schedule, loading, error };
};
