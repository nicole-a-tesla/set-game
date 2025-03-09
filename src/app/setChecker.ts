import { CardData } from "@/types"

export const isSet = (cards: CardData[]) => {
    const resultMap = {
        suite: new Set(),
        count: new Set(),
        fill: new Set(),
        color: new Set()
    }

    cards.forEach(card => {
        resultMap.suite.add(card.suite)
        resultMap.count.add(card.count)
        resultMap.fill.add(card.fill)
        resultMap.color.add(card.color)
    })
    
    const suiteSet = resultMap.suite.size === 1 || resultMap.suite.size === 3
    const countSet = resultMap.count.size === 1 || resultMap.count.size === 3
    const fillSet = resultMap.fill.size === 1 || resultMap.fill.size === 3
    const colorSet = resultMap.color.size === 1 || resultMap.color.size === 3
    
    return suiteSet && countSet && fillSet && colorSet
}

const getCardData = (boardIndex: number, board: number[], deck: CardData[]) => {
    const deckIndex = board[boardIndex]
    return deck[deckIndex]
}

export const findSet = (board: number[], deck: CardData[]) => {
    for (let index1 = 0; index1 < board.length; index1++) {
        const card1 = getCardData(index1, board, deck)
        for (let index2 = index1 + 1; index2 < board.length; index2++) {
            const card2 = getCardData(index2, board, deck)
            for (let index3 = index2 + 1; index3 < board.length; index3++) {
                const card3 = getCardData(index3, board, deck)

                if (isSet([card1, card2, card3])) {
                    return [board[index1], board[index2], board[index3]]
                }

            }
        }
    }
    return null
}