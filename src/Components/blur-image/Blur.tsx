import {useState, useEffect} from "react";
import {images} from "../../data/image";
import styled from "styled-components";
import {Link} from "react-router-dom";

const NarutoContainer = styled.div`
    background-image: linear-gradient(to bottom, #ff9d00, #ff7200);
    min-height: 100vh;
    padding-top: 2rem;
    padding-bottom: 2rem;
    font-family: 'Ninja Naruto', 'Trebuchet MS', sans-serif;
`;

const NarutoCard = styled.div`
    border: 4px solid #ff4500 !important;
    border-radius: 20px !important;
    box-shadow: 0 10px 25px rgba(255, 69, 0, 0.5) !important;
    background-color: #ffefd5 !important;
    overflow: hidden;
`;

const NarutoCardHeader = styled.div`
    background: linear-gradient(to right, #ff4500, #ff8c00) !important;
    color: #fff !important;
    text-shadow: 2px 2px 4px #000;
    font-weight: bold;
    border-bottom: 3px solid #ff8c00;
`;

const NarutoButton = styled.button`
    background: linear-gradient(to right, #ff4500, #ff8c00) !important;
    border-color: #ff4500 !important;
    font-weight: bold;

    &:hover {
        background: linear-gradient(to right, #ff8c00, #ff4500) !important;
        transform: scale(1.05);
    }
`;

const HintBox = styled.div`
    background-color: #ffdab9 !important;
    border: 2px solid #ff8c00 !important;
    color: #333 !important;
`;

const ProgressBarContainer = styled.div`
    background-color: #ffdab9 !important;
    border: 1px solid #ff4500;
`;

const ProgressBar = styled.div`
    background: linear-gradient(to right, #ff4500, #ff8c00) !important;
`;

const NarutoInput = styled.input`
    border: 2px solid #ff8c00 !important;

    &:focus {
        box-shadow: 0 0 0 0.25rem rgba(255, 140, 0, 0.25) !important;
        border-color: #ff4500 !important;
    }
`;

const VictoryCounter = styled.div`
    position: absolute;
    top: 20px;
    right: 20px;
    background: linear-gradient(to right, #ff4500, #ff8c00);
    color: white;
    padding: 10px 15px;
    border-radius: 10px;
    font-size: 1.2rem;
    font-weight: bold;
    box-shadow: 0 5px 15px rgba(255, 69, 0, 0.5);
    border: 2px solid #fff;
`;

const FinalVictoryMessage = styled.div`
    background: linear-gradient(to right, #ff4500, #ff8c00);
    color: white;
    padding: 1.5rem;
    border-radius: 15px;
    text-align: center;
    margin-top: 2rem;
    box-shadow: 0 10px 30px rgba(255, 69, 0, 0.7);
    border: 3px solid gold;
    animation: pulse 1.5s infinite;

    @keyframes pulse {
        0% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.05);
        }
        100% {
            transform: scale(1);
        }
    }

    h2 {
        font-size: 2.5rem;
        margin-bottom: 1rem;
        text-shadow: 2px 2px 4px #000;
    }
`;


