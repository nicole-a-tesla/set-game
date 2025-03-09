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
    allCardsDealt
  ] = useBoard([])

  const [selectedCards, setSelectedCards] = useState<CardData[]>([])
  const [message, setMessage] = useState('')
  const [isDiscarding, setIsDiscarding] = useState(false)
  const [showHint, setShowHint] = useState(false)
  const [hintCard, noSetsPresent] = useHint(board, deck)

  const gameOver = noSetsPresent && allCardsDealt()
  const disabledButtonClasses = 'bg-zinc-300 cursor-not-allowed'
  const enabledButtonClasses = 'bg-blue-500 hover:bg-blue-700'

  useEffect(() => {
    if (selectedCards.length === 3) checkAndReset()
  }, [selectedCards])

  useEffect(() => {
    if (noSetsPresent && allCardsDealt()) {
      setMessage('GAME OVER')
    }
  }, [noSetsPresent])

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
    }
  }

  const handleAddThreeCardsClick = () => {
    if (showHint) {
      setShowHint(false)
    }
    addThreeCards()
  }

  const getPlusThreeButtonColorClasses = () => {
    if (!boardIsDefaultSize() || gameOver) {
      return disabledButtonClasses
    }

    if (noSetsPresent && !allCardsDealt() && showHint) {
      return 'bg-yellow-300 hover:bg-yellow-500'
    }
    return enabledButtonClasses
  }

  const heightClass = boardIsDefaultSize() ? 'h-[432px]' : 'h-[577px]'
  const hintButtonColorClasses = gameOver ? disabledButtonClasses : enabledButtonClasses

  return (
    <main>
      <div className={`flex flex-col items-center`}>
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
          <p className="flex justify-center">{message}</p>
          <button
            onClick={handleAddThreeCardsClick}
            disabled={!boardIsDefaultSize()}
            className={`${getPlusThreeButtonColorClasses()} text-white font-bold py-2 px-4 mx-2 rounded`}>
              +3
          </button>
          <button
            onClick={giveHint}
            className={`${hintButtonColorClasses} text-white font-bold py-2 px-4 mx-2 rounded`}>
              Hint
          </button>
        </div>
      </div>
    </main>
  );
}
