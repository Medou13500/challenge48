import { useState } from "react";
import { quotes } from "../data/quizzbdd";

export const Quizz = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [input, setInput] = useState("");
  const [feedback, setFeedback] = useState("");
  const [attempts, setAttempts] = useState(0);

  const currentQuote = quotes[currentIndex];

  const handleSubmit = (e) => {
    e.preventDefault();
    const normalizedInput = input.trim().toLowerCase();
    const normalizedAnswer = currentQuote.author.toLowerCase();

    if (normalizedInput === normalizedAnswer) {
      setFeedback("✅ Bonne réponse !");
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % quotes.length);
        setFeedback("");
        setAttempts(0);
        setInput("");
      }, 1000);
    } else {
      setFeedback("❌ Mauvaise réponse !");
      setAttempts((prev) => prev + 1);
      setInput("");
    }
  };

  return (
    <div>
      <h2>Qui a dit :</h2>
      <p>"{currentQuote.quote}"</p>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Tape le nom du personnage"
        />
        <button type="submit">Valider</button>
      </form>

      {feedback && <p>{feedback}</p>}

      {attempts >= 3 && <p>💡 Indice : {currentQuote.hint}</p>}
    </div>
  );
};
