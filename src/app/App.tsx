import { HashRouter, Route, Routes } from "react-router-dom";
import { SchedulePage } from "../Components/SchedulePage/SchedulePage";
import { LifeMinistryPage } from "../pages/LifeMinistryPage";




export const App = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<SchedulePage/>} />
        <Route path="/life-ministry" element={<LifeMinistryPage/>} />
      </Routes>
    </HashRouter> 
  )
}

export default App;



