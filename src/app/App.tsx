import { HashRouter } from "react-router-dom";
import { Header } from "../Components/Header/Header";
import { Routing } from "../common/Routing/Routing";

export const App = () => {
  return (
    <HashRouter>
      <Header />
      <Routing />
    </HashRouter>
  )
}

export default App;



