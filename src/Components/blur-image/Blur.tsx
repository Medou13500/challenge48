import { useState, useEffect } from "react";
import { images } from "../../data/image";

export default function CharacterQuiz() {
    const [currentCharacter, setCurrentCharacter] = useState(0);
    const [inputValue, setInputValue] = useState("");
    const [attempts, setAttempts] = useState(0);
    const [blurAmount, setBlurAmount] = useState(20);
    const [result, setResult] = useState("");
    const [gameOver, setGameOver] = useState(false);
    const [showHint, setShowHint] = useState(false);
    const [currentHint, setCurrentHint] = useState(0);
    const [imageLoaded, setImageLoaded] = useState(false);

    useEffect(() => {
        const randomIndex = Math.floor(Math.random() * images.length);
        setCurrentCharacter(randomIndex);
    }, []);

    const handleGuess = () => {
        if (!inputValue.trim()) return;

        const character = images[currentCharacter];

        if (inputValue.toLowerCase() === character.name.toLowerCase()) {
            setResult(`✅ Bravo ! C'est bien ${character.name} !`);
            setGameOver(true);
            setBlurAmount(0);
        } else {
            setAttempts(attempts + 1);

            const newBlurAmount = Math.max(0, blurAmount - 4);
            setBlurAmount(newBlurAmount);

            if (attempts < character.hints.length - 1) {
                setCurrentHint(attempts);
                setShowHint(true);
                setResult(`❌ Ce n'est pas ${inputValue}. Essaie encore !`);
            } else if (attempts === character.hints.length - 1) {
                setCurrentHint(attempts);
                setShowHint(true);
                setResult(`❌ Ce n'est pas ${inputValue}. Dernier indice !`);
            } else if (attempts === character.hints.length + 1) {
                setGameOver(true);
                setBlurAmount(0);
                setResult(`❌ Dommage ! C'était ${character.name}.`);
            } else {
                setResult(`❌ Ce n'est pas ${inputValue}. Dernière chance !`);
            }
        }

        setInputValue("");
    };

    const handleNewGame = () => {
        const randomIndex = Math.floor(Math.random() * images.length);
        setCurrentCharacter(randomIndex);
        setInputValue("");
        setAttempts(0);
        setBlurAmount(20);
        setResult("");
        setGameOver(false);
        setShowHint(false);
        setCurrentHint(0);
        setImageLoaded(false);
    };

    if (images.length === 0) {
        return (
            <div className="container mt-5">
                <div className="alert alert-warning text-center">
                    Aucun personnage disponible
                </div>
            </div>
        );
    }

    const character = images[currentCharacter];

    return (
        <div className="container py-4">
            <div className="row justify-content-center">
                <div className="col-12 col-md-8 col-lg-6">
                    <div className="card border-0 shadow">
                        <div className="card-header bg-primary text-white py-3">
                            <h2 className="card-title text-center mb-0 fw-bold">Qui est ce personnage ?</h2>
                        </div>

                        <div className="card-body">
                            <div className="text-center mb-4">
                                {!imageLoaded && (
                                    <div className="spinner-border text-primary" role="status">
                                        <span className="visually-hidden">Chargement...</span>
                                    </div>
                                )}
                                <div className="position-relative d-inline-block">
                                    <img
                                        src={character.image}
                                        alt="Personnage mystère"
                                        className="img-fluid rounded shadow"
                                        style={{
                                            maxHeight: "300px",
                                            filter: `blur(${blurAmount}px)`,
                                            display: imageLoaded ? "block" : "none"
                                        }}
                                        onLoad={() => setImageLoaded(true)}
                                    />
                                </div>
                            </div>

                            <div className="progress mb-4" style={{ height: "8px" }}>
                                <div
                                    className="progress-bar bg-success"
                                    role="progressbar"
                                    style={{ width: `${(1 - blurAmount/20) * 100}%` }}
                                    aria-valuenow={(1 - blurAmount/20) * 100}
                                    aria-valuemin={0}
                                    aria-valuemax={100}
                                ></div>
                            </div>

                            {showHint && (
                                <div className="alert alert-warning mb-4">
                                    <p className="mb-0">
                                        <span className="fw-bold">Indice {currentHint + 1}:</span> {character.hints[currentHint]}
                                    </p>
                                </div>
                            )}

                            {!gameOver && (
                                <div className="input-group mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Qui est ce personnage ?"
                                        value={inputValue}
                                        onChange={(e) => setInputValue(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && handleGuess()}
                                        autoFocus
                                    />
                                    <button
                                        className="btn btn-primary"
                                        type="button"
                                        onClick={handleGuess}
                                    >
                                        Valider
                                    </button>
                                </div>
                            )}

                            {result && (
                                <div className={`alert ${result.startsWith('✅') ? 'alert-success' : 'alert-danger'} text-center`}>
                                    {result}
                                </div>
                            )}

                            {!gameOver && attempts > 0 && (
                                <div className="text-center text-muted small mt-2">
                                    Essais: <span className="badge bg-secondary">{attempts} / {character.hints.length + 2}</span>
                                </div>
                            )}

                            {gameOver && (
                                <div className="text-center mt-3">
                                    <button
                                        className="btn btn-success btn-lg"
                                        onClick={handleNewGame}
                                    >
                                        <i className="bi bi-arrow-repeat me-2"></i>
                                        Nouvelle partie
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}