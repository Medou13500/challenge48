import './App.css'
import {Route, BrowserRouter as Router, Routes} from "react-router-dom";
import Egnime3D from "./components/egnimes-3d/Egnime3D.tsx";

function App() {
  return (
    <Router>
        <Routes>
            <Route path="/egnime-3d" element={<Egnime3D/>}/>
        </Routes>
    </Router>
  )
}

export default App
