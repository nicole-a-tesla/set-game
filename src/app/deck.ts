
const SUITE = {
    DIAMOND: "diamond",
    SQUIGGLE: "squiggle",
    PILL: "pill"
}

const FILL = {
  NONE: "none",
  PARTIAL: "partial",
  FULL: "full"
}

const COLOR = {
    RED: "#e40707",
    GREEN: "#54b946",
    PURPLE: "#7701b7"
}

const COUNT = { ONE: "1", TWO: "2", THREE: "3" }

function buildDeck() {
    const allCombos = [];
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

export const deck = buildDeck()