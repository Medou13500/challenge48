import './App.css'
import {Route, BrowserRouter as Router, Routes} from "react-router-dom";
import {Quizz} from "./components/citation-naruto/Quizz";

function App() {
  return (

    <Router>
        <Routes>
            <Route path="/citation-naruto" element={<Quizz/>}/>
        </Routes>
    </Router>
  )
}

export default App
