import { HashRouter } from "react-router-dom";
import { Header } from "../Components/Header/Header";
import { Routing } from "../common/Routing/Routing";
import { useGetCurrentUserQuery } from "../features/auth/supabaseAuth";
import { ToastContainer } from "react-toastify";

export const AuthBootstrap = () => {
  useGetCurrentUserQuery(); //активирует подписку, восстанавливает сессию
  return null;
};

export const App = () => {
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
