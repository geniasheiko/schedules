import { useEffect } from "react";
import { supabase } from "./utils/supabase/supabase";

export const RegisterAdmin = () => {
  useEffect(() => {
    const register = async () => {
      const { data, error } = await supabase.auth.signUp({
        email: "truskavets14001@gmail.com",
        password: "semionevci456",
        options: {
          data: {
            first_name: "Zal",
            last_name: "Zalovich",
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
  return <div>Админ зарегестрирован</div>;
};
