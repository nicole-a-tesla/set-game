import { CardData } from "@/types"

const isSet = (cards: CardData[]) => {
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