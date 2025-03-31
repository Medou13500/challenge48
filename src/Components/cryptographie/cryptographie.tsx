import { useState } from "react";

export default function DecryptMessage() {
    const encryptedMessage = "krndjhghodihxloohnrqrkd";
    const shift = 3;

    const [inputValue, setInputValue] = useState("");
    const [result, setResult] = useState("");
    const [attempts, setAttempts] = useState(0);
    const [showHint1, setShowHint1] = useState(false);
    const [showHint2, setShowHint2] = useState(false);
    const [showHint3, setShowHint3] = useState(false);

    const isCorrectAnswer = (input: string) => {
        return input === "hokagedelafeuillekonoha";
    };

    const handleDecrypt = () => {
        if (isCorrectAnswer(inputValue)) {
            setResult("✅ Bravo ! Vous avez trouvé le bon message !");
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

    return (
        <div className="p-4 max-w-md mx-auto bg-gray-100 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-2">Décryptage du message</h2>

            <p className="d-none text-md font-mono bg-gray-200 p-2 rounded mb-4">
                Message chiffré : {encryptedMessage}
            </p>

            {showHint1 && (
                <p className="text-sm text-gray-700 mb-2">
                    🔍 Indice 1 : Inspect bien toute la page.
                </p>
            )}

            {showHint2 && (
                <p className="text-sm text-gray-700 mb-2">
                    🔍 Indice 2 : C'est un chiffrement de César avec un décalage de {shift}.
                </p>
            )}

            {showHint3 && (
                <p className="text-sm text-gray-700 mb-2">
                    🧩 Indice 3 : Pour décrypter, utilisez un décalage de {-shift} (ou {26-shift}).
                </p>
            )}
            <input
                type="text"
                placeholder="Entrez le message original"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="border p-2 w-full rounded-md"
            />

            <button
                onClick={handleDecrypt}
                className="bg-blue-500 text-white px-4 py-2 mt-2 rounded-md hover:bg-blue-600"
            >
                Décrypter
            </button>

            {result && <p className="mt-2 font-semibold">{result}</p>}
        </div>
    );
}