'use client'

import { deck } from "./deck"
import { useEffect, useState } from "react";
import Card from "./Card"
import isSet from "./setChecker";
import { CardData } from "@/types";
import { useBoard } from "./useBoard";

export default function Home() {
  const [board, setBoard] = useBoard([])
  const [selectedCards, setSelectedCards] = useState<CardData[]>([])
  const [message, setMessage] = useState('')
  const [isDiscarding, setIsDiscarding] = useState(false)

  useEffect(() => {
    if (selectedCards.length === 3) checkAndReset()
  }, [selectedCards])

  const isSelected = (cardId: string) => {
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
        setBoard(removeCards(selectedCards))
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
    height: "577px",
    width: "370px"
  }

  return (
    <main>
      <div className="flex flex-col items-center">
        <div
          style={style}
          className="m-auto relative m-5">
          {
            board.map((cardPositionInDeck: number, index: number) => <Card
              key={Object.values(deck[cardPositionInDeck]).join("-")}
              isSelected={isSelected(deck[cardPositionInDeck].id)}
              cardData={deck[cardPositionInDeck]}
              order={index}
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
