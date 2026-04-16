import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAppleWhole,
  faLemon,
  faCar,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import "./App.css";

function App() {
  const icons = [faAppleWhole, faLemon, faCar, faHeart];

  const shuffleCards = () => {
    const doubled = [...icons, ...icons].map((icon) => ({
      icon,
      id: crypto.randomUUID(),
      matched: false,
    }));

    for (let i = doubled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [doubled[i], doubled[j]] = [doubled[j], doubled[i]];
    }

    return doubled;
  };

  // 💾 state
  const [cards, setCards] = useState(() => {
    const saved = localStorage.getItem("cards");
    return saved ? JSON.parse(saved) : [];
  });

  const [flipped, setFlipped] = useState([]);
  const [preview, setPreview] = useState(false);

  const [score, setScore] = useState(() => {
    return Number(localStorage.getItem("score")) || 0;
  });

  const [moves, setMoves] = useState(() => {
    return Number(localStorage.getItem("moves")) || 0;
  });

  const locked = preview || flipped.length === 2;

  // 💾 save
  useEffect(() => {
    localStorage.setItem("cards", JSON.stringify(cards));
    localStorage.setItem("score", score);
    localStorage.setItem("moves", moves);
  }, [cards, score, moves]);

  // 🚀 auto start on mount
  useEffect(() => {
    if (cards.length === 0) {
      startGame();
    }
  }, []);

  // ▶️ start / restart game
  const startGame = () => {
    const newCards = shuffleCards();

    setCards(newCards);
    setFlipped([]);
    setPreview(true);
    setScore(0);
    setMoves(0);

    setTimeout(() => {
      setPreview(false);
    }, 1500);
  };

  // 🎯 click handler
  const handleClick = (index) => {
    if (
      locked ||
      flipped.includes(index) ||
      cards[index]?.matched
    ) return;

    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setMoves((m) => m + 1);

      const [i1, i2] = newFlipped;

      if (cards[i1].icon === cards[i2].icon) {
        const updated = cards.map((c, i) =>
          i === i1 || i === i2 ? { ...c, matched: true } : c
        );

        setScore((s) => s + 1);

        setTimeout(() => {
          setCards(updated);
          setFlipped([]);
        }, 300);
      } else {
        setTimeout(() => {
          setFlipped([]);
        }, 800);
      }
    }
  };

  return (
    <div className="container">
      <h1>Memory Match 🧠</h1>

      <p>Score: {score} | Moves: {moves}</p>

      <div className="grid">
        {cards.map((card, index) => {
          const show =
            preview || flipped.includes(index) || card.matched;

          return (
            <button
              key={card.id}
              className={`tile ${
                card.matched
                  ? "matched"
                  : flipped.includes(index)
                  ? "flipped"
                  : ""
              }`}
              onClick={() => handleClick(index)}
            >
              {show ? (
                <FontAwesomeIcon icon={card.icon} size="2x" />
              ) : (
                "❓"
              )}
            </button>
          );
        })}
      </div>

      <button className="reset" onClick={startGame}>
        Restart
      </button>
    </div>
  );
}

export default App;