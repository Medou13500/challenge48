import { useState } from "react";
import { quotes } from "../../data/quotes";

export const Quizz = () => {
  const getRandomIndex = (): number => Math.floor(Math.random() * quotes.length);

  const [currentIndex, setCurrentIndex] = useState(getRandomIndex());
  const [input, setInput] = useState("");
  const [feedback, setFeedback] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const currentQuote = quotes[currentIndex];

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
    <div>
      <h2>Qui a dit :</h2>

      {isCompleted ? (
        <h3>🎉 Défi réussi !</h3>
      ) : (
        <>
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
          <p> Bonnes réponses : {score}/3</p>
        </>
      )}
    </div>
  );
};
