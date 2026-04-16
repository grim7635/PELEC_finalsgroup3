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
    const doubled = [...icons, ...icons];
    return doubled
      .map((icon) => ({
        icon,
        id: Math.random(),
        matched: false,
      }))
      .sort(() => Math.random() - 0.5);
  };

  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [locked, setLocked] = useState(true);
  const [preview, setPreview] = useState(false);
  const [started, setStarted] = useState(false);

  // ▶️ Start game
  const startGame = () => {
    setCards(shuffleCards());
    setFlipped([]);
    setLocked(true);
    setPreview(true);
    setStarted(true);

    setTimeout(() => {
      setPreview(false);
      setLocked(false);
    }, 2000);
  };

  const handleClick = (index) => {
    if (locked || flipped.includes(index) || cards[index].matched) return;

    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setLocked(true);

      const [i1, i2] = newFlipped;

      if (cards[i1].icon === cards[i2].icon) {
        const newCards = [...cards];
        newCards[i1].matched = true;
        newCards[i2].matched = true;

        setTimeout(() => {
          setCards(newCards);
          setFlipped([]);
          setLocked(false);
        }, 300);
      } else {
        setTimeout(() => {
          setFlipped([]);
          setLocked(false);
        }, 1000);
      }
    }
  };

  return (
    <div className="container">
      <h1>Memory Match 🧠</h1>

      {!started ? (
        <button className="play" onClick={startGame}>
          ▶ Play
        </button>
      ) : (
        <>
          <div className="grid">
            {cards.map((card, index) => {
              const isFlipped =
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
                  {isFlipped ? (
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
        </>
      )}
    </div>
  );
}

export default App;