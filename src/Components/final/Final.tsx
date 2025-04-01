import bgAkatsuki from '../../assets/img/bg-accueil.png';

function PageFinal() {
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
            <main className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
                <div className="card p-5" style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: '10px', maxWidth: '600px' }}>
                    <h1 className="display-4 text-center" style={{ color: 'rgba(216, 4, 4, 0.84)' }}>
                        Bravo!!!
                    </h1>
                    <p className="lead text-center">
                        Tu as réussi à t'échapper du repaire de l'Akatsuki!
                    </p>

                    <div className="text-center mt-3">
                        <a href="/"><button className="btn btn-light btn-lg" style={{ backgroundColor: 'rgba(216, 4, 4, 0.84)', borderRadius: '20px', padding: '10px 30px', fontWeight: 'bold' }}>
                            Retourner à l'accueil
                        </button></a>
                    </div>
                </div>
            </main >
        </div >
    );
}

export default PageFinal;