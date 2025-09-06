import { HashRouter } from "react-router-dom";
import { Header } from "../Components/Header/Header";
import { Routing } from "../common/Routing/Routing";
import { useGetCurrentUserQuery } from "../features/auth/supabaseAuth";
import { TestSupabase } from "./TestSupabase";

export const AuthBootstrap = () => {
  useGetCurrentUserQuery(); //активирует подписку
  return null;
};

export const App = () => {
  return (
    <HashRouter>
      <AuthBootstrap />
      <Header />
      {/* <TestSupabase /> */}
      <Routing />
    </HashRouter>
  );
};

export default App;
