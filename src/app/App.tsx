import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SchedulePage } from "../Components/SchedulePage/SchedulePage";
import { LifeMinistryPage } from "../pages/LifeMinistryPage";




export const App = () => {
  return (
  <BrowserRouter>
  <Routes>
  <Route path="/SchedulePage" element={<SchedulePage/>} />
  <Route path="/life-ministry" element={<LifeMinistryPage/>} />
   </Routes>
  </BrowserRouter>
 
  )
}

export default App;



