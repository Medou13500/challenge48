import React, { useState } from "react";
import prisonImage from "../../assets/img/prison.png";

function EgnimePrisonier() {
  const headerHeight = 64;
  const [showTable, setShowTable] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const toggleTable = () => {
    if (showTable) {
      setIsClosing(true); // Animation de fermeture

      setTimeout(() => {
        setShowTable(false); // Cacher le tableau après animation
        setIsClosing(false);
      }, 300); // Durée de l’animation
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
        {/* Overlay sombre */}
        <div
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.6)", zIndex: 1 }}
        ></div>

        {/* Contenu centré */}
        <div
          className="position-relative z-2 bg-white text-dark p-4 rounded shadow text-center"
          style={{ maxWidth: "500px" }}
        >
          <p className="mb-0">Kakashi a été enlevé. Traîné dans l’ombre par les ninjas d’Orochimaru. Une cellule... scellée par un jutsu interdit. Personne n’a pu l’approcher.
            je suis devant la cellule de Kakashi et je cri,
            KATON ! BOOOOULE DE FEEEEU SUUUPRÊME !!! </p>
          <button
            type="button"
            className={`btn btn-dark mt-3 transition-table ${
              isClosing ? "fade-out" : "fade-in"
            }`}
            onClick={toggleTable}
          >
            indice invocations
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
        </section>
      )}
    </div>
  );
}

export default EgnimePrisonier;
