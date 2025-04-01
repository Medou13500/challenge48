import { useState, useEffect } from "react";
import { quotes } from "../../data/quotes";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Quizz.css";

export const Quizz = ({ onSuccess }: { onSuccess: () => void }) => {
  const getRandomIndex = (): number => Math.floor(Math.random() * quotes.length);

  const [currentIndex, setCurrentIndex] = useState(getRandomIndex());
  const [input, setInput] = useState("");
  const [feedback, setFeedback] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const currentQuote = quotes[currentIndex];

  useEffect(() => {
    if (isCompleted) {
      const progression = JSON.parse(localStorage.getItem("progression") || "[true, false, false, false]");
      progression[3] = true; // débloque l'étape suivante
      localStorage.setItem("progression", JSON.stringify(progression));
      onSuccess();
    }
  }, [isCompleted, onSuccess]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const normalizedInput = input.trim().toLowerCase();
    const normalizedAnswer = currentQuote.author.toLowerCase();

    if (normalizedInput === normalizedAnswer) {
      setFeedback("✅ Bonne réponse !");
      setScore((prev) => {
        const newScore = prev + 1;
        if (newScore === 3) {
          setIsCompleted(true);
        }
        return newScore;
      });

      setTimeout(() => {
        if (!isCompleted) {
          let newIndex = getRandomIndex();
          while (newIndex === currentIndex) {
            newIndex = getRandomIndex();
          }
          setCurrentIndex(newIndex);
          setFeedback("");
          setAttempts(0);
          setInput("");
        }
      }, 1000);
    } else {
      setFeedback("❌ Mauvaise réponse !");
      setAttempts((prev) => prev + 1);
      setInput("");
    }
  };

  return (
    <div className="quizz-container">
      <div className="card p-4 shadow-lg bg-dark text-white quizz-card">
        <h1 className="text-center mb-4" style={{ color: "#FF6600", fontWeight: "bold" }}>
          🌀 Défi Citations Naruto
        </h1>

        {isCompleted ? (
          <h3 className="text-success text-center">🎉 Défi réussi ! Tu es un vrai Shinobi !</h3>
        ) : (
          <>
            <h4 className="mb-4 text-center">« {currentQuote.quote} »</h4>

            <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
              <input
                type="text"
                className="form-control text-center"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Tape le nom du personnage"
              />
              <button type="submit" className="btn btn-warning fw-bold">
                Valider
              </button>
            </form>

            {feedback && (
              <div className={`alert ${feedback.includes("Bonne") ? "alert-success" : "alert-danger"} mt-3 text-center`}>
                {feedback}
              </div>
            )}

            {attempts >= 3 && (
              <div className="alert alert-info mt-2 text-center">💡 Indice : {currentQuote.hint}</div>
            )}

            <div className="score-badge mt-3">
              ✅ Bonnes réponses : <strong>{score}/3</strong>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
