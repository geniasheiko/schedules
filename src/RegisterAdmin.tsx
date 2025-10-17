import { useState } from "react";
import { supabase } from "./utils/supabase/supabase";

export const RegisterOneAdmin = () => {
  const [status, setStatus] = useState<string>("");

  const register = async () => {
    setStatus("Запускаю регистрацию...");

    try {
      const { data, error } = await supabase.auth.signUp({
        email: "",
        password: "",
      });

      if (error) {
        console.error("Ошибка регистрации:", error.message);
        setStatus(`Ошибка регистрации: ${error.message}`);
      } else if (data.user) {
        console.log("✅ Админ создан в Authentication:", data.user.email);
        setStatus(`✅ Админ создан: ${data.user.email}`);
      }
    } catch (err) {
      console.error(err);
      setStatus(`Неожиданная ошибка: ${String(err)}`);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <button onClick={register}>Зарегистрировать второго админа</button>
      <p>{status}</p>
    </div>
  );
};

// import { useState } from "react";
// import { supabase } from "./utils/supabase/supabase";

// const admins = [
//   { email: "", password: "securepassword123" },
//   { email: "truskavets14001@gmail.com", password: "Cong-14001" },
// ];

// const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// export const RegisterAdmins = () => {
//   const [status, setStatus] = useState<string>("");

//   const registerAll = async () => {
//     setStatus("Запускаю регистрацию...");

//     for (const admin of admins) {
//       try {
//         // 1. регистрируем пользователя в Authentication
//         const { data, error } = await supabase.auth.signUp({
//           email: admin.email,
//           password: admin.password,
//         });

//         if (error) {
//           console.error(`Ошибка регистрации ${admin.email}:`, error.message);
//           setStatus(`Ошибка регистрации ${admin.email}: ${error.message}`);
//           // ждём и идём к следующему
//           await delay(3000);
//           continue;
//         }

//         if (data.user) {
//           // 2. добавляем в таблицу admins
//           const { error: insertError } = await supabase
//             .from("admins")
//             .insert([{ id: data.user.id, email: data.user.email }]);

//           if (insertError) {
//             console.error(`Ошибка добавления в admins:`, insertError.message);
//             setStatus(
//               `Ошибка добавления ${admin.email}: ${insertError.message}`
//             );
//           } else {
//             console.log(`✅ Админ добавлен: ${admin.email}`);
//             setStatus(`✅ Админ добавлен: ${admin.email}`);
//           }
//         }

//         // 3. задержка перед следующим
//         await delay(3000);
//       } catch (err) {
//         console.error(err);
//         setStatus(`Неожиданная ошибка: ${String(err)}`);
//         await delay(3000);
//       }
//     }

//     setStatus("Регистрация всех админов завершена ✅");
//   };

//   return (
//     <div style={{ padding: "20px" }}>
//       <button onClick={registerAll}>Зарегистрировать админов</button>
//       <p>{status}</p>
//     </div>
//   );
// };

// type AdminData = {
//   email: string;
//   password: string;
//   first_name: string;
//   last_name: string;
// };

// const admins: AdminData[] = [
//   {
//     email: "geniasheiko@gmail",
//     password: "securepassword123",
//     first_name: "Admin",
//     last_name: "One",
//   },
//   {
//     email: "truskavets14001@gmail.com",
//     password: "Cong-14001",
//     first_name: "Admin",
//     last_name: "Two",
//   },
//   // добавь сколько угодно админов
// ];

// export const RegisterAdmins = () => {
//   useEffect(() => {
//     const registerAll = async () => {
//     const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

//       for (const admin of admins) {
//         try {
//           // регистрация в Auth
//           const { data, error } = await supabase.auth.signUp({
//             email: admin.email,
//             password: admin.password,
//             options: {
//               data: {
//                 first_name: admin.first_name,
//                 last_name: admin.last_name,
//               },
//             },
//           });

//           if (error) {
//             console.error(`Ошибка регистрации ${admin.email}:`, error.message);
//             continue;
//           }

//           // добавление id в таблицу admins
//           if (data.user) {
//             const { error: adminError } = await supabase
//               .from("admins")
//               .insert([{ id: data.user.id, email: data.user.email }]);
//             if (adminError) console.error(adminError);
//             else console.log(`Админ добавлен: ${admin.email}`);
//           }
//         } catch (e) {
//           console.error(`Не удалось зарегистрировать ${admin.email}:`, e);
//         }

//       }
//     };

//     registerAll();
//   }, []);

//   return <div>Регистрация админов запущена. Проверь консоль.</div>;
// };
