'use client'

import { initialDeck } from "./deck"
import { useEffect, useState } from "react";
import Card from "./Card"

export default function Home() {
  const [deck, setDeck] = useState(initialDeck)
  const [board, setBoard] = useState([])
  const [selectedCards, setSelectedCards] = useState([])

  useEffect(() => setBoard(draw(12)), [])

  const isSelected= (cardId) => {
    return selectedCards.some(card => card.id === cardId)
  }

  const onCardClick = (cardData) => {
    setSelectedCards([
      ...selectedCards,
      cardData
    ])
  }

  const draw = (count)=>{
    // draw n cards from deck and add to board
    // must take into account current board if set
    const selectedIndexes = []

    // add another check to while loop
    while (selectedIndexes.length < count) {
      const index = Math.floor(Math.random() * deck.length);
      if (!selectedIndexes.includes(index)) selectedIndexes.push(index)
    }

    return selectedIndexes;
  }


  return (
    <main>
      <div style={{margin: "25px", display: "flex", flexWrap: "wrap"}}>
        {
          board.map(i => <Card
            key={Object.values(deck[i]).join("-")}
            isSelected={isSelected(deck[i].id)}
            cardData={deck[i]}
            onCardClick={onCardClick} />)
        }
      </div>
    </main>
  );
}
