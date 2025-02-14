'use client'

import { initialDeck } from "./deck"
import { useState } from "react";
import Card from "./Card"

export default function Home() {
  const [deck, setDeck] = useState(initialDeck)
  const [board, setBoard] = useState(draw(12))
  const [discardPile, setDiscardPile] = useState([])

  function draw(count) {
    // draw n cards from deck and add to board
    // must take into account current board if set
    const hand = []
    let deckCopy = [...deck]

    while (hand.length < count) {
      const index = Math.floor(Math.random() * deckCopy.length);
      hand.push(
        buildCard(deckCopy[index])
      )
      deckCopy = deckCopy.toSpliced(index, 1)
    }

    return hand;
  }
  function buildCard(cardData) {
    return <Card key={Object.values(cardData).join("-")} {...cardData} />
  }
  return (
    <main className="">
      <div style={{margin: "25px", display: "flex", flexWrap: "wrap"}}>
        {board}
      </div>
    </main>
  );
}
