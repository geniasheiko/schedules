import { HashRouter, Route, Routes } from "react-router-dom";
import { SchedulePage } from "../Components/SchedulePage/SchedulePage";
import { LifeMinistryPage } from "../pages/LifeMinistryPage";
import { Header } from "../Components/Header/Header";




export const App = () => {
  return (
    <HashRouter>
      <Header />
      <Routes>
        <Route path="/" element={<SchedulePage/>} />
        <Route path="/life-ministry" element={<LifeMinistryPage/>} />
      </Routes>
    </HashRouter> 
  )
}

export default App;



