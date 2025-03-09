import { CardData } from "@/types";
import { useEffect, useState } from "react";
import { findSet } from "./setChecker";

export function useHint(board: number[], deck: CardData[]): [
    number | null,
    boolean
] {
    const [hintCard, setHintCard] = useState<number|null>(null)
    const [hintSet, setHintSet] = useState<number[]>([])
    const [noSetsPresent, setNoSetsPresent] = useState(false)

    useEffect(() => {
        if (board.length === 0) return
        if (hintSet.length === 0 || !setIsStillOnBoard(hintSet)) {
            setNewHints()
        }
    }, [board, deck])

    const setIsStillOnBoard = (set: number[]) => {
        return set.every(cardNumber => board.includes(cardNumber))
    }

    const setNewHints = () => {
        const set = findSet(board, deck)

        if (set === null) {
            setNoSetsPresent(true)
            return
        }

        setHintSet(set)

        if (noSetsPresent) {
            setNoSetsPresent(false)
        }

        const randIndex = Math.floor(Math.random() * 3)
        return setHintCard(set[randIndex])
    }

    return [
        hintCard,
        noSetsPresent
    ]
}