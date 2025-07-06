import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SchedulePage } from "../Components/SchedulePage/SchedulePage";
import { LifeMinistryPage } from "../pages/LifeMinistryPage";




export const App = () => {
  return (
  <BrowserRouter basename="/schedules">
  <Routes>
  <Route path="/" element={<SchedulePage/>} />
  <Route path="/life-ministry" element={<LifeMinistryPage/>} />
   </Routes>
  </BrowserRouter>
 
  )
}

export default App;



