import { useEffect } from "react";
import { supabase } from "../supabase/supabase";

export const useSchedulesRealtime = () => {
    useEffect(() => {
        const channel = supabase
            .channel('schedules')
            .on(
                'postgres_changes',
                {
                    schema: 'public', // Subscribes to the "public" schema in Postgres
                    event: '*',       // Listen to all changes
                },
                (payload) => console.log(payload)
            )
            .subscribe();
// удаляет подписку
            return() => {
                supabase.removeChannel(channel);
            }
    }, [])
}