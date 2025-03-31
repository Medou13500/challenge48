import './App.css'
import {Route, BrowserRouter as Router, Routes} from "react-router-dom";
import EgnimePrisonier from "./Components/salle1_CellulePrisonnier/egnimePrisonier.tsx";
import DecryptMessage from "./Components/cryptographie/cryptographie.tsx";

function App() {
  return (

    <Router>
        <Routes>
            <Route path="/cryptographie" element={<DecryptMessage/>}/>
            <Route path="/Prisonier" element={<EgnimePrisonier/>}/>
        </Routes>
    </Router>
  )
}

export default App
