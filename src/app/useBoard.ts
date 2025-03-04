import { useEffect, useState } from "react";
import { deck, unusedIndexes } from "./deck";
import { CardData } from "@/types";

export function useBoard(cardIndexes: number[])
    : [
        number[],
        (cards: CardData[]) => void
    ] {
    const [board, setBoard] = useState<number[]>(cardIndexes)
    
    useEffect(() => draw(16), [])

    useEffect(() => {
        if (board.length > 0 && board.length <= 15) {
            setTimeout(() => draw(3), 500)
        }
    }, [board.length])

    const selectNewCardIndexes = (count: number) => {
        if (unusedIndexes.length === 0) return []
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
        const boardWithoutCards = board.filter(cardIndex => {
            return !targetIds.includes(deck[cardIndex].id)
        })
        setBoard(boardWithoutCards)
    }

    return [board, removeCards]
}