export default function CharacterQuiz({onSuccess}: { onSuccess: () => void }) {
    const [currentCharacter, setCurrentCharacter] = useState(0);
    const [inputValue, setInputValue] = useState("");
    const [attempts, setAttempts] = useState(0);
    const [blurAmount, setBlurAmount] = useState(20);
    const [result, setResult] = useState("");
    const [gameOver, setGameOver] = useState(false);
    const [showHint, setShowHint] = useState(false);
    const [correctGuesses, setCorrectGuesses] = useState(0);
    const [currentHint, setCurrentHint] = useState(0);
    const [imageLoaded, setImageLoaded] = useState(false);
    const [, setScore] = useState(0);
    const [finalVictory, setFinalVictory] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);

    useEffect(() => {
        const randomIndex = Math.floor(Math.random() * images.length);
        setCurrentCharacter(randomIndex);
    }, []);

    useEffect(() => {
        if (isCompleted) {
            const progression = JSON.parse(localStorage.getItem("progression") || "[true, false, false, false]");
            progression[2] = true;
            localStorage.setItem("progression", JSON.stringify(progression));
            onSuccess();
        }
    }, [isCompleted, onSuccess]);

    const handleGuess = () => {
        if (!inputValue.trim()) return;
        const character = images[currentCharacter];

        if (inputValue.toLowerCase() === character.name.toLowerCase()) {
            setResult(`✅ Bravo ! C'est bien ${character.name} !`);
            setGameOver(true);
            setBlurAmount(0);
            const newCorrectGuesses = correctGuesses + 1;
            setCorrectGuesses(newCorrectGuesses);
            setScore((prev) => {
                const newScore = prev + 1;
                if (newScore === 2) {
                    setIsCompleted(true);
                }
                return newScore;
            });
            if (newCorrectGuesses >= 5) {
                setFinalVictory(true);
            }
        } else {
            setAttempts((prev) => prev + 1);
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
        setIsCompleted(false);
        setScore(0);
    };

    if (images.length === 0) {
        return (
            <NarutoContainer className="container mt-5">
                <div className="alert alert-warning text-center">
                    Aucun personnage disponible.
                </div>
            </NarutoContainer>
        );
    }
    const handleResetGame = () => {
        handleNewGame();
        setCorrectGuesses(0);
        setFinalVictory(false);
    };


    const character = images[currentCharacter];

    return (
        <>
            <NarutoContainer className="d-flex align-items-center justify-content-center vw-100 m-0 position-relative">
                <VictoryCounter>
                    Personnages trouvés: {correctGuesses} / 5
                </VictoryCounter>

                {finalVictory ? (
                    <div className="row justify-content-center w-100">
                        <div className="col-12 col-md-8 col-lg-6">
                            <FinalVictoryMessage>
                                <h2>VICTOIRE ! 🏆</h2>
                                <p className="fs-4 mb-4">Tu as réussi à identifier 5 personnages de Naruto !</p>
                                <p className="mb-4">Tu es un véritable ninja connaisseur !</p>
                                <NarutoButton
                                    className="btn btn-lg"
                                    onClick={handleResetGame}
                                >
                                    <i className="bi bi-arrow-repeat me-2"></i>
                                    <Link to="/citation" className="text-decoration-none text-white">
                                        Continuer à la prochaine étapes
                                    </Link>
                                </NarutoButton>
                            </FinalVictoryMessage>
                        </div>
                    </div>
                ) : (
                    <div className="row justify-content-center w-100">
                        <div className="col-12 col-md-8 col-lg-6">
                            <NarutoCard className="card border-0 shadow">
                                <NarutoCardHeader className="card-header py-3">
                                    <h2 className="card-title text-center mb-0 fw-bold">Qui est ce personnage ?</h2>
                                </NarutoCardHeader>

                                <div className="card-body">
                                    <div className="text-center mb-4">
                                        {!imageLoaded && (
                                            <div className="spinner-border text-warning" role="status">
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
                                                    display: imageLoaded ? "block" : "none",
                                                    border: "3px solid #ff8c00",
                                                }}
                                                onLoad={() => setImageLoaded(true)}
                                            />
                                        </div>
                                    </div>

                                    <ProgressBarContainer className="progress mb-4" style={{ height: "12px" }}>
                                        <ProgressBar
                                            className="progress-bar"
                                            role="progressbar"
                                            style={{ width: `${(1 - blurAmount/20) * 100}%` }}
                                            aria-valuenow={(1 - blurAmount/20) * 100}
                                            aria-valuemin={0}
                                            aria-valuemax={100}
                                        ></ProgressBar>
                                    </ProgressBarContainer>

                                    {showHint && (
                                        <HintBox className="alert mb-4">
                                            <p className="mb-0">
                                                <span className="fw-bold">Indice {currentHint + 1}:</span> {character.hints[currentHint]}
                                            </p>
                                        </HintBox>
                                    )}

                                    {!gameOver && (
                                        <div className="input-group mb-3">
                                            <NarutoInput
                                                type="text"
                                                className="form-control"
                                                placeholder="Qui est ce personnage ?"
                                                value={inputValue}
                                                onChange={(e) => setInputValue(e.target.value)}
                                                onKeyDown={(e) => e.key === 'Enter' && handleGuess()}
                                                autoFocus
                                            />
                                            <NarutoButton
                                                className="btn"
                                                type="button"
                                                onClick={handleGuess}
                                            >
                                                Valider
                                            </NarutoButton>
                                        </div>
                                    )}

                                    {result && (
                                        <div className={`alert text-center ${result.startsWith('✅') ? 'alert-success' : 'alert-danger'}`}
                                             style={{
                                                 backgroundColor: result.startsWith('✅') ? '#c8e6c9' : '#ffccbc',
                                                 borderColor: result.startsWith('✅') ? '#4caf50' : '#ff5722',
                                                 color: '#333'
                                             }}>
                                            {result}
                                        </div>
                                    )}

                                    {!gameOver && attempts > 0 && (
                                        <div className="text-center text-muted small mt-2">
                                            Essais: <span className="badge" style={{ backgroundColor: '#ff8c00' }}>{attempts} / {character.hints.length + 2}</span>
                                        </div>
                                    )}

                                    {gameOver && (
                                        <div className="text-center mt-3">
                                            <NarutoButton
                                                className="btn btn-lg"
                                                onClick={handleNewGame}
                                            >
                                                <i className="bi bi-arrow-repeat me-2"></i>
                                                {result.startsWith('✅') ? 'Personnage suivant' : 'Nouvel essai'}
                                            </NarutoButton>
                                        </div>
                                    )}
                                </div>
                            </NarutoCard>
                        </div>
                    </div>
                )}
            </NarutoContainer>
        </>

    );
}
