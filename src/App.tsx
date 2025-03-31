import './App.css'
import {Route, BrowserRouter as Router, Routes} from "react-router-dom";
import Egnime3D from "./components/egnimes-3d/Egnime3D.tsx";
import EgnimePrisonier from './components/salle1_CellulePrisonnier/EgnimePrisonier.tsx';

function App() {
  return (

    <Router>
        <Routes>
            <Route path="/egnime-3d" element={<Egnime3D/>}/>
            <Route path="/Prisonier" element={<EgnimePrisonier/>}/>

        </Routes>
    </Router>
  )
}

export default App
