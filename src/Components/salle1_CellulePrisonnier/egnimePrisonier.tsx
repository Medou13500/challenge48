import { useState, useEffect } from "react";
import prisonImage from "../../assets/img/prison.png";

function EgnimePrisonier({ onSuccess }: { onSuccess: () => void }) {
  const headerHeight = 64;
  const [showTable, setShowTable] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [result, setResult] = useState("");

  const correctSequence = "➡️⬆️PA⬇️";

  useEffect(() => {
    if (isCompleted) {
      const progression = JSON.parse(localStorage.getItem("progression") || "[true, false, false, false]");
      progression[0] = true;
      localStorage.setItem("progression", JSON.stringify(progression));
      onSuccess();
    }
  }, [isCompleted, onSuccess]);

  const toggleTable = () => {
    if (showTable) {
      setIsClosing(true);
      setTimeout(() => {
        setShowTable(false);
        setIsClosing(false);
      }, 300);
    } else {
      setShowTable(true);
      setTimeout(() => {
        const tableSection = document.getElementById("invocations-table");
        if (tableSection) {
          tableSection.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  };

  const handleValidate = () => {
    if (inputValue.replace(/\s/g, "") === correctSequence) {
      setResult("✅ Séquence correcte !");
      setIsCompleted(true);
    } else {
      setResult("❌ Mauvaise séquence. Réessaye !");
    }
  };

  return (
    <div className="text-white">
      {/* Header */}
      <header
        className="bg-dark text-white text-center py-3"
        style={{ height: `${headerHeight}px` }}
      >
        <h1 className="fs-3 fw-bold">La Cellule de Prisonnier</h1>
      </header>

      {/* Section image + texte + bouton */}
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
          <p className="mb-0">
            Kakashi a été enlevé. Traîné dans l’ombre par les ninjas d’Orochimaru. Une cellule... scellée par un jutsu interdit. Personne n’a pu l’approcher.
            Je suis devant la cellule de Kakashi et je crie,
            KATON ! BOOOOULE DE FEEEEU SUUUPRÊME !!!
          </p>
          <button
            type="button"
            className={`btn btn-dark mt-3 transition-table ${
              isClosing ? "fade-out" : "fade-in"
            }`}
            onClick={toggleTable}
          >
            Indice invocations
          </button>
        </div>
      </section>

      {/* Tableau avec animation */}
      {showTable && (
        <section
          id="invocations-table"
          className={`container my-5 transition-table ${
            isClosing ? "fade-out" : "fade-in"
          }`}
        >
          <table className="table table-bordered text-center table-dark">
            <thead>
              <tr>
                <th>Tigre</th>
                <th>Singe</th>
                <th>Bélier</th>
                <th>Sanglier</th>
                <th>Serpent</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <kbd className="fs-3">➡️</kbd>
                </td>
                <td>
                  <kbd className="fs-3">⬆️</kbd>
                </td>
                <td>
                  <kbd className="fs-3">P</kbd>
                </td>
                <td>
                  <kbd className="fs-3">A</kbd>
                </td>
                <td>
                  <kbd className="fs-3">⬇️</kbd>
                </td>
              </tr>
            </tbody>
          </table>

          {/* Input et Validation */}
          <div className="text-center mt-4">
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Entre la séquence"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <button className="btn btn-danger" onClick={handleValidate}>
              Valider la séquence
            </button>
            {result && <p className="mt-2 fw-bold">{result}</p>}
          </div>
        </section>
      )}
    </div>
  );
}

export default EgnimePrisonier;
