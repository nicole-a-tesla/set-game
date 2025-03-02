'use client'

import { deck, unusedIndexes } from "./deck"
import { useEffect, useState } from "react";
import Card from "./Card"
import isSet from "./setChecker";
import { CardData } from "@/types";

export default function Home() {
  const [board, setBoard] = useState<number[]>([])
  const [selectedCards, setSelectedCards] = useState<CardData[]>([])
  const [message, setMessage] = useState('')
  const [isDiscarding, setIsDiscarding] = useState(false)

  useEffect(() => draw(16), [])

  useEffect(() => {
    if (selectedCards.length === 3) checkAndReset()
  }, [selectedCards])

  useEffect(() => {
    if (board.length > 0 && board.length <= 15) {
      setTimeout(() => draw(3), 500)
    }
  }, [board.length])

  const isSelected= (cardId: string) => {
    return selectedCards.some(card => card.id === cardId)
  }

  const selectNewCardIndexes = (count: number) => {
    if (unusedIndexes.length === 0) return []
    if (unusedIndexes.length < 3) return unusedIndexes
    return unusedIndexes.splice(0, count)
  }
  const draw = (count: number) => {
    const selectedIndexes = selectNewCardIndexes(count)
    if (selectedIndexes.length === 0) return

    setBoard([
      ...board,
      ...selectedIndexes
    ])
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
    if (isSelected) {
      unselectCard(cardData)
    } else {
      selectCard(cardData)
    }
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
    }
  }

  const style = {
    height: "700px",
    width: "566px"
  }

  return (
    <main>
      <div className="flex ">
        <div
          style={style}
          className="m-auto relative">
          {
            board.map((cardPositionInDeck, index) => <Card
              key={Object.values(deck[cardPositionInDeck]).join("-")}
              isSelected={isSelected(deck[cardPositionInDeck].id)}
              cardData={deck[cardPositionInDeck]}
              order={index}
              slideIn={index >= 13}
              isDiscard={isDiscarding && isSelected(deck[cardPositionInDeck].id)}
              onCardClick={onCardClick} />)
          }
        </div>
        <div>
          <p>{message}</p>
        </div>
      </div>
    </main>
  );
}
