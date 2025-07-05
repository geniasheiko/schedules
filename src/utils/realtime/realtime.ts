import { useEffect } from "react";
import { supabase } from "../supabase/supabase";

export const useSchedulesRealtime = (refetch: () => void) => {
    useEffect(() => {
        const channel = supabase
            .channel('schedules')
            .on(
                'postgres_changes',
                {
                    schema: 'public', // Subscribes to the "public" schema in Postgres
                    event: '*',       // Listen to all changes
                },
                (payload) => {
                    console.log("Realtime payload", payload)
                    refetch();
                }
            )
            .subscribe();
        // удаляет подписку при вымонтировании компонента
        return () => {
            supabase.removeChannel(channel);
        }
    }, [refetch]
)
}