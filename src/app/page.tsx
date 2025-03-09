'use client'

import { deck } from "./deck"
import { useEffect, useState } from "react";
import Card from "./Card"
import { isSet } from "./setChecker";
import { CardData } from "@/types";
import { useBoard } from "./useBoard";
import { useHint } from "./useHint";

export default function Home() {
  const [
    board,
    removeCards,
    boardIsDefaultSize,
    addThreeCards,
  ] = useBoard([])

  const [selectedCards, setSelectedCards] = useState<CardData[]>([])
  const [message, setMessage] = useState('')
  const [isDiscarding, setIsDiscarding] = useState(false)
  const [showHint, setShowHint] = useState(false)
  const [hintCard, noSetsPresent] = useHint(board, deck)

  useEffect(() => {
    if (selectedCards.length === 3) checkAndReset()
  }, [selectedCards])

  const isSelected = (cardId: string) => {
    return selectedCards.some(card => card.id === cardId)
  }

  const checkAndReset = () => {
    if (isSet(selectedCards)) {
      setIsDiscarding(true)
      setTimeout(() => {
        removeCards(selectedCards)
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
    if (showHint) {
      setShowHint(false)
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

  const giveHint = () => {
    if (hintCard) {
      setShowHint(true)
      return
    } else {
      // TODO if no sets are present and can draw, flash +3 button
      // if no sets present and cannot draw, end game
      console.log("NO SET")
    }
  }

  const heightClass = boardIsDefaultSize() ? 'h-[432px]' : 'h-[577px]'
  const buttonActiveClass = boardIsDefaultSize() ? 'bg-blue-500 hover:bg-blue-700': 'bg-zinc-300 cursor-not-allowed'

  return (
    <main>
      <div className="flex flex-col items-center">
        <div className={`m-auto relative m-5 ${heightClass} w-[370px] transition-all duration-[1s]`}>
          {
            board.map((cardPositionInDeck: number, index: number) => <Card
              key={Object.values(deck[cardPositionInDeck]).join("-")}
              isSelected={isSelected(deck[cardPositionInDeck].id)}
              cardData={deck[cardPositionInDeck]}
              isHintCard={showHint && hintCard === cardPositionInDeck}
              order={index}
              isDiscard={isDiscarding && isSelected(deck[cardPositionInDeck].id)}
              onCardClick={onCardClick} />)
          }
        </div>
        <div className="m-4">
          <p>{message}</p>
          <button
            onClick={addThreeCards}
            disabled={!boardIsDefaultSize()}
            className={`${buttonActiveClass} text-white font-bold py-2 px-4 mx-2 rounded`}>
              +3
          </button>
          <button
            onClick={giveHint}
            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mx-2 rounded`}>
              Hint
          </button>
        </div>
      </div>
    </main>
  );
}
