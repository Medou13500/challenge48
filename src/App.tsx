import './App.css'
import {Route, BrowserRouter as Router, Routes} from "react-router-dom";
import DecryptMessage from "./Components/cryptographie/cryptographie.tsx";
import {Quizz} from "./Components/citation-naruto/Quizz";
import EgnimePrisonier from './Components/salle1_CellulePrisonnier/egnimePrisonier.tsx';

function App() {
  return (

    <Router>
        <Routes>
            <Route path="/cryptographie" element={<DecryptMessage/>}/>
            <Route path="/citation-naruto" element={<Quizz/>}/>
            <Route path="/Prisonier" element={<EgnimePrisonier/>}/>
        </Routes>
    </Router>
  )
}

export default App
