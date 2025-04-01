import bgAkatsuki from '../../assets/img/bg-accueil.png';
import logoAkatsuki from '../../assets/img/logo-akatsuki.png';

function Accueil() {
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
                <nav>
                    <a href="/Prisonier" className="mx-3 text-decoration-none text-white">La cellule du prisonnier</a>
                    <a href="#" className="mx-3 text-decoration-none text-white">Énigme de Biju</a>
                    <a href="#" className="mx-3 text-decoration-none text-white">Combat d'Illusion</a>
                    <a href="#" className="mx-3 text-decoration-none text-white">Le défi de Pain</a>
                </nav>
            </header>
            <main className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
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
                        <button className="btn btn-light btn-lg" style={{ backgroundColor: 'rgba(216, 4, 4, 0.84)', borderRadius: '20px', padding: '10px 30px', fontWeight: 'bold' }}>
                            Commencer le Jeu
                        </button>
                    </div>
                </div>
            </main >
        </div >
    );
}

export default Accueil;
