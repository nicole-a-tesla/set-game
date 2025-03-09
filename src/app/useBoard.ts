import { useEffect, useState } from "react";
import { deck, unusedIndexes } from "./deck";
import { CardData } from "@/types";

export function useBoard(cardIndexes: number[])
    : [
        number[],
        (cards: CardData[]) => void,
        () => boolean,
        () => void,
    ] {
    const SMALL_BOARD = 12
    const LARGE_BOARD = 15

    const [board, setBoard] = useState<number[]>(cardIndexes)
    const [boardSize, setBoardSize] = useState(SMALL_BOARD)
    
    useEffect(() => {
        draw(boardSize)
    }, [])

    useEffect(() => {
        if (board.length > 0 && board.length < boardSize) {
            setTimeout(() => draw(3), 700)
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
        if (boardSize === LARGE_BOARD) {
            setBoardSize(SMALL_BOARD)
        }
        setBoard(boardWithoutCards)
    }

    const addThreeCards = () => {
        if (boardSize === SMALL_BOARD) {
            draw(3)
            setBoardSize(LARGE_BOARD)
        }
    }

    const boardIsDefaultSize = () => {
        return boardSize === SMALL_BOARD
    }

    return [board, removeCards, boardIsDefaultSize, addThreeCards]
}