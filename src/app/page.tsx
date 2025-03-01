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
  const [isDiscarding, setIsDiscarding] = useState(false)

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
      setIsDiscarding(true)
      setTimeout(() => {
        const nextBoard = removeCards(selectedCards)
        setBoard(nextBoard)
        setSelectedCards([])
        setIsDiscarding(false)
      }, 1000)
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

  const draw = (count: number) => {
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

  const style = {
    left: "50%",
    transform: "translateX(-50%)"
  }
  return (
    <main className="h-screen">
      <div className="h-full">
        <div
          style={style}
          className="h-full w-3/4 m-auto relative">
          {
            board.map((cardPositionInDeck, index) => <Card
              key={Object.values(deck[cardPositionInDeck]).join("-")}
              isSelected={isSelected(deck[cardPositionInDeck].id)}
              cardData={deck[cardPositionInDeck]}
              order={index}
              isDiscard={isDiscarding && isSelected(deck[cardPositionInDeck].id)}
              onCardClick={onCardClick} />)
          }
        </div>
      </div>
      <p>{message}</p>
    </main>
  );
}
