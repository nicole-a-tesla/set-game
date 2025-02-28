'use client'

import { initialDeck } from "./deck"
import { useEffect, useState } from "react";
import Card from "./Card"
import isSet from "./setChecker";
import { CardData } from "@/types";

export default function Home() {
  const [deck, setDeck] = useState<CardData[]>(initialDeck)
  const [board, setBoard] = useState<number[]>([])
  const [selectedCards, setSelectedCards] = useState<CardData[]>([])
  const [message, setMessage] = useState('')
  const [usedCardIndexes, setUsedCardIndexes] = useState<number[]>([])

  useEffect(() => draw(16), [])

  useEffect(() => {
    if (selectedCards.length === 3) checkAndReset()
  }, [selectedCards])

  const isSelected= (cardId: string) => {
    return selectedCards.some(card => card.id === cardId)
  }

  const removeCards = (cards: CardData[]) => {
    const targetIds = cards.map(c => c.id)
    return board.filter(cardIndex => {
      return !targetIds.includes(deck[cardIndex].id)
    })
  }

  const checkAndReset = () => {
    if (isSet(selectedCards)) {
      const nextBoard = removeCards(selectedCards)
      draw(3, nextBoard)
      setSelectedCards([])
    } else {
      setSelectedCards([])
      setMessage("Not a set, please try again")
    }

  }

  const onCardClick = (cardData: CardData, isSelected: boolean) => {
    if (message !== "") setMessage("")
    isSelected
      ? unselectCard(cardData)
      : selectCard(cardData)
  }

  const unselectCard = (cardData: CardData) => {
      const newSelectedCards = selectedCards.filter(c => c.id !== cardData.id)
      setSelectedCards(newSelectedCards);
  }

  const selectCard = (cardData: CardData) => {
    if (selectedCards.length < 3) {
      setSelectedCards([
        ...selectedCards,
        cardData
      ])
    } else {
      setMessage("Select a maximum of 3 cards to create a set")
    }
  }

  const selectNewCardIndexes = (count: number) => {
    const selectedIndexes: number[] = []

    while (selectedIndexes.length < count) {
      const index = Math.floor(Math.random() * deck.length); // todo fix
      if (!selectedIndexes.includes(index) && !usedCardIndexes.includes(index)) {
        selectedIndexes.push(index)
      }
    }
    return selectedIndexes
  }

  const draw = (count: number, nextBoard?: number[]) => {
    const selectedIndexes = selectNewCardIndexes(count)

    setUsedCardIndexes([
      ...usedCardIndexes,
      ...selectedIndexes
    ])
    setBoard([
      ...nextBoard ? nextBoard : board,
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
