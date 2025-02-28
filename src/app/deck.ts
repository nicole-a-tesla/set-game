import { CardData, SUITE, FILL, COLOR, COUNT } from "@/types";

function buildDeck(): CardData[] {
    const allCombos: CardData[] = [];
    const suites = Object.values(SUITE)
    const fills = Object.values(FILL)
    const colors = Object.values(COLOR)
    const counts = Object.values(COUNT)

    suites.forEach(suite => {
        fills.forEach(fill => {
            colors.forEach(color => {
                counts.forEach(count => {
                    allCombos.push({
                        id: `${color}-${suite}-${fill}-${count}`,
                        suite, count, fill, color
                    })
                })
            })
        })
    })
    return allCombos
}

export const initialDeck = buildDeck()