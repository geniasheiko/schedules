import { useEffect } from "react";
import { supabase } from "./utils/supabase/supabase"

export const RegisterAdmin = () => {
  useEffect(() => {
    const register = async () => {
      const { data, error } = await supabase.auth.signUp({
        email: "geniasheiko@gmail.com",
        password: "",
        options: {
          data: {
            first_name: "Evgenia",
            last_name: "Melnyk",
          },
        },
      });

      if (error) {
        console.error("Ошибка регистрации:", error.message);
      } else {
        console.log("Пользователь зарегистрирован:", data);
      }
    };

    register();
  }, []);
return (
  <div>
  Админ зарегестрирован
  </div>
)
}