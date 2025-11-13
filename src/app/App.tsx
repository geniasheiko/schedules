import { HashRouter } from "react-router-dom";
import { Header } from "../Components/Header/Header";
import { Routing } from "../common/Routing/Routing";
import { useGetCurrentUserQuery } from "../features/auth/supabaseAuth";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
import { supabase } from "@/utils/supabase/supabase";

export const AuthBootstrap = () => {
  useGetCurrentUserQuery(); //активирует подписку, восстанавливает сессию
  return null;
};

export const App = () => {
  useEffect(() => {
    const interval = setInterval(async () => {
      const { error } = await supabase
        .from("service_overseer_schedule")
        .select("count");
      if (error) {
        console.warn("⚠️ Supabase session error:", error);
      }
    }, 60000);

    return () => clearInterval(interval);
  }, []);
  return (
    <HashRouter>
      <AuthBootstrap />
      <Header />
      <Routing />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </HashRouter>
  );
};

export default App;
