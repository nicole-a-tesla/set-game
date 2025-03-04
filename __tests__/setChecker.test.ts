// import '@testing-library/jest-dom'
import isSet from "../src/app/setChecker";
import { SUITE, FILL, COUNT, COLOR} from '../src/types'

const cardGenerator = (suite: SUITE, count: COUNT, fill: FILL, color: COLOR) => {
    return {
        "id": "",
        suite: suite,
        count: count,
        fill: fill,
        color: color
    }
}

describe('setChecker', () => {
    it('all colors same and other attrs different is a set', () => {
        const cards = [
            cardGenerator(SUITE.DIAMOND, COUNT.TWO, FILL.FULL, COLOR.RED),
            cardGenerator(SUITE.SQUIGGLE, COUNT.THREE, FILL.NONE, COLOR.RED),
            cardGenerator(SUITE.PILL, COUNT.ONE, FILL.PARTIAL, COLOR.RED)
        ]
        expect(isSet(cards)).toBe(true);
    })
    it('all shapes same and other attrs different is a set', () => {
        const cards = [
            cardGenerator(SUITE.DIAMOND, COUNT.ONE, FILL.FULL, COLOR.RED),
            cardGenerator(SUITE.DIAMOND, COUNT.TWO, FILL.PARTIAL, COLOR.PURPLE),
            cardGenerator(SUITE.DIAMOND, COUNT.THREE, FILL.NONE, COLOR.GREEN),
        ]
        expect(isSet(cards)).toBe(true);
    })
    it('all shapes and fill same and other attrs different is a set', () => {
        const cards = [
            cardGenerator(SUITE.DIAMOND, COUNT.ONE, FILL.FULL, COLOR.RED),
            cardGenerator(SUITE.DIAMOND, COUNT.TWO, FILL.FULL, COLOR.PURPLE),
            cardGenerator(SUITE.DIAMOND, COUNT.THREE, FILL.FULL, COLOR.GREEN),
        ]
        expect(isSet(cards)).toBe(true);
    })
    it('all shapes same but not a set', () => {
        const cards = [
            cardGenerator(SUITE.DIAMOND, COUNT.ONE, FILL.FULL, COLOR.RED),
            cardGenerator(SUITE.DIAMOND, COUNT.ONE, FILL.FULL, COLOR.GREEN),
            cardGenerator(SUITE.DIAMOND, COUNT.TWO, FILL.FULL, COLOR.PURPLE)
        ]
        expect(isSet(cards)).toBe(false);
    })
    it('all shapes and fill same but not a set', () => {
        const cards = [
            cardGenerator(SUITE.DIAMOND, COUNT.ONE, FILL.FULL, COLOR.RED),
            cardGenerator(SUITE.DIAMOND, COUNT.ONE, FILL.FULL, COLOR.GREEN),
            cardGenerator(SUITE.DIAMOND, COUNT.TWO, FILL.FULL, COLOR.PURPLE)
        ]
        expect(isSet(cards)).toBe(false);
    })
    it('all shapes, fill, and count same and other attrs different is a set', () => {
        const cards = [
            cardGenerator(SUITE.DIAMOND, COUNT.ONE, FILL.FULL, COLOR.RED),
            cardGenerator(SUITE.DIAMOND, COUNT.ONE, FILL.FULL, COLOR.GREEN),
            cardGenerator(SUITE.DIAMOND, COUNT.ONE, FILL.FULL, COLOR.PURPLE)
        ]
        expect(isSet(cards)).toBe(true);
    })
    it('all shapes fill and count same but not a set', () => {
        const cards = [
            cardGenerator(SUITE.DIAMOND, COUNT.ONE, FILL.FULL, COLOR.RED),
            cardGenerator(SUITE.DIAMOND, COUNT.ONE, FILL.FULL, COLOR.RED),
            cardGenerator(SUITE.DIAMOND, COUNT.ONE, FILL.FULL, COLOR.PURPLE)
        ]
        expect(isSet(cards)).toBe(false);
    })
})