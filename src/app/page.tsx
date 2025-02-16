'use client'

import { initialDeck } from "./deck"
import { useEffect, useState } from "react";
import Card from "./Card"

export default function Home() {
  const [deck, setDeck] = useState(initialDeck)
  const [board, setBoard] = useState([])
  const [selectedCards, setSelectedCards] = useState([])
  const [error, setError] = useState('')

  useEffect(() => setBoard(draw(16)), [])

  const isSelected= (cardId) => {
    return selectedCards.some(card => card.id === cardId)
  }

  const onCardClick = (cardData, isSelected) => {
    console.log({selectedCards})
    if (error !== "") setError("")

    if (isSelected) {
      unselectCard(cardData)
    } else {
      selectCard(cardData)
      // check isSet if 3
    }
  }

  const unselectCard = (cardData) => {
      const newSelectedCards = selectedCards.filter(c => c.id !== cardData.id)
      setSelectedCards(newSelectedCards);
  }

  const selectCard = (cardData) => {
    if (selectedCards.length < 3) {
      setSelectedCards([
        ...selectedCards,
        cardData
      ])
    } else {
      setError("Select a maximum of 3 cards to create a set")
    }
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
      <p>{error}</p>
    </main>
  );
}
