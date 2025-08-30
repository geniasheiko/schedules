import { useEffect, useState } from "react";
import { supabase } from "../utils/supabase/supabase";

export const TestSupabase = () => {
  const [session, setSession] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        if (error) {
          setError(error.message);
        } else {
          setSession(data.session);
        }
      } catch (err: any) {
        setError(err.message || "Неизвестная ошибка");
      }
    };

    checkSession();
  }, []);

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Тест подключения к Supabase</h2>
      {error && <p style={{ color: "red" }}>Ошибка: {error}</p>}
      {session ? (
        <pre>{JSON.stringify(session, null, 2)}</pre>
      ) : (
        !error && <p>Проверка...</p>
      )}
    </div>
  );
};
