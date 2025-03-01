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

// same: n/a                    diff: shape, fill, count, color
// same: shape,                 diff: fill, count, color
// same: shape + fill           diff: count, color
// same: shape + fill + count   diff: color

const colorSame = [
    {
        "id": "#e40707-diamond-full-1",
        "suite": "diamond",
        "count": "1",
        "fill": "partial",
        "color": "#e40707"
    },
    {
        "id": "#e40707-diamond-full-3",
        "suite": "diamond",
        "count": "3",
        "fill": "none",
        "color": "#e40707"
    },
    {
        "id": "#e40707-diamond-full-2",
        "suite": "diamond",
        "count": "2",
        "fill": "full",
        "color": "#e40707"
    }
]
const shapeSame = [
    {
        "id": "#e40707-diamond-full-1",
        "suite": "diamond",
        "count": "1",
        "fill": "partial",
        "color": "#e40707"
    },
    {
        "id": "#54b946-diamond-full-3",
        "suite": "diamond",
        "count": "3",
        "fill": "none",
        "color": "#54b946"
    },
    {
        "id": "#7701b7-diamond-full-2",
        "suite": "diamond",
        "count": "2",
        "fill": "full",
        "color": "#7701b7"
    }
]
const shapeSameNotSet = [
    {
        "id": "#e40707-diamond-full-1",
        "suite": "diamond",
        "count": "1",
        "fill": "partial",
        "color": "#e40707"
    },
    {
        "id": "#54b946-diamond-full-3",
        "suite": "diamond",
        "count": "1",
        "fill": "none",
        "color": "#54b946"
    },
    {
        "id": "#7701b7-diamond-full-2",
        "suite": "diamond",
        "count": "2",
        "fill": "full",
        "color": "#7701b7"
    }
]
const shapeFillSame = [
    {
        "id": "#e40707-diamond-full-1",
        "suite": "diamond",
        "count": "1",
        "fill": "full",
        "color": "#e40707"
    },
    {
        "id": "#54b946-diamond-full-3",
        "suite": "diamond",
        "count": "3",
        "fill": "full",
        "color": "#54b946"
    },
    {
        "id": "#7701b7-diamond-full-2",
        "suite": "diamond",
        "count": "2",
        "fill": "full",
        "color": "#7701b7"
    }
]
const shapeFillSameNotSet = [
    {
        "id": "#e40707-diamond-full-1",
        "suite": "diamond",
        "count": "1",
        "fill": "full",
        "color": "#e40707"
    },
    {
        "id": "#54b946-diamond-full-3",
        "suite": "diamond",
        "count": "3",
        "fill": "full",
        "color": "#e40707"
    },
    {
        "id": "#7701b7-diamond-full-2",
        "suite": "diamond",
        "count": "2",
        "fill": "full",
        "color": "#7701b7"
    }
]
const shapeFillCountSame = [
    {
        "id": "#e40707-diamond-full-1",
        "suite": "diamond",
        "count": "1",
        "fill": "full",
        "color": "#e40707"
    },
    {
        "id": "#54b946-diamond-full-3",
        "suite": "diamond",
        "count": "1",
        "fill": "full",
        "color": "#54b946"
    },
    {
        "id": "#7701b7-diamond-full-2",
        "suite": "diamond",
        "count": "1",
        "fill": "full",
        "color": "#7701b7"
    }
]
const shapeFillCountSameNotSet = [
    {
        "id": "#e40707-diamond-full-1",
        "suite": "diamond",
        "count": "1",
        "fill": "full",
        "color": "#e40707"
    },
    {
        "id": "#e40707-diamond-full-3",
        "suite": "diamond",
        "count": "1",
        "fill": "full",
        "color": "#e40707"
    },
    {
        "id": "#7701b7-diamond-full-2",
        "suite": "diamond",
        "count": "1",
        "fill": "full",
        "color": "#7701b7"
    }
]

console.assert(isSet(colorSame), "colorSame, is set")
console.assert(isSet(shapeSame), "shape same, is set")
console.assert(isSet(shapeFillSame), "shape fill same, is set")
console.assert(isSet(shapeFillCountSame), "shape fill count same, is set")
console.assert(isSet(shapeSameNotSet) === false, "shape same, not set")
console.assert(isSet(shapeFillSameNotSet) === false, "shape fill same, not set")
console.assert(isSet(shapeFillCountSameNotSet) === false, "shape fill count same, not set")

export default isSet;