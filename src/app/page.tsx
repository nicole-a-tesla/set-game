'use client'

import { initialDeck } from "./deck"
import { useEffect, useState } from "react";
import Card from "./Card"
import isSet from "./setChecker";

export default function Home() {
  const [deck, setDeck] = useState(initialDeck)
  const [board, setBoard] = useState([])
  const [selectedCards, setSelectedCards] = useState([])
  const [message, setMessage] = useState('')
  const [usedCardIndexes, setUsedCardIndexes] = useState([])

  useEffect(() => draw(16), [])

  useEffect(() => {
    if (selectedCards.length === 3) checkAndReset()
  }, [selectedCards])

  const isSelected= (cardId) => {
    return selectedCards.some(card => card.id === cardId)
  }

  const removeCards = (cards) => {
    const targetIds = cards.map(c => c.id)
    return board.filter(cardIndex => {
      return !targetIds.includes(deck[cardIndex].id)
    })
  }

  const checkAndReset = () => {
    if (isSet(selectedCards)) {
      setBoard([
        ...removeCards(selectedCards),
        ...selectNewCardIndexes(3)
      ])
      setSelectedCards([])
    } else {
      setSelectedCards([])
      setMessage("Not a set, please try again")
    }

  }

  const onCardClick = (cardData, isSelected) => {
    if (message !== "") setMessage("")

    if (isSelected) {
      unselectCard(cardData)
    } else {
      selectCard(cardData)
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
      setMessage("Select a maximum of 3 cards to create a set")
    }
  }

  const selectNewCardIndexes = (count) => {
    const selectedIndexes = []

    while (selectedIndexes.length < count) {
      const index = Math.floor(Math.random() * deck.length); // todo fix
      if (!selectedIndexes.includes(index) && !usedCardIndexes.includes(index)) {
        selectedIndexes.push(index)
      }
    }
    return selectedIndexes
  }

  const draw = (count) => {
    const selectedIndexes = selectNewCardIndexes(count)

    setUsedCardIndexes([
      ...usedCardIndexes,
      ...selectedIndexes
    ])
    setBoard([
      ...board,
      ...selectedIndexes
    ])
  }


  return (
    <main>
      <div className="flex justify-center items-center">
        <div
          className="grid grid-cols-4 bg-red-500">
          {
            board.map(i => <Card
              key={Object.values(deck[i]).join("-")}
              isSelected={isSelected(deck[i].id)}
              cardData={deck[i]}
              onCardClick={onCardClick} />)
          }
        </div>
      </div>
      <p>{message}</p>
    </main>
  );
}
