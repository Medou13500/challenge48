import './App.css'
import {Route, BrowserRouter as Router, Routes} from "react-router-dom";
import EgnimePrisonier from "./Components/salle1_CellulePrisonnier/egnimePrisonier.tsx";
import DecryptMessage from "./Components/cryptographie/cryptographie.tsx";
import {Quizz} from "./Components/citation-naruto/Quizz";
import CharacterQuiz from "./Components/blur-image/Blur.tsx";

function App() {
  return (

    <Router>
        <Routes>
            <Route path="/cryptographie" element={<DecryptMessage/>}/>
            <Route path="/citation-naruto" element={<Quizz/>}/>
            <Route path="/blur" element={<CharacterQuiz/>}/>
            <Route path="/Prisonier" element={<EgnimePrisonier/>}/>
        </Routes>
    </Router>
  )
}

export default App
