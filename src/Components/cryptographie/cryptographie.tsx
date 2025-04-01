import {useState} from "react";
import logoAkatsuki from "../../assets/img/logo-akatsuki.png";
import {Link} from "react-router-dom";

export default function DecryptMessage() {
    const encryptedMessage = "krndjhghodihxloohnrqrkd";
    const shift = 3;

    const [inputValue, setInputValue] = useState("");
    const [result, setResult] = useState("");
    const [attempts, setAttempts] = useState(0);
    const [showHint1, setShowHint1] = useState(false);
    const [showHint2, setShowHint2] = useState(false);
    const [showHint3, setShowHint3] = useState(false);
    const [solved, setSolved] = useState(false);

    const isCorrectAnswer = (input: string) => {
        return input === "hokagedelafeuillekonoha";
    };

    const handleDecrypt = () => {
        if (isCorrectAnswer(inputValue)) {
            setResult("✅ Bravo ! Vous avez trouvé le bon message !");
            setSolved(true);
        } else {
            setAttempts(attempts + 1);

            if (attempts === 0) {
                setShowHint1(true);
                setResult("❌ Ce n'est pas le bon message. Premier indice débloqué !");
            } else if (attempts === 1) {
                setShowHint2(true);
                setResult("❌ Nouvel essai incorrect. Deuxième indice débloqué !");
            } else if (attempts === 2) {
                setShowHint3(true);
                setResult("❌ Incorrect. Troisième indice débloqué !")
            } else {
                setResult(`❌ Ce n'est pas le bon message, réessayez ! (${attempts + 1} tentatives)`);
            }
        }
    };

    const resetGame = () => {
        setInputValue("");
        setResult("");
        setAttempts(0);
        setShowHint1(false);
        setShowHint2(false);
        setShowHint3(false);
        setSolved(false);
    };

    return (
        <>
            <header className="d-flex justify-content-between align-items-center p-3" style={{ backgroundColor: 'rgba(36, 35, 35, 0.8)' }}>
                <img src={logoAkatsuki} alt="Naruto Logo" style={{ height: '60px', width: '100px' }} />
                <nav>
                    <a href="/prisionnier" className="mx-3 text-decoration-none text-white">La cellule du prisonnier</a>
                    <a href="/crytographie" className="mx-3 text-decoration-none text-white">Énigme de Biju</a>
                    <a href="/illusion" className="mx-3 text-decoration-none text-white">Combat d'Illusion</a>
                    <a href="/citation" className="mx-3 text-decoration-none text-white">Le défi de Pain</a>
                </nav>
            </header>

            <div className="vh-100 " style={{
                backgroundImage: 'url(https://i.pinimg.com/736x/46/04/eb/4604eb26f14c81d5fb36b4a0bef129de.jpg)',
                backgroundSize: 'cover',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <div className="row justify-content-center w-100">
                    <div className="col-12 col-md-8 col-lg-6">
                        <div className="card shadow border-0" style={{
                            backgroundColor: 'rgba(255, 245, 225, 0.95)',
                            borderRadius: '15px',
                            border: '2px solid #FF6B1A'
                        }}>
                            <div className="card-header py-3" style={{
                                background: 'linear-gradient(135deg, #FF6B1A 0%, #FF4500 100%)',
                                borderTopLeftRadius: '13px',
                                borderTopRightRadius: '13px',
                                borderBottom: '2px solid #000'
                            }}>
                                <h2 className="card-title text-center mb-0 fw-bold text-white" style={{
                                    textShadow: '2px 2px 4px #000',
                                    fontFamily: '"Ninja Naruto", sans-serif'
                                }}>
                                    <i className="bi bi-lock-fill me-2"></i>
                                    Décryptage du Rouleau Secret
                                </h2>
                            </div>

                            <div className="card-body">
                                <p className="d-none text-monospace bg-light p-2 rounded border mb-4">
                                    Message chiffré : vkhk f'hvw sdv oh erq frgh
                                </p>

                                <div className="mb-4">
                                    <div className="progress mb-3" style={{height: "10px", borderRadius: "10px"}}>
                                        <div
                                            className="progress-bar progress-bar-striped progress-bar-animated"
                                            role="progressbar"
                                            style={{
                                                width: `${Math.min(100, (attempts / 3) * 100)}%`,
                                                backgroundColor: '#1E88E5',
                                                backgroundImage: 'linear-gradient(45deg, rgba(255,255,255,.15) 25%, transparent 25%, transparent 50%, rgba(255,255,255,.15) 50%, rgba(255,255,255,.15) 75%, transparent 75%, transparent)'
                                            }}
                                            aria-valuenow={Math.min(100, (attempts / 3) * 100)}
                                            aria-valuemin={0}
                                            aria-valuemax={100}
                                        ></div>
                                    </div>

                                    <div className="card border-0" style={{
                                        backgroundColor: 'rgba(255, 250, 240, 0.7)',
                                        borderRadius: '10px',
                                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
                                    }}>
                                        <div className="card-body py-2">
                                            <h5 className="card-title fs-6 mb-2" style={{
                                                color: '#FF4500',
                                                fontWeight: 'bold'
                                            }}>
                                                <i className="bi bi-scroll me-2"></i>
                                                Indices du Rouleau Ninja:
                                            </h5>
                                            <ul className="list-group list-group-flush">
                                                <li className={`list-group-item border-0 bg-transparent ${showHint1 ? '' : 'text-muted'}`}>
                                                    <span className="badge me-2" style={{
                                                        backgroundColor: showHint1 ? '#FF6B1A' : '#6c757d'
                                                    }}>1</span>
                                                    {showHint1 ? (
                                                        <>🔍 Inspectez bien <strong>toute</strong> la page.</>
                                                    ) : (
                                                        <>Débloqué après 1 tentative</>
                                                    )}
                                                </li>
                                                <li className={`list-group-item border-0 bg-transparent ${showHint2 ? '' : 'text-muted'}`}>
                                                    <span className="badge me-2" style={{
                                                        backgroundColor: showHint2 ? '#FF6B1A' : '#6c757d'
                                                    }}>2</span>
                                                    {showHint2 ? (
                                                        <>🔍 C'est un chiffrement de César avec un décalage
                                                            de <strong>{shift}</strong>.</>
                                                    ) : (
                                                        <>Débloqué après 2 tentatives</>
                                                    )}
                                                </li>
                                                <li className={`list-group-item border-0 bg-transparent ${showHint3 ? '' : 'text-muted'}`}>
                                                    <span className="badge me-2" style={{
                                                        backgroundColor: showHint3 ? '#FF6B1A' : '#6c757d'
                                                    }}>3</span>
                                                    {showHint3 ? (
                                                        <>🧩 Pour décrypter, utilisez un décalage
                                                            de <strong>{-shift}</strong> (ou <strong>{26 - shift}</strong>).</>
                                                    ) : (
                                                        <>Débloqué après 3 tentatives</>
                                                    )}
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="decryptInput" className="form-label fw-bold" style={{color: '#FF4500'}}>
                                        Message original :
                                    </label>
                                    <div className="input-group">
                                        <span className="input-group-text" style={{
                                            backgroundColor: '#FF6B1A',
                                            color: 'white',
                                            borderColor: '#FF4500'
                                        }}>
                                            <i className="bi bi-key-fill"></i>
                                            <div>
                                                <p className="d-none text-monospace bg-light p-2 rounded border mb-4">
                                                    Message chiffré : {encryptedMessage}
                                                </p>
                                            </div>
                                        </span>
                                        <input
                                            type="text"
                                            id="decryptInput"
                                            className="form-control"
                                            placeholder="Entrez le message original"
                                            value={inputValue}
                                            onChange={(e) => setInputValue(e.target.value)}
                                            onKeyDown={(e) => e.key === 'Enter' && handleDecrypt()}
                                            disabled={solved}
                                            style={{
                                                borderColor: '#FF4500',
                                                backgroundColor: 'rgba(255, 250, 240, 0.8)'
                                            }}
                                        />
                                        <button
                                            onClick={handleDecrypt}
                                            className="btn"
                                            disabled={solved}
                                            style={{
                                                backgroundColor: '#FF4500',
                                                color: 'white',
                                                borderColor: '#FF4500'
                                            }}
                                        >
                                            <i className="bi bi-unlock-fill me-1"></i>
                                            Décrypter
                                        </button>
                                    </div>
                                </div>

                                {result && (
                                    <div
                                        className={`alert d-flex align-items-center`}
                                        style={{
                                            backgroundColor: result.includes('✅') ? 'rgba(75, 181, 67, 0.2)' : 'rgba(220, 53, 69, 0.2)',
                                            color: result.includes('✅') ? '#28a745' : '#dc3545',
                                            border: `1px solid ${result.includes('✅') ? '#28a745' : '#dc3545'}`,
                                            borderRadius: '10px'
                                        }}
                                    >
                                        <i className={`bi ${result.includes('✅') ? 'bi-check-circle-fill' : 'bi-exclamation-triangle-fill'} me-2`}></i>
                                        <div>{result}</div>
                                    </div>
                                )}

                                {attempts > 0 && !solved && (
                                    <div className="text-center text-muted">
                                        <small>
                                            Nombre de tentatives : <span className="badge" style={{backgroundColor: '#FF6B1A'}}>{attempts}</span>
                                        </small>
                                    </div>
                                )}

                                {solved && (
                                    <div className="text-center mt-3">
                                        <button
                                            className="btn"
                                            onClick={resetGame}
                                            style={{
                                                backgroundImage: 'linear-gradient(135deg, #FF6B1A 0%, #FF4500 100%)',
                                                color: 'white',
                                                border: 'none',
                                                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                                            }}
                                        >
                                            <i className="bi bi-arrow-repeat me-2"></i>
                                            <Link to="/illusion" className="text-decoration-none text-white" style={{textShadow: '2px 2px 4px #000'}}>
                                                Salle suivante
                                            </Link>
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}