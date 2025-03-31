import './App.css'
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Egnime3D from "./Components/egnimes-3d/Egnime3D.tsx";
import EgnimePrisonier from './Components/salle1_CellulePrisonnier/egnimePrisonier.tsx';
import Accueil from './Components/Accueil/accueil.tsx';

function App() {
  return (

    <Router>
      <Routes>
        <Route path="/egnime-3d" element={<Egnime3D />} />
        <Route path="/Prisonier" element={<EgnimePrisonier />} />
        <Route path="/" element={<Accueil />} />
      </Routes>
    </Router>
  )
}

export default App
