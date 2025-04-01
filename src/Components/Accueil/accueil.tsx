import bgAkatsuki from '../../assets/img/bg-accueil.png';
import logoAkatsuki from '../../assets/img/logo-akatsuki.png';
import { useState, useEffect } from 'react';
import './Accueil.css';

function Accueil() {
  const defaultProgression = [true, false, false, false];
  const [unlocked, setUnlocked] = useState(defaultProgression);

  useEffect(() => {
    const saved = localStorage.getItem("progression");
    if (saved) {
      setUnlocked(JSON.parse(saved));
    }
  }, []);

  const resetProgression = () => {
    localStorage.setItem("progression", JSON.stringify([true, false, false, false]));
    setUnlocked([true, false, false, false]);
  };

  return (
    <div style={{
      backgroundImage: `url(${bgAkatsuki})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      minHeight: '100vh',
      color: 'white',
      fontFamily: 'Arial, sans-serif',
    }}>
      <header className="d-flex justify-content-between align-items-center p-3" style={{ backgroundColor: 'rgba(36, 35, 35, 0.8)' }}>
        <img src={logoAkatsuki} alt="Naruto Logo" style={{ height: '60px', width: '100px' }} />
        <nav className="nav-links">
          <a href="/prisonnier" className={unlocked[0] ? "link-active" : "link-disabled"}>
            La cellule du prisonnier
          </a>
          <a href="/cryptographie" className={unlocked[1] ? "link-active" : "link-disabled"}>
            Énigme de Biju
          </a>
          <a href="/illusion" className={unlocked[2] ? "link-active" : "link-disabled"}>
            Combat d'Illusion
          </a>
          <a href="/citation" className={unlocked[3] ? "link-active" : "link-disabled"}>
            Le défi de Pain
          </a>
        </nav>
      </header>

      <main className="d-flex flex-column justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
        <div className="card p-5" style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: '10px', maxWidth: '600px' }}>
          <p className="lead">
            Tu es un jeune ninja pris au piège dans un repaire de l'Akatsuki.
            Pour t'échapper, tu dois résoudre plusieurs énigmes basées sur l'univers de Naruto.
            Mais attention, si tu te trompes trop de fois, Pain pourrait venir en personne t'arrêter !
          </p>
          <p>
            Résous toutes les énigmes pour trouver la sortie avant la fin du temps imparti.
          </p>
          <p>
            Le jeu est divisé en plusieurs salles, chacune contenant une énigme ou un défi.
            Pour progresser, il faut trouver des indices et utiliser ses connaissances sur Naruto.
          </p>
          <div className="text-center mt-3">
            <a href="/prisonnier">
              <button className="btn btn-light btn-lg" style={{
                backgroundColor: 'rgba(216, 4, 4, 0.84)',
                borderRadius: '20px',
                padding: '10px 30px',
                fontWeight: 'bold'
              }}>
                Commencer le Jeu
              </button>
            </a>
          </div>
        </div>

        {/* 🔥 Bouton Reset */}
        <div className="text-center mt-4">
          <button
            onClick={resetProgression}
            className="btn btn-outline-light"
            style={{
              border: '2px solid #FF4C4C',
              color: '#FF4C4C',
              borderRadius: '12px',
              padding: '8px 20px',
              fontWeight: 'bold',
              transition: 'background-color 0.3s'
            }}
          >
            🔄 Réinitialiser la progression
          </button>
        </div>
      </main>
    </div>
  );
}

export default Accueil;
