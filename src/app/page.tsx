'use client'

import { deck } from "./deck"
import { useState } from "react";
import Card from "./Card"

export default function Home() {
  const firstDraw = draw(12)
  const [board, setBoard] = useState(draw(12))

  function draw(count) {
    // draw n cards from deck and add to board
    // must take into account current board if set
    const hand = []
    deck.forEach(cardData => hand.push(buildCard(cardData)))
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
