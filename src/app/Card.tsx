import { CardData } from "@/types"
import { JSX, useEffect, useState } from "react";

interface CardProps {
    isSelected: boolean;
    isDiscard: boolean;
    cardData: CardData;
    order: number;
    slideIn: boolean;
    onCardClick: (cardData: CardData, isSelected: boolean) => void
}

export default function Card({isSelected, slideIn, order, isDiscard, cardData, onCardClick}: CardProps) {
    let initialLeftPosition = slideIn ? '100%' : `${15 * (order % 4)}%`
    let [leftPosition, setLeftPosition] = useState(initialLeftPosition)

    useEffect(() => {
        const leftPositionFormula = `${15 * (order % 4)}%`
        if (slideIn) {
            setTimeout(() => setLeftPosition(leftPositionFormula), 0)
        } else {
            setLeftPosition(leftPositionFormula)
        }
    }, [order])

    const {id, suite, count, fill, color} = cardData

    const style = {
        border: "black",
        borderStyle: "solid",
        borderRadius: "10px",
        width: "fit-content",
        order,
        background: isSelected ? "gray" : "white",
        transition: "opacity 1s"
    }

    const parentStyle = {
        transition: "top 1s, left 1s",
        top: `${20 * Math.floor(order/4)}%`,
        left: leftPosition
    }

    const shapes = {
        diamond: {
            none: "M195 509 c-38 -27 -71 -53 -73 -58 -2 -5 29 -32 68 -59 71 -50 72 -50 98 -34 57 36 111 77 116 88 2 6 -28 34 -68 62 l-71 50 -70 -49z m175 -59 c0 -4 -24 -23 -54 -44 l-54 -37 -49 37 c-26 20 -48 40 -48 45 0 4 22 24 49 43 l48 34 54 -36 c30 -20 54 -39 54 -42z",
            partial: "M183 504 c-35 -25 -63 -49 -63 -54 0 -10 123 -100 136 -100 10 0 127 80 136 94 6 9 -121 106 -139 106 -4 0 -36 -21 -70 -46z m87 -54 c0 -47 -4 -80 -10 -80 -6 0 -10 33 -10 80 0 47 4 80 10 80 6 0 10 -33 10 -80z m-30 -1 c0 -44 -4 -68 -10 -64 -18 11 -12 135 7 135 2 0 3 -32 3 -71z m60 -4 c0 -30 -4 -57 -10 -60 -6 -4 -10 18 -10 60 0 42 4 64 10 60 6 -3 10 -30 10 -60z m-90 5 c0 -22 -4 -40 -9 -40 -9 0 -20 67 -12 75 13 14 21 1 21 -35z m120 -6 c0 -19 -4 -34 -10 -34 -5 0 -10 18 -10 41 0 24 4 38 10 34 6 -3 10 -22 10 -41z m-160 4 c0 -16 -3 -19 -11 -11 -6 6 -8 16 -5 22 11 17 16 13 16 -11z m193 -4 c-4 -10 -9 -12 -15 -6 -12 12 -1 35 12 27 5 -3 6 -13 3 -21z",
            full: "M180 505 c-36 -25 -66 -49 -68 -53 -1 -5 29 -30 67 -56 l69 -48 66 47 c36 26 66 50 66 55 0 7 -123 101 -132 100 -2 0 -32 -21 -68 -45z"
        },
        pill: {
            none: "M145 525 c-32 -31 -34 -91 -4 -129 20 -25 24 -26 124 -26 100 0 104 1 124 26 30 38 28 98 -4 129 -22 23 -32 25 -120 25 -88 0 -98 -2 -120 -25z m225 -15 c11 -11 20 -33 20 -50 0 -54 -28 -70 -127 -70 -99 0 -123 13 -123 65 0 55 15 64 110 68 47 1 88 4 93 5 4 1 16 -7 27 -18z",
            partial: "M142 539 c-46 -17 -57 -105 -17 -144 22 -23 32 -25 117 -25 108 0 134 12 144 65 7 40 -10 90 -34 101 -24 11 -183 13 -210 3z m38 -79 c0 -40 -4 -70 -10 -70 -6 0 -10 30 -10 70 0 40 4 70 10 70 6 0 10 -30 10 -70z m30 0 c0 -40 -4 -70 -10 -70 -6 0 -10 30 -10 70 0 40 4 70 10 70 6 0 10 -30 10 -70z m40 0 c0 -40 -4 -70 -10 -70 -6 0 -10 30 -10 70 0 40 4 70 10 70 6 0 10 -30 10 -70z m30 0 c0 -40 -4 -70 -10 -70 -6 0 -10 30 -10 70 0 40 4 70 10 70 6 0 10 -30 10 -70z m30 0 c0 -40 -4 -70 -10 -70 -6 0 -10 30 -10 70 0 40 4 70 10 70 6 0 10 -30 10 -70z m32 -9 c-5 -80 -17 -71 -16 11 2 75 2 76 12 62 4 -7 5 -39 4 -73z m-192 9 c0 -33 -4 -60 -10 -60 -11 0 -14 103 -3 113 12 12 13 8 13 -53z m220 0 c0 -22 -3 -40 -8 -40 -4 0 -7 18 -7 40 0 22 3 40 7 40 5 0 8 -18 8 -40z",
            full: "M146 525 c-21 -22 -29 -52 -22 -91 10 -52 37 -64 138 -64 76 0 90 3 113 23 32 27 37 81 12 121 -17 25 -20 26 -122 26 -79 0 -107 -4 -119 -15z",
        },
        squiggle: {
            none: "M143 538 c-13 -6 -32 -31 -44 -55 -18 -38 -19 -48 -9 -73 17 -40 54 -49 84 -21 27 26 32 26 81 1 75 -38 149 -19 180 45 17 37 14 77 -7 102 -16 20 -56 15 -70 -7 -7 -11 -19 -20 -26 -20 -7 0 -30 9 -52 20 -42 22 -102 25 -137 8z m117 -27 c64 -34 77 -34 101 -7 27 31 45 33 59 7 17 -32 12 -51 -24 -87 -39 -39 -69 -43 -124 -15 -68 34 -78 34 -107 4 l-26 -28 -20 24 c-24 29 -18 56 22 94 35 32 70 35 119 8z",
            partial: "M138 534 c-52 -27 -73 -99 -42 -142 20 -29 48 -28 76 2 l23 25 50 -24 c80 -39 136 -30 176 31 23 35 24 72 3 102 -20 29 -49 28 -75 -2 l-21 -24 -52 24 c-58 27 -99 30 -138 8z m52 -54 c0 -27 -4 -50 -10 -50 -5 0 -10 23 -10 50 0 28 5 50 10 50 6 0 10 -22 10 -50z m30 0 c0 -27 -4 -50 -10 -50 -5 0 -10 23 -10 50 0 28 5 50 10 50 6 0 10 -22 10 -50z m160 -15 c0 -37 -4 -65 -10 -65 -11 0 -14 113 -3 123 12 13 13 7 13 -58z m30 16 c0 -28 -4 -53 -10 -56 -6 -4 -10 15 -10 49 0 31 5 56 10 56 6 0 10 -22 10 -49z m-258 -18 c0 -68 -1 -73 -12 -73 -11 0 -14 113 -3 123 11 12 15 -1 15 -50z m98 7 c0 -27 -4 -50 -10 -50 -5 0 -10 23 -10 50 0 28 5 50 10 50 6 0 10 -22 10 -50z m40 -21 c0 -34 -4 -49 -11 -47 -7 2 -12 24 -11 51 1 61 0 59 12 52 6 -3 10 -29 10 -56z m-170 -5 c0 -27 -4 -43 -10 -39 -17 11 -11 85 7 85 2 0 3 -21 3 -46z m200 -4 c0 -27 -4 -50 -10 -50 -5 0 -10 23 -10 50 0 28 5 50 10 50 6 0 10 -22 10 -50z m30 0 c0 -27 -4 -50 -10 -50 -5 0 -10 23 -10 50 0 28 5 50 10 50 6 0 10 -22 10 -50z",
            full: "M142 536 c-56 -31 -79 -109 -42 -146 26 -26 36 -25 65 6 l25 27 61 -28 c44 -19 70 -25 93 -21 59 11 105 82 85 133 -19 50 -47 55 -82 18 l-23 -26 -55 26 c-60 28 -93 31 -127 11z",
        }
    }

    const getPathStyles = () => {
        if (count === "1") return []
        if (count === "2") {
            return [{transform: "translateY(150%)"}, {transform: "translateY(-150%)"}]
        }
        return [
            {transform: "translateY(270%)"},
            {transform: "translateY(0%)"},
            {transform: "translateY(-270%)"},
        ]
    }

    const buildPaths = () => {
        const pathStyles = getPathStyles()

        if (pathStyles.length === 0) return <path d={shapes[suite][fill]} />

        const paths: JSX.Element[] = []

        pathStyles.forEach((style, index)=> {
            paths.push(
                <path d={shapes[suite][fill]} style={style} key={`${id}-path-${index}`}/>
            )
        })
        return paths;
    }

    return (
        <div className="p-5 absolute" style={parentStyle}>
            <div className={isDiscard ? "opacity-0" : "opacity-100"} style={style} id={id} onClick={() => onCardClick(cardData, isSelected)}>
                <svg version="1.0" width="51.000000pt" height="93.000000pt" viewBox="0 0 51.000000 93.000000" preserveAspectRatio="xMidYMid meet">
                    <g transform="translate(0.000000,93.000000) scale(0.100000,-0.100000)" fill={color} stroke="none">
                        { buildPaths() }
                    </g>
                </svg>
            </div>
        </div>
    )
}