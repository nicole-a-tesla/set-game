import { CardData, SUITE, FILL, COLOR, COUNT } from "@/types";
const DECK_SIZE = 81

const buildDeck = (): CardData[] => {
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

/**
 * Starting with the last element, pick a rand element and swap them
 * Then decrement current element index. Operates destructively
 *
 * @param {any[]} array an array of any element types
 * @return {any[]} a shuffled array
 */
const shuffle = (array: any[]) => {
    let currentIndex = array.length;

    while (currentIndex != 0) {
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // swap
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
}


const getUnusedIndexes = () => {
    const unusedIndexes = [...Array(DECK_SIZE).keys()]
    shuffle(unusedIndexes)
    return unusedIndexes
}

export const deck = buildDeck()
export const unusedIndexes = getUnusedIndexes()