import { useEffect, useState } from "react";
import { unusedIndexes } from "./deck";

export function useBoard(cardIndexes: number[]): [number[], (newBoard: number[]) => void] {
    const [board, setBoard] = useState<number[]>(cardIndexes)
    
    useEffect(() => draw(16), [])

    useEffect(() => {
        if (board.length > 0 && board.length <= 15) {
            setTimeout(() => draw(3), 500)
        }
    }, [board.length])

    const handleBoardChange = (newBoard: number[]) => {
        setBoard(newBoard)
    }

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

    return [board, handleBoardChange]
}