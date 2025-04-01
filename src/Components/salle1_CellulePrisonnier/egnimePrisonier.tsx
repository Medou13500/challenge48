import { useState, useEffect } from "react";
import prisonImage from "../../assets/img/prison.png";
import { useNavigate } from "react-router-dom";



function EgnimePrisonier({ onSuccess }: { onSuccess: () => void }) {
  const headerHeight = 64;
  const [showTable, setShowTable] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const [, setUserSequence] = useState<string[]>([]);
  const [showPopup, setShowPopup] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const navigate = useNavigate();

  const correctSequence = ["ArrowDown", "p", "ArrowUp", "a", "q", "ArrowRight"];

  const toggleTable = () => {
    if (showTable) {
      setIsClosing(true);
      setTimeout(() => {
        setShowTable(false);
        setIsClosing(false);
      }, 300);
    } else {
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 400);
      setShowTable(true);
      setTimeout(() => {
        const tableSection = document.getElementById("invocations-table");
        if (tableSection) {
          tableSection.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  };

  useEffect(() => {
    if (isCompleted) {
      const progression = JSON.parse(localStorage.getItem("progression") || "[true, false, false, false]");
      progression[0] = true;
      localStorage.setItem("progression", JSON.stringify(progression));
      onSuccess();
    }
  }, [isCompleted, onSuccess]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.includes("Arrow") ? e.key : e.key.toLowerCase();

      setUserSequence((prev) => {
        const newSequence = [...prev, key];
        const expected = correctSequence.slice(0, newSequence.length);
        const isCorrect = expected.every((val, i) => val === newSequence[i]);

        if (!isCorrect) {
          return [];
        }

        if (newSequence.length === correctSequence.length) {
          setIsShaking(true);
          setTimeout(() => setIsShaking(false), 500);
          setTimeout(() => {
            setShowPopup(true);
            setIsCompleted(true);
          }, 1000);
          return [];
        }

        return newSequence;
      });
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className={`text-white ${isShaking ? "shake" : ""}`}>
      <header className="bg-dark text-white text-center py-3" style={{ height: `${headerHeight}px` }}>
        <h1 className="fs-3 fw-bold">La Cellule de Prisonnier</h1>
      </header>

      <section
        className="d-flex flex-column align-items-center justify-content-center position-relative"
        style={{
          height: `calc(100vh - ${headerHeight}px)`,
          backgroundImage: `url(${prisonImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.6)", zIndex: 1 }}
        ></div>

        <div
          className="position-relative z-2 bg-white text-dark p-4 rounded shadow text-center"
          style={{ maxWidth: "500px" }}
        >
          <p className="mb-0">Kakashi a été enlevé. Traîné dans l’ombre par les ninjas d’Orochimaru. Une cellule... scellée par un jutsu interdit. Personne n’a pu l’approcher.
            je suis devant la cellule de Kakashi et je cri,
            KATON ! BOOOOULE DE FEEEEU SUUUPRÊME !!! </p>
          <p className="mb-2">
            🔥 <strong>Consigne :</strong> Les invocations ont été mélangées.
            Tu dois retrouver l'ordre exact pour libérer Kakashi.
            Tape la bonne combinaison de touches clavier correspondant aux mudras
            dans l'ordre exact.
          </p>
          
          <p className="mb-0">
            Kakashi a été enlevé. Traîné dans l’ombre par les ninjas d’Orochimaru. Une cellule... scellée par un jutsu interdit. Personne n’a pu l’approcher.
            Je suis devant la cellule de Kakashi et je crie, KATON ! BOOOOULE DE FEEEEU SUUUPRÊME !!!
          </p>
          <button
            type="button"
            className={`btn btn-dark mt-3 transition-table ${isClosing ? "fade-out" : "fade-in"}`}
            onClick={toggleTable}
          >
            mundra invocations
            Indice invocations
          </button>
        </div>
      </section>

      {showTable && (
        <section
          id="invocations-table"
          className={`container my-5 transition-table ${isClosing ? "fade-out" : "fade-in"}`}
        >
          <table className="table table-bordered text-center table-dark">
            <thead>
              <tr>
                <th>Tigre</th>
                <th>Singe</th>
                <th>Bélier</th>
                <th>Sanglier</th>
                <th>Serpent</th>
                <th>Cheval</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><kbd className="fs-3">➡️</kbd></td>
                <td><kbd className="fs-3">⬆️</kbd></td>
                <td><kbd className="fs-3">P</kbd></td>
                <td><kbd className="fs-3">A</kbd></td>
                <td><kbd className="fs-3">⬇️</kbd></td>
                <td><kbd className="fs-3">Q</kbd></td>
              </tr>
            </tbody>
          </table>
        </section>
      )}

{showPopup && (
  <div className="position-fixed top-0 start-0 w-100 h-100 d-flex flex-column justify-content-center align-items-center bg-black bg-opacity-75 z-3">
    <div className="text-center mt-4">
      <h2 className="text-white fw-bold">🎉 Bravo ! Vous vous êtes libéré !</h2>

      <button
        className="btn btn-success mt-3"
        onClick={() => {
          navigate("/cryptographie");
          window.location.reload(); // Recharge proprement la page
        }}
      >
        Continuer à la prochaine étape
      </button>
    </div>
  </div>
)}
    </div>
  );
}

export default EgnimePrisonier;
