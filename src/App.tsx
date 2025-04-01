import { useState, useEffect } from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Accueil from "./Components/Accueil/accueil";
import { Quizz } from "./Components/citation-naruto/Quizz";
import DecryptMessage from "./Components/cryptographie/cryptographie";
import CharacterQuiz from "./Components/blur-image/Blur";
import EnigmePrisonier from "./Components/salle1_CellulePrisonnier/egnimePrisonier";

function App() {
  const defaultProgression = [true, false, false, false];
  const [unlocked, setUnlocked] = useState(defaultProgression);

  useEffect(() => {
    const saved = localStorage.getItem("progression");
    if (saved) {
      setUnlocked(JSON.parse(saved));
    }
  }, []);

  const handleUnlock = (index: number) => {
    const newProgression = [...unlocked];
    if (index + 1 < newProgression.length) {
      newProgression[index + 1] = true;
    }
    setUnlocked(newProgression);
    localStorage.setItem("progression", JSON.stringify(newProgression));
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/prisonnier" element={<EnigmePrisonier onSuccess={() => handleUnlock(0)} />} />
        <Route path="/cryptographie" element={<DecryptMessage onSuccess={() => handleUnlock(1)} />} />
        <Route path="/illusion" element={<CharacterQuiz onSuccess={() => handleUnlock(2)} />} />
        <Route path="/citation" element={<Quizz onSuccess={() => handleUnlock(3)} />} />

      </Routes>
    </Router>
  );
}

export default App;
