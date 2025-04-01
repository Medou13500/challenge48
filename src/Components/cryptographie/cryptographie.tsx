import {useState} from "react";

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
        <div className="container py-4">
            <div className="row justify-content-center">
                <div className="col-12 col-md-8 col-lg-6">
                    <div className="card shadow border-0">
                        <div className="card-header bg-dark text-white py-3">
                            <h2 className="card-title text-center mb-0 fw-bold">
                                <i className="bi bi-lock-fill me-2"></i>
                                Décryptage du message
                            </h2>
                        </div>

                        <div className="card-body">
                            <p className="d-none text-monospace bg-light p-2 rounded border mb-4">
                                Message chiffré : vkhk f'hvw sdv oh erq frgh
                            </p>

                            <div className="mb-4">
                                <div className="progress mb-3" style={{height: "10px"}}>
                                    <div
                                        className="progress-bar progress-bar-striped progress-bar-animated bg-primary"
                                        role="progressbar"
                                        style={{width: `${Math.min(100, (attempts / 3) * 100)}%`}}
                                        aria-valuenow={Math.min(100, (attempts / 3) * 100)}
                                        aria-valuemin={0}
                                        aria-valuemax={100}
                                    ></div>
                                </div>

                                <div className="card bg-light border-0">
                                    <div className="card-body py-2">
                                        <h5 className="card-title fs-6 mb-2">
                                            <i className="bi bi-lightbulb-fill text-warning me-2"></i>
                                            Indices disponibles :
                                        </h5>
                                        <ul className="list-group list-group-flush">
                                            <li className={`list-group-item border-0 bg-transparent ${showHint1 ? '' : 'text-muted'}`}>
                                                <span className="badge bg-info me-2">1</span>
                                                {showHint1 ? (
                                                    <>🔍 Inspectez bien <strong>toute</strong> la page.</>
                                                ) : (
                                                    <>Débloqué après 1 tentative</>
                                                )}
                                            </li>
                                            <li className={`list-group-item border-0 bg-transparent ${showHint2 ? '' : 'text-muted'}`}>
                                                <span className="badge bg-info me-2">2</span>
                                                {showHint2 ? (
                                                    <>🔍 C'est un chiffrement de César avec un décalage
                                                        de <strong>{shift}</strong>.</>
                                                ) : (
                                                    <>Débloqué après 2 tentatives</>
                                                )}
                                            </li>
                                            <li className={`list-group-item border-0 bg-transparent ${showHint3 ? '' : 'text-muted'}`}>
                                                <span className="badge bg-info me-2">3</span>
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
                                <label htmlFor="decryptInput" className="form-label fw-bold">Message original :</label>
                                <div className="input-group">
                                    <span className="input-group-text">
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
                                    />
                                    <button
                                        onClick={handleDecrypt}
                                        className="btn btn-primary"
                                        disabled={solved}
                                    >
                                        <i className="bi bi-unlock-fill me-1"></i>
                                        Décrypter
                                    </button>
                                </div>
                            </div>

                            {result && (
                                <div
                                    className={`alert ${result.includes('✅') ? 'alert-success' : 'alert-danger'} d-flex align-items-center`}>
                                    <i className={`bi ${result.includes('✅') ? 'bi-check-circle-fill' : 'bi-exclamation-triangle-fill'} me-2`}></i>
                                    <div>{result}</div>
                                </div>
                            )}

                            {attempts > 0 && !solved && (
                                <div className="text-center text-muted">
                                    <small>
                                        Nombre de tentatives : <span className="badge bg-secondary">{attempts}</span>
                                    </small>
                                </div>
                            )}

                            {solved && (
                                <div className="text-center mt-3">
                                    <button
                                        className="btn btn-success"
                                        onClick={resetGame}
                                    >
                                        <i className="bi bi-arrow-repeat me-2"></i>
                                        Recommencer
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